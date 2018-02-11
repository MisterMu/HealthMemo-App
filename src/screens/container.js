import React from 'react';
import {
  View,
  DrawerLayoutAndroid,
  StyleSheet,
  Button
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
  EmergencyContactScreen
} from './';
import metrics from '../../config/metrics';

const DEVICE_ID = '30:AE:A4:19:84:36';
const SERVICE = '000000FF-0000-1000-8000-00805F9B34fb';
const CHARACTERISTIC = '0000FF01-0000-1000-8000-00805F9B34fb';

export class Container extends React.Component {
  constructor (props) {
    super (props);
    this.manager = new BleManager();
    this.state = {
      route: 'Dashboard',
      ble_connect: 'sc'   /* sc = scan and connecting, nc = not connect, cn = connected */
    };
  }

  scanAndConnect = () => {
    this.manager.startDeviceScan(null, null, (err, device) => {
      if (err) {
        console.error(err);
      } else {
        if (device.id === DEVICE_ID) {
          this.manager.stopDeviceScan();
          console.log('BLE success!!');
          device.connect().then(() => {
            console.log(device.serviceUUIDs)
            this.setState({ble_connect: true});
            this.manager.readCharacteristicForDevice(device.id, SERVICE, CHARACTERISTIC).then((characteristic) => {
              console.log(characteristic.value);
            });
          });
        }
      }
    });
  }

  componentWillMount () {
    const subscription = this.manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);
  }

  render () {
    let screen = {};
    if (this.state.route === 'Dashboard') {
      screen = <DashboardScreen nav={this.navigateTo} ble={this.state.ble_connect}/>;
    } else if (this.state.route === 'Profile') {
      screen = <ProfileScreen nav={this.navigateTo}/>;
    } else if (this.state.route === 'Hospital Information') {
      screen = <HospitalInfoScreen/>;
    } else if (this.state.route === 'Emergency Contact') {
      screen = <EmergencyContactScreen/>;
    } else if (this.state.route === 'Suggestion') {
      screen = <SuggestionScreen/>;
    } else if (this.state.route === 'Setting') {
      screen = <SettingScreen/>;
    } else if (this.state.route === 'Emergency Call') { 
      screen = <EmergencyCallScreen/>;
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
        statusBarBackgroundColor='rgba(0, 0, 0, 0.3)'
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

  openSidebar = () => {
    console.log('open sidebar');
    this.refs.sidebar.openDrawer();
  }

  navigateTo = (routeName) => {
    console.log('navigate to', routeName);
    this.setState({ route: routeName });
    this.refs.sidebar.closeDrawer();
  }
}
