import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  AsyncStorage,
  Modal
} from 'react-native';

import metrics from '../../config/metrics';
import sensor from '../../assets/values/sensor';
import { ChartCard, PleaseWait } from '../components/';
import { findMean } from '../../tools/math';
import Base64 from '../../tools/base64';

export class SensorScreen extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      value: 0,
      time: 0,
      data: null,
      disable: false
    }
  }

  getDataFromSensor = () => {
    this.props.ble.map((char_tmp) => {
      if (char_tmp.uuid === sensor.CHARACTERISTIC[this.props.index]) {
        char_tmp.read().then((sens) => {
          this.setState({value: Number(Base64.atob(sens.value)), disable: false});
        })
      }
    });
  }

  btnPress = () => {
    if (this.props.index === 1) {
      this.setState({disable: true, time: 20});
      setTimeout(() => {
        this.getDataFromSensor();
      }, 20000);
    } else {
      this.setState({disable: true});
      this.getDataFromSensor();
    }
  }

  updateValue = (value) => {
    let date = new Date();
    let tmp = this.state.data;
    tmp.D[date.getHours() - 1] = value;
    tmp.W[date.getDay()] = findMean(tmp.D);
    tmp.M[date.getDate() - 1] = findMean(tmp.D);
    tmp.Y[date.getMonth()] = findMean(tmp.M);
    tmp.lastMeasure = {
      date: tmp.lastUpdate.date || date,
      value: tmp.lastUpdate.value || value
    }
    tmp.lastUpdate = {
      date: date,
      value: value
    }
    AsyncStorage.setItem(sensor.SENSOR_NAME[this.props.index], JSON.stringify(tmp));
    this.setState({data: tmp});
  }

  componentWillMount () {
    timeInterval = setInterval(() => {
      if (this.state.time > 0) {
        this.setState({time: this.state.time - 1});
      }
    }, 1000);
  }

  componentDidMount () {
    AsyncStorage.getItem(sensor.SENSOR_NAME[this.props.index]).then((data) => {
      this.setState({data: JSON.parse(data), value: 0});
    });
  }

  componentWillReceiveProps (props) {
    if (props.index !== this.props.index) {
      AsyncStorage.getItem(sensor.SENSOR_NAME[props.index]).then((data) => {
        this.setState({data: JSON.parse(data), value: 0});
      });
    }
  }

  componentDidUpdate (props, state) {
    if (this.state.value !== state.value && this.state.value != 0) {
      this.updateValue(this.state.value);
    }
  }

  render () {
    return (
      <View style={styles.host}>
        <Modal
          onRequestClose={()=>{}}
          animationType='slide'
          transparent={false}
          visible={this.state.time > 0}
        >
          <PleaseWait time={this.state.time}/>
        </Modal>
        <View style={styles.result}>
          <View style={[styles.result_container, {backgroundColor: sensor.SENSOR_COLOR[this.props.index]}]}>
            <Text style={styles.result_text}>{this.state.value}</Text>
            <View style={[styles.unit_container, {backgroundColor: sensor.SENSOR_COLOR[this.props.index]}]}>
              <Text style={styles.unit_text}>{sensor.SENSOR_UNIT[this.props.index]}</Text>
            </View>
          </View>
        </View>
        <View style={styles.btn_container}>
          <Button
            title='UPDATE VALUE'
            onPress={this.btnPress}
            // disabled={this.state.disable}
          />
        </View>
        <View style={styles.chart_card}>
          <ChartCard color={sensor.SENSOR_COLOR[this.props.index]} data={this.state.data}/>
        </View>
      </View>
    );
  }

  componentWillUnmount () {
    clearInterval(timeInterval);
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1
  },
  result: {
    width: '100%',
    height: metrics.CONTAINER_HEIGHT * 0.3,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  result_container: {
    width: metrics.DEVICE_WIDTH * 0.3,
    height: metrics.DEVICE_WIDTH * 0.3,
    marginTop: metrics.DEVICE_WIDTH * 0.1,
    borderRadius: metrics.DEVICE_WIDTH * 0.15,
    position: 'relative',
    elevation: 2
  },
  result_text: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: metrics.FONT_SIZE * 2,
    color: 'white'
  },
  unit_container: {
    width: metrics.DEVICE_WIDTH * 0.1,
    height: metrics.DEVICE_WIDTH * 0.1,
    borderRadius: metrics.DEVICE_WIDTH * 0.05,
    position: 'absolute',
    top: 0,
    right: 0,
    elevation: 3
  },
  unit_text: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: metrics.FONT_SIZE * 0.5,
    color: 'white'
  },
  btn_container: {
    paddingHorizontal: metrics.DEVICE_WIDTH * 0.1
  },
  chart_card: {
    alignSelf: 'center',
    margin: metrics.CONTAINER_HEIGHT * 0.05,
    width: metrics.DEVICE_WIDTH * 0.8,
    height: metrics.CONTAINER_HEIGHT * 0.5,
  }
});
