import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  AsyncStorage,
  Picker,
  Keyboard,
  DatePickerAndroid,
  Button,
  TouchableOpacity,
  Image
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import ImagePicker from 'react-native-image-crop-picker';

import * as DateTool from '../../tools/date';
import color from '../../config/color';
import metrics from '../../config/metrics';

export class ProfileScreen extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      f_name: '',
      l_name: '',
      dob: '',
      gender: '',
      region: '',
      weight: '',
      height: '',
      blood_type: '',
      img_src: null
    };
  }

  uploadImg = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true
    }).then(image => {
      this.setState({img_src: image.path});
    });
  }

  handleTextChange = (text, state) => {
    if (this.state[state] !== text) {
      this.setState({[state]: text});
    }
  }

  handleDateInoputFocus = () => {
    Keyboard.dismiss();
    let option = {
      date: (this.state.dob instanceof Date)? this.state.dob : new Date(),
      macDate: new Date()
    };
    DatePickerAndroid.open(option).then((action) => {
      if (action.action === 'dateSetAction') {
        this.setState({dob: new Date(action.year, action.month, action.day)});
      }
    }).catch(err => console.error(err));
  }

  saveProfile = () => {
    if (this.chkEmptyField(this.state)) {
      this.setState({empty: 'Please complete all of your info.'});
    } else {
      let tmp = {
        f_name: this.state.f_name,
        l_name: this.state.l_name,
        dob: this.state.dob,
        gender: this.state.gender,
        region: this.state.region,
        weight: this.state.weight,
        height: this.state.height,
        blood_type: this.state.blood_type,
        img_src: this.state.img_src
      }
      AsyncStorage.setItem('user_info', JSON.stringify(tmp)).then(() => {
        this.props.nav('Dashboard');
      }).catch(err => console.error(err));
    }
  }

  chkEmptyField = (data) => {
    let chk = false;
    Object.keys(data).map((key) => {
      if (data[key] === '') {
        chk = true;
      }
    });
    return chk;
  }

  componentDidMount () {
    AsyncStorage.getItem('user_info').then((data) => {
      if (data) {
        let user = JSON.parse(data);
        this.setState({
          f_name: user.f_name,
          l_name: user.l_name,
          dob: new Date(user.dob),
          gender: user.gender,
          region: user.region,
          weight: user.weight,
          height: user.height,
          blood_type: user.blood_type,
          img_src: user.img_src
        })
      }
    }).catch(err => console.error(err));
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.host}>
          <TouchableOpacity style={styles.img} onPress={this.uploadImg}>
            <Image
              source={{ uri: this.state.img_src}}
              style={{height: '100%', width: '100%', position: 'relative'}}
              resizeMode='cover'
            />
          </TouchableOpacity>
          <TextField
            label='First Name'
            value={this.state.f_name}
            tintColor={color.APP_THEME}
            onChangeText={(text) => this.handleTextChange(text, 'f_name')}
            containerStyle={styles.container}
          />
          <TextField
            label='Last Name'
            value={this.state.l_name}
            tintColor={color.APP_THEME}
            onChangeText={(text) => this.handleTextChange(text, 'l_name')}
            containerStyle={styles.container}
          />
          <TextField
            label='Date of Birth'
            value={DateTool.getFullFormat(this.state.dob)}
            tintColor={color.APP_THEME}
            containerStyle={styles.container}
            onFocus={this.handleDateInoputFocus}
          />
          <View style={[styles.picker, styles.container]}>
            <Picker
              selectedValue={this.state.gender}
              onValueChange={(value) => this.handleTextChange(value, 'gender')}
              mode='dropdown'
            >
              <Picker.Item label='MALE' value='m'/>
              <Picker.Item label='FEMALE' value='f'/>
            </Picker>
          </View>
          <TextField
            label='Region'
            value={this.state.region}
            onChangeText={(text) => this.handleTextChange(text, 'region')}
            tintColor={color.APP_THEME}
            containerStyle={styles.container}
          />
          <TextField
            label='Weight'
            value={this.state.weight}
            onChangeText={(text) => this.handleTextChange(text, 'weight')}
            tintColor={color.APP_THEME}
            containerStyle={styles.container}
            style={{textAlign: 'center'}}
            keyboardType='numeric'
            suffix='kg'
          />
          <TextField
            label='Height'
            value={this.state.height}
            onChangeText={(text) => this.handleTextChange(text, 'height')}
            tintColor={color.APP_THEME}
            containerStyle={styles.container}
            style={{textAlign: 'center'}}
            keyboardType='numeric'
            suffix='cm'
          />
          <View style={[styles.picker, styles.container]}>
            <Picker
              selectedValue={this.state.blood_type}
              onValueChange={(value) => this.handleTextChange(value, 'blood_type')}
              mode='dropdown'
            >
              <Picker.Item label='A' value='A'/>
              <Picker.Item label='B' value='B'/>
              <Picker.Item label='AB' value='AB'/>
              <Picker.Item label='O' value='O'/>
            </Picker>
          </View>
          <View style={[styles.btn, styles.container]}>
            <Button title='Save' onPress={this.saveProfile}/>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    paddingLeft: metrics.DEVICE_WIDTH * 0.1,
    paddingRight: metrics.DEVICE_WIDTH * 0.1,
    paddingTop: metrics.DEVICE_HEIGHT * 0.1,
    paddingBottom: metrics.DEVICE_HEIGHT * 0.1
  },
  img: {
    backgroundColor: 'red',
    marginBottom: 15,
    alignSelf: 'center',
    width: metrics.DEVICE_WIDTH * 0.3,
    height: metrics.DEVICE_WIDTH * 0.3,
    borderRadius: metrics.DEVICE_WIDTH * 0.15,
    overflow: 'hidden'
  },
  container: {
    width: metrics.DEVICE_WIDTH * 0.5,
    alignSelf: 'center',
    marginBottom: 25
  },
  picker: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.38)'
  },
  btn: {
    paddingTop: 30
  }
});