import React from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
  Text
} from 'react-native';

import metrics from '../../config/metrics';

export class SGIndicator extends React.Component {
  render () {
    let bar = this.props.range.map((block, i) => {
      return (
        <View style={[styles.block, {backgroundColor: this.props.color[i]}]} key={i} />
      );
    });
    let pos = (((this.props.index + 0.5) / this.props.range.length) * 100) + '%';
    return (
      <View style={styles.host}>
        <Text style={styles.name}>{this.props.name}</Text>
        <View style={styles.fake_container}>
          <View style={styles.bar_container}>
            {bar}
          </View>
          <View style={[styles.pointer, {left: pos}]}/>
        </View>
        <Text style={styles.suggestion}>{this.props.comment}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    alignItems: 'center',
    marginBottom: 24
  },
  name: {
    width: '100%',
    fontSize: metrics.FONT_SIZE * 1.3,
    marginBottom: 8
  },
  fake_container: {
    width: '90%',
    height: 20,
    position: 'relative',
    marginBottom: 16
  },
  bar_container: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 20,
    width: '100%',
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: 2
  },
  block: {
    flex: 1,
    position: 'relative'
  },
  pointer: {
    width: 5,
    height: 20,
    backgroundColor: 'grey',
    position: 'absolute',
    bottom: -10,
    elevation: 2
  },
  suggestion: {
    width: '90%'
  }
});