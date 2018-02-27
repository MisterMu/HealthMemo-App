import React from 'react';
import { Modal, View, Text, BackHandler, AsyncStorage } from 'react-native';
import {
  RegisterForm1,
  RegisterForm2,
  RegisterForm3,
  RegisterForm4,
  RegisterForm5
} from '../components/register_form';

var formData = {};

export class RegisterScreen extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      stage: 1,
      data: formData
    }
  }

  nextStage = (data) => {
    if (this.state.stage < 5) {
      formData = {...formData, ...data};
      this.setState({
        stage: this.state.stage + 1,
        data: formData
      });
    } else {
      AsyncStorage.setItem('user_info', JSON.stringify(this.state.data)).then(() => {
        this.props.done();
      }).catch(err => console.error(err));
    }
  }

  backStage = () => {
    if (this.state.stage > 1) {
      this.setState({stage: this.state.stage - 1});
    } else {
      BackHandler.exitApp();
    }
  }

  render () {
    let data = this.state.data;
    return (
      <View>
        <Modal
          visible={this.state.stage === 1}
          transparent={true}
          onRequestClose={this.backStage}
          animationType='slide'
        >
          <RegisterForm1
            next={this.nextStage}
            f_name={data.f_name}
            l_name={data.l_name}
            img_src={data.img_src}
          />
        </Modal>
        <Modal
          visible={this.state.stage === 2}
          transparent={true}
          onRequestClose={this.backStage}
          animationType='slide'
        >
          <RegisterForm2
            next={this.nextStage}
            dob={data.dob}
            gender={data.gender}
            region={data.region}
          />
        </Modal>
        <Modal
          visible={this.state.stage === 3}
          transparent={true}
          onRequestClose={this.backStage}
          animationType='slide'
        >
          <RegisterForm3
            next={this.nextStage}
            weight={data.weight}
            height={data.height}
            blood_type={data.blood_type}
          />
        </Modal>
        <Modal
          visible={this.state.stage === 4}
          transparent={true}
          onRequestClose={this.backStage}
          animationType='slide'
        >
          <RegisterForm4
            next={this.nextStage}
            id={data.id}
            rtt={data.rtt}
            other={data.other}
          />
        </Modal>
        <Modal
          visible={this.state.stage === 5}
          transparent={true}
          onRequestClose={this.backStage}
          animationType='slide'
        >
          <RegisterForm5
            done={this.nextStage}
            ec_name={data.ec_name}
            ec_num={data.ec_num}
            ec_mail={data.ec_mail}
          />
        </Modal>
      </View>
    );
  }
}