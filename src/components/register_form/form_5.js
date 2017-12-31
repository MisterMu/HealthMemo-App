import React from 'react';
import {
  View,
  Button,
  Text
} from 'react-native';
import { TextField } from 'react-native-material-textfield';

import styles from './styles';
import color from '../../../config/color';

export class RegisterForm5 extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      ec_name: '',
      ec_num: '',
      ec_mail: ''
    };
  }

  handleEcNameChange = (text) => {
    this.setState({ec_name: text});
  }

  handleEcNumChange = (text) => {
    this.setState({ec_num: text});
  }

  handleEcMailChange = (text) => {
    this.setState({ec_mail: text});
  }

  handleDoneBtnPress = () => {
    this.props.done();
  }

  render () {
    return (
      <View style={styles.host}>
        <View style={styles.form_container}>
          <Text style={styles.form_title}>Emergency Contact</Text>
          <TextField
            label='Emergency contact name'
            value={this.state.ec_name}
            onChangeText={this.handleEcNameChange}
            tintColor={color.APP_THEME}
            containerStyle={styles.container}
            returnKeyType='next'
            onSubmitEditing={() => this.refs.phone.focus()}
          />
          <TextField
            ref='phone'
            label='Emergency contact number'
            value={this.state.ec_num}
            onChangeText={this.handleEcNumChange}
            keyboardType='phone-pad'
            tintColor={color.APP_THEME}
            containerStyle={styles.container}
            returnKeyType='next'
            onSubmitEditing={() => this.refs.mail.focus()}
          />
          <TextField
            ref='mail'
            label='Emergency contact email'
            value={this.state.ec_mail}
            onChangeText={this.handleEcMailChange}
            keyboardType='email-address'
            tintColor={color.APP_THEME}
            containerStyle={styles.container}
          />
        </View>
        <View style={styles.btn}>
          <Button
            title='DONE'
            color={color.APP_THEME}
            onPress={this.handleDoneBtnPress}
          />
        </View>
      </View>
    );
  }
}
