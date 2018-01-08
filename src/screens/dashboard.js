import React from 'react';
import { View, Text, Button, DrawerLayoutAndroid } from 'react-native';

export class DashboardScreen extends React.Component {
  constructor (props) {
    super (props);
    this.state = {

    };
  }

  render () {
    console.log('dashboard');
    return (
      null
    );
  }

  openSidebar = () => {
    console.log('sidebar')
    this.refs.drawer.openDrawer();
  }
}