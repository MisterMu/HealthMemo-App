import React from 'react';
import {
  View,
  DatePickerAndroid,
  Button,
  Keyboard,
  Picker,
  Alert
} from 'react-native';
import { TextField } from 'react-native-material-textfield';

import styles from './styles';
import * as DateTool from '../../../tools/date'
import color from '../../../config/color';
import error_messages from '../../../assets/values/error_messages';

export class RegisterForm2 extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      dob: '',
      gender: '',
      region: '',
      err_dob: '',
      err_region: ''
    };
  }

  handleDateInputFocus = () => {
    Keyboard.dismiss();
    let option = {
      date: (this.state.dob instanceof Date)? this.state.dob : new Date(),
      maxDate: new Date()
    }
    DatePickerAndroid.open(option).then((action) => {
      if (action.action === 'dateSetAction') {
        this.setState({
          dob: new Date(action.year, action.month, action.day),
          err_dob: ''
        });
      }
    }).catch();
  }

  handleGenderChange = (value) => {
    if (value !== this.state.gender) {
      this.setState({gender: value});
    }
  }

  handleRegionChange = (text) => {
    if (text !== this.state.region) {
      this.setState({region: text});
    }
    if (text === '') {
      this.setState({err_region: error_messages.REQUIRE});
    } else {
      this.setState({err_region: ''});
    }
  }

  handleNextBtnClick = () => {
    // TODO: send input value to register screen
    if (this.state.dob !== '' && this.state.gender !== '' && this.state.region !== '') {
      this.props.next();
    } else {
      if (this.state.dob === '') {
        this.setState({err_dob: error_messages.REQUIRE});
      }
      if (this.state.gender === '') {
        Alert.alert('Gender required', 'Please select your gender.');
      }
      this.handleRegionChange(this.state.region);
    }
  }

  render () {
    return (
      <View style={styles.host}>
        <View style={styles.form_container}>
          <TextField
            label='Date of Birth'
            value={DateTool.getFullFormat(this.state.dob)}
            error={this.state.err_dob}
            tintColor={color.APP_THEME}
            containerStyle={styles.container}
            onFocus={this.handleDateInputFocus}
          />
          <View style={[styles.picker, styles.container]}>
            <Picker
              selectedValue={this.state.gender}
              onValueChange={this.handleGenderChange}
              mode='dropdown'
            >
              <Picker.Item label='-- SELECT GENDER --' value=''/>
              <Picker.Item label='MALE' value='m'/>
              <Picker.Item label='FEMALE' value='f'/>
            </Picker>
          </View>
          <TextField
            label='Region'
            value={this.state.region}
            error={this.state.err_region}
            tintColor={color.APP_THEME}
            containerStyle={styles.container}
            onChangeText={this.handleRegionChange}
          />
        </View>
        <View style={styles.btn}>
          <Button
            title='NEXT'
            color={color.APP_THEME}
            onPress={this.handleNextBtnClick}
          />
        </View>
      </View>
    );
  }
}
