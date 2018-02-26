import React from 'react';
import {
  View,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';

import { SGIndicator } from '../components/suggestion_indicator';
import suggestion from '../../assets/values/suggestion';
import sensor from '../../assets/values/sensor';

export class SuggestionScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      disabled: true,
      bmi: 0,
      heart_rate: {},
      oxygen: {}
    }
  }

  getOxygenRange = (value) => {
    let index = (value <= 92)? 1 : 0;
    this.setState({
      oxygen: {
        range: suggestion.OXYGEN.range,
        comment: suggestion.OXYGEN.comment[index],
        index: suggestion.OXYGEN.range.length - index - 1,
        color: ['#E0694C', '#71B562']
      }
    })
  }

  getHeartRateRange = (age, gender, value) => {
    let age_index = 0;
    if (age < 18) {
      age_index = 0;
    } else if (age >= 66) {
      age_index = 5;
    } else {
      for (let i = 0; i < suggestion.HEART_RATE.age.length; i++) {
        if (age < suggestion.HEART_RATE.age[i]) {
          age_index = i - 1;
          break;
        }
      }
    }
    let range = suggestion.HEART_RATE[gender][age_index];
    let comment_index = range.length - 1;
    for (let i = 0; i < range.length; i++) {
      if (value < range[i]) {
        comment_index = i - 1;
      }
    }
    this.setState({
      heart_rate: {
        range: range,
        comment: (comment_index === -1)? 'ผิดปกติ' : suggestion.HEART_RATE.comment[comment_index],
        index: (comment_index < 0)? 0 : (range.length - comment_index - 1),
        color: ['#E0694C', '#E5A455', '#F0EE7C', '#78C5D4' ,'#71B562', '#BC73A9', '#6758A0']
      }
    });
  }

  initialData = (age, gender) => {
    AsyncStorage.multiGet(sensor.SENSOR_NAME).then((values) => {
      let oxygen = JSON.parse(values[0][1]).lastUpdate.value;
      let heart_rate = JSON.parse(values[1][1]).lastUpdate.value;
      let temp = JSON.parse(values[2][1]).lastUpdate.value;
      this.getOxygenRange(oxygen);
      this.getHeartRateRange(age, gender, heart_rate);
      this.setState({disabled: false});
    });
  }

  componentDidMount () {
    AsyncStorage.getItem('user_info').then((data) => {
      let age = Date.now() - new Date(JSON.parse(data).dob).getTime();
      age = new Date(age).getUTCFullYear() - 1970;
      let gender = (JSON.parse(data).gender === 'm')? 'male' : 'female';
      let w = JSON.parse(data).weight;
      let h = JSON.parse(data).height;
      this.setState({bmi: (w / Math.pow(h / 100), 2).toFixed(2)});
      this.initialData(age, gender);
    });
  }

  render () {
    if (this.state.disabled) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator/>
        </View>
      );
    } else {
      return (
        <View style={{padding: 16}}>
          <SGIndicator
            name='Oxygen'
            range={this.state.oxygen.range}
            index={this.state.oxygen.index}
            comment={this.state.oxygen.comment}
            color={this.state.oxygen.color}
          />
          <SGIndicator
            name='Heart rate'
            range={this.state.heart_rate.range}
            index={this.state.heart_rate.index}
            comment={this.state.heart_rate.comment}
            color={this.state.heart_rate.color}
          />
        </View>
      );
    }
  }
}