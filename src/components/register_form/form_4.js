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
import error_messages from '../../../assets/values/error_messages';

var rtt_array = [false, false, false, false];

export class RegisterForm4 extends React.Component {
  constructor (props) {
    super (props);
    (this.props.rtt)? rtt_array = this.props.rtt : null;
    this.state = {
      id: this.props.id || '',
      rtt: rtt_array,
      other: this.props.other || '',
      err_id: '',
      err_other: ''
    };
  }

  handleIdInputChange = (text) => {
    if (text !== this.state.id) {
      this.setState({id: text});
    }
    if (text === '') {
      this.setState({err_id: error_messages.REQUIRE});
    } else {
      this.setState({err_id: ''});
    }
  }

  handleRttChange = (index) => {
    rtt_array[index] = !rtt_array[index];
    this.setState({rtt: rtt_array});
  }

  handleOtherChange = (text) => {
    if (text !== this.state.other) {
      this.setState({other: text});
    }
    if (text === '') {
      this.setState({err_other: error_messages.REQUIRE});
    } else {
      this.setState({err_other: ''});
    }
  }

  handleNextBtnPress = () => {
    let pass = this.state.id !== '';
    if (this.state.rtt[3]) {
      pass = (this.state.other !== '' && pass);
    }
    if (pass) {
      let data = {
        id: this.state.id,
        rtt: this.state.rtt,
        other: this.state.other
      }
      this.props.next(data);
    } else {
      this.handleIdInputChange(this.state.id);
      this.handleOtherChange(this.state.other);
    }
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
            error={this.err_id}
            onChangeText={this.handleIdInputChange}
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
                error={this.state.err_other}
                onChangeText={this.handleOtherChange}
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
