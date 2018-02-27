import React from 'react';
import {
  View,
  DrawerLayoutAndroid,
  StyleSheet,
  Text,
  ToastAndroid,
  BackHandler
} from 'react-native';
import { BleManager } from 'react-native-ble-plx';

import { Appbar, Sidebar } from '../components';
import {
  EmergencyCallScreen,
  DashboardScreen,
  ProfileScreen,
  SetipDeviceScreen,
  SuggestionScreen,
  SettingScreen,
  HospitalInfoScreen,
  EmergencyContactScreen,
  SensorScreen,
  SendMailScreen
} from './';
import metrics from '../../config/metrics';
import sensor from '../../assets/values/sensor';

const DEVICE_ID = '30:AE:A4:19:84:36';
const SERVICE = '000000ff-0000-1000-8000-00805f9b34fb';
const CHARACTERISTIC = '0000ff01-0000-1000-8000-00805f9b34fb';

export class Container extends React.Component {
  constructor (props) {
    super (props);
    this.manager = new BleManager();
    this.state = {
      route: 'Dashboard',
      sensor_chars: null,
      ble_connect: 'nc'   /* sc = scan and connecting, nc = not connect, cn = connected */
    };
  }

  openSidebar = () => {
    console.log('open sidebar');
    this.refs.sidebar.openDrawer();
  }

  navigateTo = (routeName) => {
    console.log('navigate to', routeName);
    this.setState({ route: routeName });
    this.refs.sidebar.closeDrawer();
  }

  scanAndConnect = () => {
    this.manager.state().then((state) => {
      if (state === 'PoweredOn') {
        this.setState({ble_connect: 'sc'})
        this.manager.startDeviceScan(null, null, (err, device) => {
          if (err) {
            console.error(err);
          } else {
            if (device.id === DEVICE_ID) {
              this.manager.stopDeviceScan();
              device.connect()
              .then((device) => {
                return device.discoverAllServicesAndCharacteristics()
              })
              .then((device) => {
                return device.services();
              })
              .then((services) => {
                services.map((service) => {
                  if (service.uuid === SERVICE) {
                    service.characteristics().then((characteristics) => {
                      this.setState({sensor_chars: characteristics, ble_connect: 'cn'});
                    });
                  }
                });
              });
            }
          }
        });
      } else {
        ToastAndroid.show('Bluetooth must be turned on first.', ToastAndroid.LONG);
      }
    });
  }

  disconnectBle = () => {
    this.manager.cancelDeviceConnection(DEVICE_ID);
    this.setState({ble_connect: 'nc'});
  }

  componentWillMount () {
    const subscription = this.manager.onDeviceDisconnected(DEVICE_ID, (err, device) => {
      this.setState({ble_connect: 'nc', sensor_chars: null});
      subscription.remove();
    });
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.state.route != 'Dashboard') {
        this.setState({route: 'Dashboard'});
      } else {
        BackHandler.exitApp();
      }
      return true;
    });
  }

  render () {
    let screen = {};
    let cmd = {
      cn: this.scanAndConnect,
      dc: this.disconnectBle
    }
    if (this.state.route === 'Dashboard') {
      screen = <DashboardScreen nav={this.navigateTo} ble={this.state.ble_connect} ble_action={cmd}/>;
    } else if (this.state.route === 'Profile') {
      screen = <ProfileScreen nav={this.navigateTo}/>;
    } else if (this.state.route === 'Hospital Information') {
      screen = <HospitalInfoScreen/>;
    } else if (this.state.route === 'Emergency Contact') {
      screen = <EmergencyContactScreen/>;
    } else if (this.state.route === 'Suggestion') {
      screen = <SuggestionScreen/>;
    } else if (this.state.route === 'Emergency Call') { 
      screen = <EmergencyCallScreen/>;
    } else if (this.state.route === 'Send Email') {
      screen = <SendMailScreen/>;
    } else {
      if (this.state.sensor_chars) {
        screen = <SensorScreen index={sensor.SENSOR_NAME.indexOf(this.state.route)} ble={this.state.sensor_chars}/>;
      } else {
        ToastAndroid.show('Please connect your device first.', ToastAndroid.LONG);
        screen = <DashboardScreen nav={this.navigateTo} ble={this.state.ble_connect} ble_action={cmd}/>
      }
    }
    return (
      <DrawerLayoutAndroid
        ref='sidebar'
        drawerWidth={metrics.SIDEBAR_WIDTH}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => { return (
            <Sidebar
              nav={this.navigateTo}
            />
        )}}
      >
        <Appbar
          title={this.state.route}
          nav={this.openSidebar}
          call={() => this.navigateTo('Emergency Call')}
        />
        {screen}
      </DrawerLayoutAndroid>
    );
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress');
  }
}
