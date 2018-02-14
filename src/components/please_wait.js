import React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import metrics from '../../config/metrics';

export class PleaseWait extends React.Component {
  render () {
    return (
      <View style={styles.host}>
        <Text style={styles.text}>Please wait for </Text>
        <Text style={[styles.text, styles.time]}>{this.props.time}</Text>
        <Text style={styles.text}> second.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    width: '100%',
    textAlign: 'center',
    fontSize: metrics.FONT_SIZE
  },
  time: {
    fontSize: metrics.FONT_SIZE * 3
  }
});