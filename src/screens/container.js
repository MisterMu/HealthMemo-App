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
      screen = <DashboardScreen/>;
    } else if (this.state.route === 'Profile') {
      screen = <ProfileScreen/>;
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
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => <Sidebar nav={this.navigateTo}/>}
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
  }
}
