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
      if (char_tmp === sensor.SENSOR_NAME[this.props.index]) {
        char_tmp.read().then((sensor) => {
          this.setState({value: sensor.value(), disable: false});
        })
      }
    });
  }

  btnPress = () => {
    if (this.props.index === 1) {
      this.setState({disable: true, time: 30});
      setTimeout(() => {}, 30000);
    }
    this.setState({disable: true});
    // this.getDataFromSensor();
    let date = new Date();
    let tmp = this.state.data;
    tmp.D[date.getHours() - 1] = this.state.value;
    tmp.W[date.getDay()] = Math.round(findMean(tmp.D));
    tmp.M[date.getDate() - 1] = Math.round(findMean(tmp.D));
    tmp.Y[date.getMonth()] = Math.round(findMean(tmp.M));
    tmp.lastMeasure = {
      date: tmp.lastUpdate || date,
      value: this.state.value
    }
    tmp.lastUpdate = date;
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
      console.log(JSON.parse(data));
      this.setState({data: JSON.parse(data)});
    });
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
            disabled={this.state.disable}
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
