import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Image,
  AsyncStorage
} from 'react-native';

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
        <TouchableWithoutFeedback onPress={this.navToProfile}>
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
        </TouchableWithoutFeedback>
        <View style={styles.list}>
          <ItemNav onPress={this.props.nav} route='Dashboard'/>
          <ItemNav onPress={this.props.nav} route='Profile'/>
          {tmp}
          <ItemNav onPress={this.props.nav} route='Suggestion'/>
          <ItemNav onPress={this.props.nav} route='Hospital Information'/>
          <ItemNav onPress={this.props.nav} route='Emergency Contact'/>
        </View>
      </View>
    );
  }

  navToProfile = () => {
    console.log('nav to profile');
    this.props.nav('Profile');
  }
}

class ItemNav extends React.Component {
  render () {
    return (
      <TouchableNativeFeedback onPress={this.navToRoute}>
        <View style={styles.item}>
          <Image source={getIcon(this.props.route)} style={styles.icon}/>
          <Text style={styles.item_name}>{this.props.route}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }

  navToRoute = () => {
    this.props.onPress(this.props.route);
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    paddingTop: 24
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