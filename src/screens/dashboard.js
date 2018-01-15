import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';

import metrics from '../../config/metrics';

export class DashboardScreen extends React.Component {
  constructor (props) {
    super (props);
    this.state = {

    };
  }

  render () {
    console.log('dashboard');
    let bmi = this.props.user.weight / Math.pow((this.props.user.height / 100), 2);
    bmi = bmi.toFixed(2);
    return (
      <View style={styles.host}>
        <TouchableWithoutFeedback onPress={() => this.props.nav('Setup Device')}>
          <View style={styles.card}>
            <View style={[styles.light, {backgroundColor: (this.state.ble)? 'lightgreen' : 'grey'}]}/>
            <Text style={styles.card_title}>Device Name</Text>
            <Text style={styles.card_status}>not connected</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.props.nav('Profile')}>
          <View style={styles.card}>
            <View style={styles.info}>
              <Text style={styles.label}>Weight</Text>
              <Text style={styles.value}>{this.props.user.weight} kg</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Height</Text>
              <Text style={styles.value}>{this.props.user.height} cm</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>BMI</Text>
              <Text style={styles.value}>{bmi}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  openSidebar = () => {
    console.log('sidebar')
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
    elevation: 2,
    padding: 8,
    position: 'relative',
    marginBottom: 8
  },
  light: {
    width: 14,
    height: 14,
    borderRadius: 7,
    position: 'absolute',
    top: 24,
    left: 16
  },
  card_title: {
    fontSize: metrics.FONT_SIZE,
    marginLeft: 36
  },
  card_status: {
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