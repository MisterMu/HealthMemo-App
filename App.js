import React from 'react';
import { AsyncStorage, ActivityIndicator, View, NativeModules, ToastAndroid, Alert, StatusBar } from 'react-native';
import RNFS from 'react-native-fs';

import { RegisterScreen, DashboardScreen, Container } from './src/screens';
import sensor from './assets/values/sensor';
import { getNumDayOfMonth, isToday, isThisWeek, isThisMonth, isThisYear } from './tools/date';
import color from './config/color';

const FilePickerManager = NativeModules.FilePickerManager;

export default class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      render: ''
    };
  }

  importFile = () => {
    FilePickerManager.launchFileChooser((res) => {
      if (res.fileName !== 'HM_backup.json') {
        ToastAndroid.show('backup file name must be HM_backup.json!!', ToastAndroid.LONG);
        this.importFile();
      } else {
        RNFS.readFile(res.path, 'utf8').then((content) => {
          let tmp = JSON.parse(content);
          let data = Object.keys(tmp).map((key) => {
            return [key, JSON.stringify(tmp[key])];
          });
          AsyncStorage.multiSet(data, () => {
            this.setState({render: 'content'});
            ToastAndroid.show('successfully import backup file', ToastAndroid.LONG);
          });
        });
      }
    })
  }

  componentDidMount () {
    AsyncStorage.getItem('user_info').then((data) => {
      if (data == null) {
        this.setState({ render: 'register' });
        Alert.alert(
          'Have any backup file?',
          'you can import backup file for use application like your old one.',
          [
            {text: 'Never mind', onPress: () => {this.setState({render: 'register'})}},
            {text: 'Import backup file', onPress: this.importFile}
          ]
        )
      } else {
        this.setState({ render: 'content' });
      }
    }).catch(err => console.error(err));
    AsyncStorage.multiGet(sensor.SENSOR_NAME).then((res) => {
      res.map((data) => {
        if(!data[1]) {
          let sensor_object = {
            D: [],
            W: [],
            M: [],
            Y: [],
            lastUpdate: {
              value: 0,
              date: new Date()
            },
            lastMeasure: {
              value: 0,
              date: new Date()
            }
          }
          sensor_object.D.length = 24;
          sensor_object.D.fill(0);
          sensor_object.W.length = 7;
          sensor_object.W.fill(0);
          sensor_object.M.length = getNumDayOfMonth(new Date().getMonth());
          sensor_object.M.fill(0);
          sensor_object.Y.length = 12;
          sensor_object.Y.fill(0);
          AsyncStorage.setItem(data[0], JSON.stringify(sensor_object));
        } else {
          let last_date = new Date(JSON.parse(data[1]).lastUpdate.date);
          let tmp = JSON.parse(data[1]);
          if (!isToday(last_date)) {
            tmp.D.fill(0);
          }
          if (!isThisWeek(last_date)) {
            tmp.W.fill(0);
          }
          if (!isThisMonth(last_date)) {
            tmp.M.length = getNumDayOfMonth(new Date().getMonth());
            tmp.M.fill(0);
          }
          if (!isThisYear(last_date)) {
            tmp.Y.fill(0);
          }
          AsyncStorage.setItem(data[0], JSON.stringify(tmp));
        }
      });
    });
  }

  render () {
    let render;
    if (this.state.render === 'register') {
      render = <RegisterScreen done={() => this.setState({render: 'content'})}/>
    } else if (this.state.render === 'content') {
      render =  <Container/>;
    } else {
      render = <ActivityIndicator/>
    }
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <StatusBar backgroundColor={color.APP_THEME} barStyle='light-content'/>
        {render}
      </View>
    );
  }

}
