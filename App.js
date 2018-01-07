import React from 'react';
import { AsyncStorage, ActivityIndicator, View } from 'react-native';
import { RegisterScreen, ContentScreen } from './src/screens';

export default class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      render: ''
    };
  }

  componentDidMount () {
    AsyncStorage.getItem('user_info').then((data) => {
      if (data == null) {
        this.setState({render: 'register'});
      } else {
        this.setState({render: 'content'});
      }
    }).catch(err => console.error(err));
  }

  render () {
    if (this.state.render === 'register') {
      return <RegisterScreen done={() => this.setState({render: 'content'})}/>
    } else if (this.state.render === 'content') {
      return <ContentScreen/>;
    } else {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator/>
        </View>
      );
    }
  }
}
