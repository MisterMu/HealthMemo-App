import React from 'react';
import {
  View,
  DrawerLayoutAndroid,
  StyleSheet,
  Button
} from 'react-native';

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

export class Container extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      route: 'Dashboard'
    };
  }

  render () {
    let screen = {};
    if (this.state.route === 'Dashboard') {
      screen = <DashboardScreen nav={this.navigateTo}/>;
    } else if (this.state.route === 'Profile') {
      screen = <ProfileScreen nav={this.navigateTo}/>;
    } else if (this.state.route === 'Hospital Information') {
      screen = <HospitalInfoScreen/>;
    } else if (this.state.route === 'Emergency Contact') {
      screen = <EmergencyContactScreen/>;
    } else if (this.state.route === 'Setup Device') {
      screen = <SetipDeviceScreen/>;
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
