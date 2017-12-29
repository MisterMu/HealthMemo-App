import React from 'react';
import { View, Button } from 'react-native';
import { TextField } from 'react-native-material-textfield';

import styles from './styles';
import color from '../../../config/color';

export class RegisterForm1 extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      f_name: '',
      l_name: '',
    };
  }

  handleFnameChange = (name) => {
    this.setState({f_name: name});
  }

  handleLnameChange = (name) => {
    this.setState({l_name: name});
  }

  handleNextBtnPress = () => {
    this.props.next();
  }

  render () {
    return (
      <View style={styles.host}>
        <View style={styles.form_container}>
          <View style={styles.img_container}>
            {/* TODO: add image that get from google signin */}
          </View>
          <TextField
            label='First Name'
            value={this.state.f_name}
            tintColor={color.APP_THEME}
            containerStyle={styles.container}
            onChangeText={(text) => this.handleFnameChange(text)}
            prefix='test'
          />
          <TextField
            label='Last Name'
            value={this.state.l_name}
            tintColor={color.APP_THEME}
            containerStyle={styles.container}
            onChangeText={(text) => this.handleLnameChange(text)}
            suffix='test'
          />
        </View>
        <View style={styles.btn}>
          <Button
            title='NEXT'
            color={color.APP_THEME}
            onPress={this.handleNextBtnPress}
          />
        </View>
      </View>
    );
  }
}
