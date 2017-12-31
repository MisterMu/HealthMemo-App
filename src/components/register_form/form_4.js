import React from 'react';
import {
  View,
  Button,
  CheckBox,
  Text
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import styles from './styles';
import color from '../../../config/color';

var rtt_array = [false, false, false, false];

export class RegisterForm4 extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      id: '',
      rtt: rtt_array,
      other: ''
    };
  }

  handleIdInputChange = (text) => {
    this.setState({id: text});
  }

  handleRttChange = (index) => {
    rtt_array[index] = !rtt_array[index];
    this.setState({rtt: rtt_array});
  }

  handleOtherChange = (text) => {
    this.setState({other: text});
  }

  handleNextBtnPress = () => {
    // TODO: validation required
    // TODO: send input value to register screen
    this.props.next();
  }

  render () {
    let rtt_view = this.state.rtt.map((value, index) => {
      return checkboxGen(value, index, this.handleRttChange);
    });
    return (
      <View style={styles.host}>
        <View style={styles.form_container}>
          <TextField
            label='Citizen ID / Passport ID'
            value={this.state.id}
            onValueChange={this.handleIdInputChange}
            keyboardType='numeric'
            tintColor={color.APP_THEME}
            containerStyle={styles.container}
          />
          <View style={styles.container}>
            <Text style={styles.label}>Right to treatment</Text>
            {rtt_view}
            {(this.state.rtt[3])?
              <TextField
                ref='other'
                label='Other'
                value={this.state.other}
                onValueChange={this.handleOtherChange}
                tintColor={color.APP_THEME}
                containerStyle={styles.container}
                autoFocus={true}
              /> : null}
          </View>
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

const RTT_TEXT = [
  'สิทธิสวัสดิการการรักษาพยาบาลของข้าราชการ',
  'สิทธิประกันสังคม',
  'สิทธิหลักประกันสุขภาพ 30 บาท',
  'อื่นๆ'
]

function checkboxGen (value, index, handleFunction) {
  return (
    <View style={styles.rtt_container} key={'rtt' + index}>
      <CheckBox
        value={value}
        onValueChange={() => handleFunction(index)}
      />
      <Text style={styles.rtt_label}>{RTT_TEXT[index]}</Text>
    </View>
  );
}