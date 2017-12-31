import React from 'react';
import {
  View,
  DatePickerAndroid,
  Button,
  Keyboard,
  Picker
} from 'react-native';
import { TextField } from 'react-native-material-textfield';

import styles from './styles';
import * as DateTool from '../../../tools/date'
import color from '../../../config/color';

export class RegisterForm2 extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      dob: '',
      gender: '',
      region: ''
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
          dob: new Date(action.year, action.month, action.day)
        });
      }
    }).catch();
  }

  handleGenderChange = (value, index) => {
    this.setState({gender: value});
  }

  handleRegionChange = (text) => {
    this.setState({region: text});
  }

  handleNextBtnClick = () => {
    // TODO: send input value to register screen
    this.props.next();
  }

  render () {
    return (
      <View style={styles.host}>
        <View style={styles.form_container}>
          <TextField
            label='Date of Birth'
            value={DateTool.getFullFormat(this.state.dob)}
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
            tintColor={color.APP_THEME}
            containerStyle={styles.container}
            onValueChange={this.handleRegionChange}
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