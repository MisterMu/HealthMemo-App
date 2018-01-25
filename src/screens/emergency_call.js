import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  AsyncStorage,
  Picker
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { phonecall } from 'react-native-communications';

import color from '../../config/color';
import { getIcon } from '../../assets/icons/index';
import metrics from '../../config/metrics';

export class EmergencyCallScreen extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      index: 0,
      list: []
    };
    ec_list = [];
  }

  call = () => {
    phonecall(ec_list[this.state.index].ec_num, false);
  }

  handlePickerChange = (i) => {
    this.setState({index: i});
  }

  componentDidMount () {
    AsyncStorage.getItem('ec').then((data) => {
      if (data) {
        ec_list = JSON.parse(data);
      } else {
        ec_list = [{ec_name: 'Emergency Contact', ec_num: '1669'}]
      }
      this.setState({list: ec_list});
    }).catch(err => console.error(err));
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
          label='Emergency contact number'
          value={ec_list[this.state.index]? ec_list[this.state.index].ec_num : ''}
          disabled={true}
          tintColor={color.APP_THEME}
          containerStyle={styles.container}
          style={{textAlign: 'center'}}
        />
        <TouchableOpacity onPress={this.call} style={styles.btn}>
          <View style={styles.call_btn}>
            <Image source={getIcon('call_w')} style={styles.call_icon}/>
          </View>
        </TouchableOpacity>
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
  },
  btn: {
    width: 80,
    height: 80,
    marginTop: 60,
    alignSelf: 'center',
  },
  call_btn: {
    backgroundColor: 'green',
    borderRadius: 40,
    width: 80,
    height: 80,
    alignItems: 'center'
  },
  call_icon: {
    width: 36,
    height: 36,
    marginTop: 22
  }
});
