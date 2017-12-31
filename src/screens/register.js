import React from 'react';
import { Modal, View, Text } from 'react-native';
import {
  RegisterForm1,
  RegisterForm2,
  RegisterForm3,
  RegisterForm4
} from '../components/register_form';

export class RegisterScreen extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      stage: 1
    }
  }

  nextStage = () => {
    if (this.state.stage < 5) {
      this.setState({stage: this.state.stage + 1});
    } else {
      // TODO: redirect to dashboard
    }
  }

  backStage = () => {
    if (this.state.stage > 1) {
      this.setState({stage: this.state.stage - 1});
    } else {
      // TODO: redirect to signin
    }
  }

  render () {
    return (
      <View>
        <Modal
          visible={this.state.stage === 1}
          transparent={true}
          onRequestClose={this.backStage}
          animationType='slide'
        >
          <RegisterForm1 next={this.nextStage}/>
        </Modal>
        <Modal
          visible={this.state.stage === 2}
          transparent={true}
          onRequestClose={this.backStage}
          animationType='slide'
        >
          <RegisterForm2 next={this.nextStage}/>
        </Modal>
        <Modal
          visible={this.state.stage === 3}
          transparent={true}
          onRequestClose={this.backStage}
          animationType='slide'
        >
          <RegisterForm3 next={this.nextStage}/>
        </Modal>
        <Modal
          visible={this.state.stage === 4}
          transparent={true}
          onRequestClose={this.backStage}
          animationType='slide'
        >
          <RegisterForm4 next={this.nextStage}/>
        </Modal>
      </View>
    );
  }
}