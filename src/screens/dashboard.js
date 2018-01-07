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
    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
      </View>
    );
    return (
      // <View>
      //   <Text> asd </Text>
      //   <Button title='btn'/>
      // </View>
      <DrawerLayoutAndroid
        ref='drawer'
        drawerWidth={200}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}
      >
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Hello</Text>
          <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>World!</Text>
          <Button title='press me' onPress={this.openSidebar}/>
        </View>
      </DrawerLayoutAndroid>
    );
  }

  openSidebar = () => {
    console.log('sidebar')
    this.refs.drawer.openDrawer();
  }
}