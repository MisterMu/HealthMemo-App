import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  ToastAndroid,
  ScrollView
} from 'react-native';

import metrics from '../../config/metrics';
import sensor from '../../assets/values/sensor';
import { SensorCard } from '../components/sesnsor_card';

export class DashboardScreen extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      weight: 0,
      height: 0
    };
  }

  sensorCardPress = (name) => {
    if (this.props.ble === 'cn') {
      this.props.nav(name);
    } else {
      ToastAndroid.show('Please connect your device first.', ToastAndroid.LONG);
    }
  }

  bleCardPress = () => {
    if (this.props.ble === 'nc') {
      this.props.ble_action.cn();
    } else if (this.props.ble === 'cn') {
      this.props.ble_action.dc();
    }
  }

  componentDidMount () {
    AsyncStorage.getItem('user_info').then((data) => {
      if (data) {
        this.setState({
          weight: JSON.parse(data).weight,
          height: JSON.parse(data).height
        })
      }
    }).catch(err => console.error(err));
  }

  render () {
    console.log('dashboard');
    let bmi = this.state.weight / Math.pow((this.state.height / 100), 2);
    bmi = bmi.toFixed(2);
    let ble_status = '', ble_text = '';
    if (this.props.ble === 'nc') {
      ble_status = 'grey';
      ble_text = 'Not connect';
    } else if (this.props.ble === 'sc') {
      ble_text = 'Connecting...';
    } else if (this.props.ble === 'cn') {
      ble_status = 'lightgreen';
      ble_text = 'Connected'
    }
    let sensor_cards = sensor.SENSOR_NAME.map((name, index) => {
      return (
        <TouchableOpacity style={{paddingBottom: 16}} key={index} onPress={() => this.sensorCardPress(name)}>
          <SensorCard index={index}/>
        </TouchableOpacity>
      );
    });
    return (
      <ScrollView style={styles.host}>
        <TouchableOpacity onPress={this.bleCardPress} disabled={this.props.ble === 'sc'}>
          <View style={styles.card}>
            {(this.props.ble === 'sc')? 
              <ActivityIndicator style={styles.indicator}/>:
              <View style={[styles.light, {backgroundColor: ble_status}]}/>
            }
            <Text style={styles.card_title}>{ble_text}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.nav('Profile')}>
          <View style={styles.card}>
            <View style={styles.info}>
              <Text style={styles.label}>Weight</Text>
              <Text style={styles.value}>{this.state.weight} kg</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Height</Text>
              <Text style={styles.value}>{this.state.height} cm</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>BMI</Text>
              <Text style={styles.value}>{bmi}</Text>
            </View>
          </View>
        </TouchableOpacity>
        {sensor_cards}
      </ScrollView>
    );
  }

  openSidebar = () => {
    this.refs.drawer.openDrawer();
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    padding: 8
  },
  card: {
    backgroundColor: 'white',
    elevation: 4,
    padding: 16,
    position: 'relative',
    marginBottom: 8
  },
  indicator: {
    position: 'absolute',
    top: 18,
    left: 16
  },
  light: {
    width: 14,
    height: 14,
    borderRadius: 7,
    position: 'absolute',
    top: 22,
    left: 16
  },
  card_title: {
    fontSize: metrics.FONT_SIZE,
    marginLeft: 36
  },
  info: {
    position: 'relative',
    paddingBottom: 8,
    paddingLeft: 8
  },
  label: {
    fontSize: metrics.FONT_SIZE
  },
  value: {
    position: 'absolute',
    fontSize: metrics.FONT_SIZE,
    right: 16,
    top: 8
  }
});