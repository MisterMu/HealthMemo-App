import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  AsyncStorage
} from 'react-native';
import sensor from '../../assets/values/sensor';
import metrics from '../../config/metrics';
import { getDayOfWeek, getDateFormat } from '../../tools/date';

export class SensorCard extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      value: 0,
      lm_value: 0,
      lm_day: '',
      lm_date_time: ''
    };
  }

  componentDidMount () {
    AsyncStorage.getItem(sensor.SENSOR_NAME[this.props.index]).then((data) => {
      if (data) {
        let tmp = JSON.parse(data);
        let date = new Date(tmp.lastMeasure.date);
        this.setState({
          value: tmp.lastUpdate.value,
          lm_value: tmp.lastMeasure.value,
          lm_day: getDayOfWeek(date),
          lm_date_time: getDateFormat(date) + ' ' + date.toLocaleTimeString()
        });
      }
    });
  }

  render () {
    return (
      <View style={styles.host}>
        <Text style={styles.title}>{sensor.SENSOR_NAME[this.props.index]}</Text>
        <Text style={[styles.value, {color: sensor.SENSOR_COLOR[this.props.index]}]}>{this.state.value}</Text>
        <Text style={styles.unit}>{sensor.SENSOR_UNIT[this.props.index]}</Text>
        <Text style={styles.subtitle}>Last measurement</Text>
        <View style={styles.lm_container}>
          <View style={styles.lm_value_container}>
            <Text style={styles.lm_value}>{this.state.lm_value}</Text>
            <Text style={styles.lm_unit}>{sensor.SENSOR_UNIT[this.props.index]}</Text>
          </View>
          <View style={styles.lm_date_container}>
            <Text style={styles.lm_day}>{this.state.lm_day}</Text>
            <Text style={[styles.lm_date_time, {color: sensor.SENSOR_COLOR[this.props.index]}]}>{this.state.lm_date_time}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    backgroundColor: 'white',
    elevation: 4,
    padding: 16
  },
  title: {
    fontSize: metrics.FONT_SIZE,
    color: 'black'
  },
  value: {
    fontSize: metrics.FONT_SIZE * 3,
    width: '100%',
    textAlign: 'center'
  },
  unit: {
    fontSize: metrics.FONT_SIZE * 0.8,
    width: '100%',
    textAlign: 'center',
    color: 'grey'
  },
  lm_container: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 16
  },
  subtitle: {
    fontSize: metrics.FONT_SIZE * 0.8
  },
  lm_value_container: {
    flex: 1,
    flexDirection: 'row'
  },
  lm_value: {
    fontSize: metrics.FONT_SIZE * 1.5,
    color: 'grey',
    height: '100%',
    textAlignVertical: 'bottom'
  },
  lm_unit: {
    fontSize: metrics.FONT_SIZE * 0.5,
    color: 'grey',
    height: '100%',
    textAlignVertical: 'bottom',
    paddingBottom: 8,
    marginLeft: 16
  },
  lm_date_container: {
    flex: 1
  },
  lm_day: {
    fontSize: metrics.FONT_SIZE * 0.6
  },
  lm_date_time: {
    fontSize: metrics.FONT_SIZE * 0.5
  }
});