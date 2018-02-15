import React from 'react';
import { View, Button, TouchableOpacity, Text, Image } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import ImagePicker from 'react-native-image-crop-picker';

import styles from './styles';
import color from '../../../config/color';
import error_messages from '../../../assets/values/error_messages';
import metrics from '../../../config/metrics';

export class RegisterForm1 extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      f_name: this.props.f_name || '',
      l_name: this.props.l_name || '',
      err_f_name: '',
      err_l_name: '',
      img_src: this.props.img_src || null
    };
  }

  uploadImg = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true
    }).then((img) => {
      console.log(img);
      this.setState({img_src: img.path});
    }).catch();
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
    if (this.state.f_name !== '' && this.state.l_name !== '') {
      let data = {
        f_name: this.state.f_name,
        l_name: this.state.l_name,
        img_src: this.state.img_src
      }
      this.props.next(data);
    } else {
      this.handleFnameChange(this.state.f_name);
      this.handleLnameChange(this.state.l_name);
    }
  }

  render () {
    return (
      <View style={styles.host}>
        <View style={styles.form_container}>
          <TouchableOpacity style={styles.img_container} onPress={this.uploadImg}>
          <Image
            source={{ uri: this.state.img_src}}
            style={{height: '100%', width: '100%', position: 'relative'}}
            resizeMode='cover'
          />
            {
              (this.state.img_src)?
                null :
                <Text
                  style={{
                    color: 'white',
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontSize: metrics.FONT_SIZE
                  }}
                >
                  Upload
                </Text>
            }
          </TouchableOpacity>
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
