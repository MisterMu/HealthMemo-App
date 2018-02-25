import React from 'react';
import { AsyncStorage, ActivityIndicator, View } from 'react-native';

import { RegisterScreen, DashboardScreen, Container } from './src/screens';
import sensor from './assets/values/sensor';
import { getNumDayOfMonth } from './tools/date';

export default class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      render: ''
    };
  }

  componentDidMount () {
    AsyncStorage.getItem('user_info').then((data) => {
      if (data == null) {
        this.setState({ render: 'register' });
      } else {
        this.setState({ user: JSON.parse(data), render: 'content' });
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
          if (last_date.getMonth() != new Date().getMonth() && last_date.getFullYear() != new Date().getFullYear()) {
            let tmp = JSON.parse(data[1]);
            tmp.M.length = getNumDayOfMonth(new Date().getMonth());
            tmp.M.fill(0);
            AsyncStorage.setItem(data[0], JSON.stringify(tmp));
          }
        }
      });
    });
  }

  render () {
    if (this.state.render === 'register') {
      return <RegisterScreen done={() => this.setState({render: 'content'})}/>
    } else if (this.state.render === 'content') {
      return <Container/>;
    } else {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator/>
        </View>
      );
    }
  }

}
