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
    DatePickerAndroid.open(this.dob).then((action) => {
      this.setState({
        dob: new Date(action.year, action.month, action.day)
      });
    }).catch();
  }

  handleGenderChange = (value, index) => {
    this.setState({gender: value});
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
        </View>
        <View style={styles.btn}>
          <Button
            title='NEXT'
            color={color.APP_THEME}
            onPress={this.props.next}
          />
        </View>
      </View>
    );
  }
}