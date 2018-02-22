import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
  Alert
} from 'react-native';
import { TextField } from 'react-native-material-textfield';

import styles from './styles';
import { getIcon } from '../../../assets/icons/index';
import color from '../../../config/color';
import error_messages from '../../../assets/values/error_messages';

export class InsuranceForm extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      company: this.props.company || '',
      i_name: this.props.name || '',
      i_num: this.props.num || '',
      a_name: this.props.a_name || '',
      a_tel: this.props.a_tel || '',
      err_company: '',
      err_i_name: '',
      err_i_num: '',
      err_a_name: '',
      err_a_tel: ''
    };
  }

  handleCompanyChange = (company) => {
    if (this.state.company != company) {
      if (company == '') {
        this.setState({
          company: company,
          err_company: error_messages.REQUIRE
        });
      } else {
        this.setState({
          company: company,
          err_company: ''
        });
      }
    }
  }

  handleINameChange = (name) => {
    if (this.state.i_name != name) {
      if (name == '') {
        this.setState({
          i_name: name,
          err_i_name: error_messages.REQUIRE
        });
      } else {
        this.setState({
          i_name: name,
          err_i_name: ''
        });
      }
    }
  }

  handleINumChange = (num) => {
    if (this.state.i_num != num) {
      if (num == '') {
        this.setState({
          i_num: num,
          err_i_num: error_messages.REQUIRE
        });
      } else {
        this.setState({
          i_num: num,
          err_i_num: ''
        });
      }
    }
  }

  handleANameChange = (name) => {
    if (this.state.a_name != name) {
      if (name == '') {
        this.setState({
          a_name: name,
          err_a_name: error_messages.REQUIRE
        });
      } else {
        this.setState({
          a_name: name,
          err_a_name: ''
        });
      }
    }
  }

  handleATelChange = (tel) => {
    if (this.state.a_tel != tel) {
      if (tel == '') {
        this.setState({
          a_tel: tel,
          err_a_tel: error_messages.REQUIRE
        });
      } else {
        this.setState({
          a_tel: tel,
          err_a_tel: ''
        });
      }
    }
  }

  handleBtnPress = () => {
    if (this.state.company != '' && this.state.i_name != '' && this.state.i_num != '' && this.state.a_name != '' && this.state.a_tel != '') {
      this.props.done({
        company: this.state.company,
        i_name: this.state.i_name,
        i_num: this.state.i_num,
        a_name: this.state.a_name,
        a_tel: this.state.a_tel
      });
    } else {
      if (this.state.company == '') {
        this.setState({err_company: error_messages.REQUIRE});
      }
      if (this.state.i_name == '') {
        this.setState({err_i_name: error_messages.REQUIRE});
      }
      if (this.state.i_num == '') {
        this.setState({err_i_num: error_messages.REQUIRE});
      }
      if (this.state.a_name == '') {
        this.setState({err_a_name: error_messages.REQUIRE});
      }
      if (this.state.a_tel == '') {
        this.setState({err_a_tel: error_messages.REQUIRE});
      }
    }
  }

  handleDelBtnPress = () => {
    Alert.alert(
      'Delete ' + this.props.name + ' info',
      'Are you sure?',
      [
        {text: 'Cancel'},
        {text: 'Delete', onPress: this.props.del}
      ]
    );
  }

  render () {
    return (
      <View style={styles.host}>
        <View style={styles.app_bar}>
          <TouchableOpacity style={styles.back_btn} onPress={this.props.back}>
            <Image style={styles.back_icon} source={getIcon('back_w')}/>
          </TouchableOpacity>
          <Text style={styles.title}>{(this.props.name == '')? 'New Insurance' : this.props.name}</Text>
        </View>
        <ScrollView>
          <View style={styles.form_container}>
            <TextField
              label='Insurance Company'
              value={this.state.company}
              error={this.state.err_company}
              onChangeText={this.handleCompanyChange}
              tintColor={color.APP_THEME}
              containerStyle={styles.container}
              returnKeyType='next'
              onSubmitEditing={() => this.refs.i_name.focus()}
            />
            <TextField
              ref='i_name'
              label='Insurance Name'
              value={this.state.i_name}
              error={this.state.err_i_name}
              onChangeText={this.handleINameChange}
              tintColor={color.APP_THEME}
              containerStyle={styles.container}
              returnKeyType='next'
              onSubmitEditing={() => this.refs.i_num.focus()}
            />
            <TextField
              ref='i_num'
              label='Insurance Num'
              value={this.state.i_num}
              error={this.state.err_i_num}
              onChangeText={this.handleINumChange}
              tintColor={color.APP_THEME}
              containerStyle={styles.container}
              keyboardType='numeric'
              returnKeyType='next'
              onSubmitEditing={() => this.refs.a_name.focus()}
            />
            <TextField
              ref='a_name'
              label='Agent Name'
              value={this.state.a_name}
              error={this.state.err_a_name}
              onChangeText={this.handleANameChange}
              tintColor={color.APP_THEME}
              containerStyle={styles.container}
              returnKeyType='next'
              onSubmitEditing={() => this.refs.a_tel.focus()}
            />
            <TextField
              ref='a_tel'
              label='Agent Telelphone Number'
              value={this.state.a_tel}
              error={this.state.err_a_tel}
              onChangeText={this.handleATelChange}
              tintColor={color.APP_THEME}
              containerStyle={styles.container}
              keyboardTpye='phone-pad'
            />
          </View>
          <View style={styles.btn_container}>
            <Button
              title='SAVE'
              onPress={this.handleBtnPress}
            />
          </View>
          {
            (this.props.name)?
              <View style={styles.btn_container}>
                <Button
                  title='DELETE'
                  onPress={this.handleDelBtnPress}
                  color='red'
                />
              </View> : null
          }
        </ScrollView>
      </View>
    );
  }
}