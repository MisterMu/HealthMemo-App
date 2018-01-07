import React from 'react';
import { Text } from 'react-native';

export class DashboardScreen extends React.Component {
  constructor (props) {
    super (props);
    this.state = {

    };
  }

  static navigationOptions = {
    title: 'Dashboard'
  };

  render () {
    return <Text>dashboard</Text>;
  }
}