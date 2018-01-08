import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import metrics from '../../config/metrics';
import color from '../../config/color';

export class Appbar extends React.Component {
  render () {
    return (
      <View style={styles.host}>
        <TouchableOpacity style={styles.nav_btn} onPress={this.props.nav}>
          {/* TODO: add 24dp menu icon */}
          <View style={styles.btn_icon}/>
        </TouchableOpacity>
        <Text style={styles.title}>test</Text>
        <TouchableOpacity style={styles.call_btn} onPress={this.props.call}>
          {/* TODO: add 24dp call icon */}
          <View style={styles.btn_icon}/>
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
    elevation: 5
  },
  nav_btn: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 56,
    height: 56,
    backgroundColor: 'red'
  },
  call_btn: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 56,
    height: 56,
    backgroundColor: 'red'
  },
  btn_icon: {
    margin: 16,
    width: 24,
    height: 24,
    backgroundColor: 'blue'
  },
  title: {
    color: 'white',
    fontSize: metrics.FONT_SIZE * 1.4,
    position: 'absolute',
    left: 72,
    bottom: 10
  }
});