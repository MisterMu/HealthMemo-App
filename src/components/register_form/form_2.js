import React from 'react';
import {
  View,
  DatePickerAndroid,
  Button,
  Keyboard
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

  dateInputDidFocus = () => {
    Keyboard.dismiss();
    DatePickerAndroid.open(this.dob).then((action) => {
      this.setState({
        dob: new Date(action.year, action.month, action.day)
      });
    }).catch();
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
            onFocus={this.dateInputDidFocus}
          />
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