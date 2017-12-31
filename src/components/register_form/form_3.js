import React from 'react';
import {
  View,
  Button,
  Picker
} from 'react-native';
import { TextField } from 'react-native-material-textfield';

import styles from './styles';
import color from '../../../config/color';

export class RegisterForm3 extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      weight: '',
      height: '',
      blood_type: ''
    };
  }

  handleWeightInputChange = (number) => {
    this.setState({weight: number})
  }

  handleHeightInputChange = (number) => {
    this.setState({height: height})
  }

  handleBloodChange = (value, index) => {
    this.setState({blood_type: value})
  }

  handelNextBtnClick = () => {
    // TODO: send input value to register screen
    // TODO: validation require
    this.props.next();
  }

  render () {
    return (
      <View style={styles.host}>
        <View style={styles.form_container}>
          <TextField
            label='Weight'
            value={this.state.weight}
            onValueChange={this.handleWeightInputChange}
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
            onValueChange={this.handleHeightInputChange}
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