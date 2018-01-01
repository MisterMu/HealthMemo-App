import React from 'react';
import {
  View,
  Button,
  Picker,
  Alert
} from 'react-native';
import { TextField } from 'react-native-material-textfield';

import styles from './styles';
import color from '../../../config/color';
import error_messages from '../../../assets/values/error_messages';

export class RegisterForm3 extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      weight: this.props.weight || '',
      height: this.props.height || '',
      blood_type: this.props.blood_type || '',
      err_weight: '',
      err_height: ''
    };
  }

  handleWeightInputChange = (number) => {
    if (number !== this.state.weight) {
      this.setState({weight: number});
    }
    if (number === '') {
      this.setState({err_weight: error_messages.REQUIRE});
    } else {
      this.setState({err_weight: ''});
    }
  }

  handleHeightInputChange = (number) => {
    if (number !== this.state.height) {
      this.setState({height: number});
    }
    if (number === '') {
      this.setState({err_height: error_messages.REQUIRE});
    } else {
      this.setState({err_height: ''});
    }
  }

  handleBloodChange = (value) => {
    if (value !== this.state.blood_type) {
      this.setState({blood_type: value});
    }
  }

  handelNextBtnClick = () => {
    if (this.state.blood_type !== '' && this.state.height !== '' && this.state.weight !== '') {
      let data = {
        weight: this.state.weight,
        height: this.state.height,
        blood_type: this.state.blood_type
      }
      this.props.next(data);
    } else {
      if (this.state.blood_type === '') {
        Alert.alert('Blood type required', 'Please select your blood type.');
      }
      this.handleWeightInputChange(this.state.weight);
      this.handleHeightInputChange(this.state.height);
    }
  }

  render () {
    return (
      <View style={styles.host}>
        <View style={styles.form_container}>
          <TextField
            label='Weight'
            value={this.state.weight}
            error={this.state.err_weight}
            onChangeText={this.handleWeightInputChange}
            tintColor={color.APP_THEME}
            containerStyle={styles.container}
            style={styles.number}
            keyboardType='numeric'
            returnKeyType='next'
            onSubmitEditing={() => this.refs.h_input.focus()}
            suffix='kg'
          />
          <TextField
            label='Height'
            value={this.state.height}
            error={this.state.err_height}
            onChangeText={this.handleHeightInputChange}
            tintColor={color.APP_THEME}
            containerStyle={styles.container}
            style={styles.number}
            keyboardType='numeric'
            returnKeyType='done'
            suffix='cm'
            ref='h_input'
          />
          <View style={[styles.picker, styles.container]}>
            <Picker
              selectedValue={this.state.blood_type}
              onValueChange={this.handleBloodChange}
              mode='dropdown'
            >
              <Picker.Item label='-- BLOOD TYPE --' value=''/>
              <Picker.Item label='A' value='A'/>
              <Picker.Item label='B' value='B'/>
              <Picker.Item label='AB' value='AB'/>
              <Picker.Item label='O' value='O'/>
            </Picker>
          </View>
        </View>
        <View style={styles.btn}>
          <Button
            title='NEXT'
            color={color.APP_THEME}
            onPress={this.handelNextBtnClick}
          />
        </View>
      </View>
    );
  }
}
