import React from 'react';
import { Modal, View, Text } from 'react-native';
import { RegisterForm1 } from '../components/register_form/form_1';
import { RegisterForm2 } from '../components/register_form/form_2';

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
          visible={this.state.stage == 1}
          transparent={true}
          onRequestClose={this.backStage}
          animationType='slide'
        >
          <RegisterForm1 next={this.nextStage}/>
        </Modal>
        <Modal
          visible={this.state.stage == 2}
          transparent={true}
          onRequestClose={this.backStage}
          animationType='slide'
        >
          <RegisterForm2 next={this.nextStage}/>
        </Modal>
      </View>
    );
  }
}