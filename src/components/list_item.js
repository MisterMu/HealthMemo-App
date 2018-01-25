import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';
import metrics from '../../config/metrics';

export class ListItem extends React.Component {
  render () {
    return (
      <TouchableOpacity style={styles.host} onPress={this.props.action}>
        <Text style={styles.text}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    height: 48,
    borderBottomColor: 'rgba(0, 0, 0, 0.38)',
    borderBottomWidth: 0.5,
    paddingLeft: 16
  },
  text: {
    fontSize: metrics.FONT_SIZE * 0.9,
    height: 48,
    textAlignVertical: 'center'
  }
});
