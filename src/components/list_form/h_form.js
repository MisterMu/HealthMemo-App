import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { TextField } from 'react-native-material-textfield';

import styles from './styles';
import color from '../../../config/color';
import error_messages from '../../../assets/values/error_messages';

export class HospitalForm extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      h_name: this.props.name || '',
      h_num: this.props.num || '',
      h_addr: this.props.addr || '',
      h_tel: this.props.tel || '',
      err_name: '',
      err_num: '',
      err_addr: '',
      err_tel: ''
    };
  }

  handleNameChange = (name) => {
    if (this.state.h_name != name) {
      if (name == '') {
        this.setState({
          h_name: name,
          err_name: error_messages.REQUIRE
        });
      } else {
        this.setState({
          h_name: name,
          err_name: error_messages.REQUIRE
        });
      }
    }
  }

  handleNumChange = (num) => {
    if (this.state.h_num != num) {
      if (num == '') {
        this.setState({
          h_num: num,
          err_num: error_messages.REQUIRE
        });
      } else {
        this.setState({
          h_num: num,
          err_num: error_messages.REQUIRE
        });
      }
    }
  }

  handleAddrChange = (addr) => {
    if (this.state.h_addr != addr) {
      if (addr == '') {
        this.setState({
          h_addr: addr,
          err_addr: error_messages.REQUIRE
        });
      } else {
        this.setState({
          h_addr: addr,
          err_addr: error_messages.REQUIRE
        });
      }
    }
  }

  handleTelChange = (tel) => {
    if (this.state.h_tel != tel) {
      if (tel == '') {
        this.setState({
          h_tel: tel,
          err_tel: error_messages.REQUIRE
        });
      } else {
        this.setState({
          h_tel: tel,
          err_tel: error_messages.REQUIRE
        });
      }
    }
  }

  handleBtnPress = () => {
    if (this.state.h_name != '' && this.state.h_num != '' && this.state.h_addr != '' && this.state.h_tel != '') {
      this.props.done({
        h_name: this.state.h_name,
        h_num: this.state.h_num,
        h_addr: this.state.h_addr,
        h_tel: this.state.h_tel
      });
    } else {
      if (this.state.h_name == '') {
        this.setState({err_name: error_messages.REQUIRE});
      }
      if (this.state.h_num == '') {
        this.setState({err_num: error_messages.REQUIRE});
      }
      if (this.state.h_addr == '') {
        this.setState({err_addr: error_messages.REQUIRE});
      }
      if (this.state.h_tel == '') {
        this.setState({err_tel: error_messages.REQUIRE});
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
          <Text style={styles.title}>{(this.state.ec_name == '')? 'New Hospital' : this.state.ec_name}</Text>
        </View>
        <View style={styles.form_container}>
          <TextField
            label='Hospital name'
            value={this.state.h_name}
            error={this.state.err_name}
            onChangeText={this.handleNameChange}
            tintColor={color.APP_THEME}
            containerStyle={styles.container}
            returnKeyType='next'
            onSubmitEditing={() => this.refs.num.focus()}
          />
          <TextField
            ref='num'
            label='Patient ID'
            value={this.state.h_num}
            error={this.state.err_num}
            onChangeText={this.handleNumChange}
            tintColor={color.APP_THEME}
            containerStyle={styles.container}
            keyboardType='numeric'
            returnKeyType='next'
            onSubmitEditing={() => this.refs.addr.focus()}
          />
          <TextField
            ref='addr'
            label='Address'
            value={this.state.h_addr}
            error={this.state.err_addr}
            onChangeText={this.handleAddrChange}
            tintColor={color.APP_THEME}
            containerStyle={styles.container}
            returnKeyType='next'
            onSubmitEditing={() => this.refs.tel.focus()}
          />
          <TextField
            ref='tel'
            label='Telephone number'
            value={this.state.h_tel}
            error={this.state.err_tel}
            onChangeText={this.handleTelChange}
            tintColor={color.APP_THEME}
            containerStyle={styles.container}
            keyboardType='phone-pad'
          />
        </View>
        <View style={styles.btn_container}>
          <Button
            title='Save'
            onPress={this.handleBtnPress}
          />
        </View>
      </View>
    );
  }
}