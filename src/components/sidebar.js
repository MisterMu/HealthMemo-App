import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  AsyncStorage,
  ToastAndroid,
  ScrollView
} from 'react-native';
import RNFS from 'react-native-fs';

import { getIcon } from '../../assets/icons';
import color from '../../config/color';
import metrics from '../../config/metrics';
import sensor from '../../assets/values/sensor';

export class Sidebar extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      name: '',
      img_src: null
    }
  }

  navToProfile = () => {
    this.props.nav('Profile');
  }

  exportFile = () => {
    let storage = {};
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          storage = {...storage, [store[i][0]]: JSON.parse(store[i][1])};
        });
        let path = '/storage/emulated/0/Download' + '/HM_backup.json';
        RNFS.writeFile(path, JSON.stringify(storage), 'utf8').then((success) => {
          ToastAndroid.show('HM_backup file already save to /download folder', ToastAndroid.LONG);
        });
      })
    })
  }

  componentDidMount () {
    AsyncStorage.getItem('user_info').then((data) => {
      if (data) {
        this.setState({ name: JSON.parse(data).f_name + ' ' + JSON.parse(data).l_name, img_src: JSON.parse(data).img_src });
      }
    }).catch(err => consoler.error(err));
  }

  render () {
    let tmp = sensor.SENSOR_NAME.map((item, index) => {
      return <ItemNav onPress={this.props.nav} route={item} key={index}/>
    });
    return (
      <View style={styles.host}>
        <TouchableOpacity onPress={this.navToProfile}>
          <View style={styles.profile}>
            <View style={styles.img}>
              <Image
                source={{uri: this.state.img_src}}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative'
                }}
                resizeMode='cover'
              />
            </View>
            <View style={styles.name}>
              <Text style={styles.name_txt}>
                {this.state.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <ScrollView style={styles.list}>
          <ItemNav onPress={this.props.nav} route='Dashboard'/>
          <ItemNav onPress={this.props.nav} route='Profile'/>
          {tmp}
          <ItemNav onPress={this.props.nav} route='Suggestion'/>
          <ItemNav onPress={this.props.nav} route='Hospital Information'/>
          <ItemNav onPress={this.props.nav} route='Emergency Contact'/>
          <ItemNav onPress={this.props.nav} route='Send Email'/>
          <ItemNav onPress={this.exportFile} route='Export Backup File'/>
        </ScrollView>
      </View>
    );
  }
}

class ItemNav extends React.Component {
  render () {
    return (
      <TouchableOpacity onPress={this.navToRoute}>
        <View style={styles.item}>
          <Image source={getIcon(this.props.route)} style={styles.icon}/>
          <Text style={styles.item_name}>{this.props.route}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  navToRoute = () => {
    this.props.onPress(this.props.route);
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1
  },
  profile: {
    backgroundColor: color.APP_THEME,
    padding: 16
  },
  img: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'red',
    marginBottom: 16,
    overflow: 'hidden'
  },
  name: {
    width: '100%'
  },
  name_txt: {
    width: '100%',
    fontSize: metrics.FONT_SIZE,
    color: 'white'
  },
  list: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.24)'
  },
  item: {
    height: 48,
    position: 'relative'
  },
  icon: {
    width: 24,
    height: 24,
    opacity: 0.54,
    position: 'absolute',
    left: 16,
    top: 12
  },
  item_name: {
    position: 'absolute',
    left: 72,
    top: 12,
    fontSize: metrics.FONT_SIZE * 0.9
  }
});