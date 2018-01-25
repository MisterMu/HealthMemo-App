import React from 'react';
import {
  View,
  Image,
  Text,
  Button,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import { TextField } from 'react-native-material-textfield';

import styles from './styles';
import color from '../../../config/color';
import error_messages from '../../../assets/values/error_messages';
import { validateMail } from '../../../tools/validator';
import { getIcon } from '../../../assets/icons/index';

export class EmergencyForm extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      ec_name: this.props.name || '',
      ec_num: this.props.phone || '',
      ec_mail: this.props.mail || '',
      err_name: '',
      err_num: '',
      err_mail: ''
    };
  }

  handleNameChange = (name) => {
    if (this.state.ec_name != name) {
      if (name == '') {
        this.setState({
          ec_name: name,
          err_name: error_messages.REQUIRE
        });
      } else {
        this.setState({
          ec_name: name,
          err_name: ''
        });
      }
    }
  }

  handlePhoneChange = (phone) => {
    if (this.state.ec_num != phone) {
      if (phone == '') {
        this.setState({
          ec_num: phone,
          err_num: error_messages.REQUIRE
        });
      } else {
        this.setState({
          ec_num: phone,
          err_num: ''
        });
      }
    }
  }

  handleMailChange = (mail) => {
    if (this.state.ec_mail != mail) {
      if (mail == '') {
        this.setState({
          ec_mail: mail,
          err_mail: error_messages.REQUIRE
        });
      } else if (!validateMail(mail)) {
        this.setState({
          ec_mail: mail,
          err_mail: error_messages.EMAIL
        });
      } else {
        this.setState({
          ec_mail: mail,
          err_mail: ''
        });
      }
    }
  }

  handleBtnPress = () => {
    if (this.state.ec_name != '' && this.state.ec_num != '' && this.state.ec_mail != '') {
      this.props.done({
        ec_name: this.state.ec_name,
        ec_num: this.state.ec_num,
        ec_mail: this.state.ec_mail
      });
    } else {
      if (this.state.ec_name == '') {
        this.setState({err_name: error_messages.REQUIRE});
      }
      if (this.state.ec_num == '') {
        this.setState({err_num: error_messages.REQUIRE});
      }
      if (this.state.ec_mail == '') {
        this.setState({err_mail: error_messages.REQUIRE});
      }
    }
  }

  render () {
    return (
      <View>
        <View style={styles.app_bar}>
          <TouchableOpacity style={styles.back_btn} onPress={this.props.back}>
            <Image style={styles.back_icon} source={getIcon('back_w')}/>
          </TouchableOpacity>
          <Text style={styles.title}>{(this.state.ec_name == '')? 'New Contact' : this.state.ec_name}</Text>
        </View>
        <View style={styles.form_container}>
          <TextField
            label='Emergency contact name'
            value={this.state.ec_name}
            error={this.state.err_name}
            onChangeText={this.handleNameChange}
            disabled={this.props.disable}
            tintColor={color.APP_THEME}
            containerStyle={styles.container}
            returnKeyType='next'
            onSubmitEditing={() => this.refs.num.focus()}
          />
          <TextField
            ref='num'
            label='Emergency contact number'
            value={this.state.ec_num}
            error={this.state.err_num}
            onChangeText={this.handlePhoneChange}
            disabled={this.props.disable}
            tintColor={color.APP_THEME}
            containerStyle={styles.container}
            keyboardType='phone-pad'
            returnKeyType='next'
            onSubmitEditing={() => this.refs.mail.focus()}
          />
          <TextField
            ref='mail'
            label='Emergency contact email'
            value={this.state.ec_mail}
            error={this.state.err_mail}
            onChangeText={this.handleMailChange}
            disabled={this.props.disable}
            tintColor={color.APP_THEME}
            containerStyle={styles.container}
            keyboardType='email-address'
          />
        </View>
        {
          (!this.props.disable)? 
            <View style={styles.btn_container}>
              <Button
                title='Save'
                onPress={this.handleBtnPress}
              />
            </View> : null
        }
      </View>
    );
  }
}