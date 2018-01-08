import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

import metrics from '../../config/metrics';
import color from '../../config/color';
import { getIcon } from '../../assets/icons';

export class Appbar extends React.Component {
  render () {
    return (
      <View style={styles.host}>
        <TouchableOpacity style={styles.nav_btn} onPress={this.props.nav}>
          <Image
            source={getIcon('menu_w')}
            style={styles.btn_icon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{this.props.title}</Text>
        <TouchableOpacity style={styles.call_btn} onPress={this.props.call}>
          <Image
            source={getIcon('call_w')}
            style={styles.btn_icon}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    height: metrics.APP_BAR_HEIGHT,
    backgroundColor: color.APP_THEME,
    position: 'relative',
    elevation: 2
  },
  nav_btn: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 56,
    height: 56
  },
  call_btn: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 56,
    height: 56
  },
  btn_icon: {
    margin: 16,
    width: 24,
    height: 24
  },
  title: {
    color: 'white',
    fontSize: metrics.FONT_SIZE * 1.4,
    position: 'absolute',
    left: 72,
    bottom: 10
  }
});