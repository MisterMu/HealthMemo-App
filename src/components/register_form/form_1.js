import React from 'react';
import { View, Button } from 'react-native';
import { TextField } from 'react-native-material-textfield';

import styles from './styles';
import color from '../../../config/color';
import error_messages from '../../../assets/values/error_messages';

export class RegisterForm1 extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      f_name: '',
      l_name: '',
      err_f_name: '',
      err_l_name: ''
    };
  }

  handleFnameChange = (name) => {
    if (name !== this.state.f_name) {
      this.setState({f_name: name});
    }
    if (name === '') {
      this.setState({err_f_name: error_messages.REQUIRE});
    } else {
      this.setState({err_f_name: ''});
    }
  }

  handleLnameChange = (name) => {
    if (name !== this.state.l_name) {
      this.setState({l_name: name});
    }
    if (name === '') {
      this.setState({err_l_name: error_messages.REQUIRE});
    } else {
      this.setState({err_l_name: ''});
    }
  }

  handleNextBtnPress = () => {
    // TODO: send input value to RegisterScreen
    if (this.state.f_name !== '' && this.state.l_name !== '') {
      this.props.next();
    } else {
      this.handleFnameChange(this.state.f_name);
      this.handleLnameChange(this.state.l_name);
    }
  }

  render () {
    return (
      <View style={styles.host}>
        <View style={styles.form_container}>
          <View style={styles.img_container}>
            {/* TODO: add image that get from google signin */}
          </View>
          <TextField
            label='First Name'
            value={this.state.f_name}
            error={this.state.err_f_name}
            tintColor={color.APP_THEME}
            containerStyle={styles.container}
            onChangeText={(text) => this.handleFnameChange(text)}
            returnKeyType='next'
            onSubmitEditing={() => this.refs.l_name.focus()}
          />
          <TextField
            label='Last Name'
            value={this.state.l_name}
            error={this.state.err_l_name}
            ref='l_name'
            tintColor={color.APP_THEME}
            containerStyle={styles.container}
            onChangeText={(text) => this.handleLnameChange(text)}
          />
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
