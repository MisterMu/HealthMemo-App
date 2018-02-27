import React from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
  Picker,
  Button
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Communications from 'react-native-communications';

import color from '../../config/color';
import metrics from '../../config/metrics';
import sensor from '../../assets/values/sensor';
import { getFullFormat, getDateFormat } from '../../tools/date';

export class SendMailScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      index: 0,
      list: [],
      disabled: false
    };
    ec_list = [];
  }

  mail = () => {
    this.setState({disabled: true});
    AsyncStorage.multiGet(['user_info', ...sensor.SENSOR_NAME, 'hospital', 'insurance']).then((stores) => {
      let user_info = JSON.parse(stores[0][1]);
      let value = sensor.SENSOR_NAME.map((name, i) => {
        return JSON.parse(stores[i + 1][1]).lastUpdate;
      });
      let hospital = JSON.parse(stores[4][1]);
      let insurance = JSON.parse(stores[5][1]);
      let body = [];
      body.push('================= Info =================');
      body.push('');
      body.push('Name:       ' + user_info.f_name + ' ' + user_info.l_name);
      body.push('Gender:     ' + ((user_info.gender === 'm')? 'male' : 'female'));
      body.push('DoB:        ' + getFullFormat(new Date(user_info.dob)));
      body.push('Blood type: ' + user_info.blood_type);
      body.push('');
      body.push('============= Sensor value =============');
      body.push('');
      sensor.SENSOR_NAME.map((name, i) => {
        body.push(name);
        body.push('  value:       ' + value[i].value + ' ' + sensor.SENSOR_UNIT[i]);
        body.push('  last update: ' + getDateFormat(new Date(value[i].date)));
        body.push('');
      });
      body.push('=============== Hospital ===============');
      body.push('');
      hospital.map((item, i) => {
        body.push((i + 1) + '. ' + item.name + '  (ID: ' + item.num + ')');
      });
      body.push('');
      body.push('=============== Insurance ==============');
      body.push('');
      insurance.map((item, i) => {
        body.push((i + 1) + '. ' + item.i_name + '  (ID: ' + item.i_num + ')');
      });
      body.push('');
      body.push('========================================');
      let to = ec_list[this.state.index].ec_mail || '';
      Communications.email([(to === '-')? '' : to], null, null, 'Health memo report', body.join('\n'));
      this.setState({disabled: false});
    });
  }

  handlePickerChange = (i) => {
    this.setState({index: i});
  }

  componentDidMount () {
    AsyncStorage.getItem('ec').then((data) => {
      ec_list = JSON.parse(data);
      this.setState({list: ec_list});
    });
  }

  render () {
    let items = this.state.list.map((item, i) => {
      return <Picker.Item label={item.ec_name} value={i} key={i}/>
    });
    return (
      <View style={styles.host}>
        <View style={[styles.container, styles.picker]}>
          <Picker
            selectedValue={this.state.index}
            onValueChange={this.handlePickerChange}
            mode='dropdown'
          >
            {items}
          </Picker>
        </View>
        <TextField
          label='Emergency contact mail'
          value={ec_list[this.state.index]? ec_list[this.state.index].ec_mail : ''}
          disabled={true}
          tintColor={color.APP_THEME}
          containerStyle={styles.container}
          style={{textAlign: 'center'}}
        />
        <View style={styles.container}>
          <Button onPress={this.mail} title='Send Mail' disabled={this.state.disabled}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    justifyContent: 'center'
  },
  picker: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.38)'
  },
  container: {
    marginBottom: 60,
    alignSelf: 'center',
    width: metrics.DEVICE_WIDTH * 0.5
  }
});