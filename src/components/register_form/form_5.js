import React from 'react';
import {
  View,
  Button,
  Text,
  AsyncStorage
} from 'react-native';
import { TextField } from 'react-native-material-textfield';

import styles from './styles';
import color from '../../../config/color';
import error_messages from '../../../assets/values/error_messages';

export class RegisterForm5 extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      ec_name: this.props.ec_name || '',
      ec_num: this.props.ec_num || '',
      ec_mail: this.props.ec_mail || '',
      err_name: '',
      err_num: '',
      err_mail: ''
    };
  }

  handleEcNameChange = (text) => {
    if (text !== this.state.ec_name) {
      this.setState({ec_name: text});
    }
    if (text === '') {
      this.setState({err_name: error_messages.REQUIRE});
    } else {
      this.setState({err_name: ''});
    }
  }

  handleEcNumChange = (text) => {
    if (text !== this.state.ec_num) {
      this.setState({ec_num: text});
    }
    if (text === '') {
      this.setState({err_num: error_messages.REQUIRE});
    } else {
      this.setState({err_num: ''});
    }
  }

  handleEcMailChange = (text) => {
    if (text !== this.state.ec_mail) {
      this.setState({ec_mail: text});
    }
    this.validateEcMail(text);
  }

  validateEcMail = (mail) => {
    let pass = false;
    let mail_patt = /([^@]+)@([\w]+)[.](\w+)/g;
    if (mail === '') {
      this.setState({err_mail: error_messages.REQUIRE});
      pass = false;
    } else {
      let mail_match = mail.match(mail_patt);
      if (mail_match && mail === mail_match[0]) {
        this.setState({err_mail: ''});
        pass = true;
      } else {
        this.setState({err_mail: error_messages.EMAIL});
        pass = false;
      }
    }
    return pass;
  }

  handleDoneBtnPress = () => {
    if (this.state.ec_name !== '' && this.state.ec_num !== '' && this.validateEcMail(this.state.ec_mail)) {
      let data = {
        ec_name: this.state.ec_name,
        ec_num: this.state.ec_num,
        ec_mail: this.state.ec_mail
      }
      let tmp = {
        ec_name: 'Emergency Contact',
        ec_num: '1669',
        ec_mail: ''
      }
      AsyncStorage.setItem('ec', JSON.stringify([tmp, data])).then(() => {
        this.props.done(data);
      }).catch(err => console.error(err));
    } else {
      this.handleEcNameChange(this.state.ec_name);
      this.handleEcNumChange(this.state.ec_num);
      this.validateEcMail(this.state.ec_mail);
    }
  }

  render () {
    return (
      <View style={styles.host}>
        <View style={styles.form_container}>
          <Text style={styles.form_title}>Emergency Contact</Text>
          <TextField
            label='Emergency contact name'
            value={this.state.ec_name}
            error={this.state.err_name}
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
            error={this.state.err_num}
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
            error={this.state.err_mail}
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
