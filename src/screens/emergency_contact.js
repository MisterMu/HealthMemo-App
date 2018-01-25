import React from 'react';
import {
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Modal,
  AsyncStorage,
  FlatList,
  Text,
  SectionList
} from 'react-native';
import { EmergencyForm } from '../components/list_form/ec_form';
import { ListItem } from '../components/list_item';
import metrics from '../../config/metrics';
import { getIcon } from '../../assets/icons/index';

export class EmergencyContactScreen extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      form: -1,
      list: []
    };
    var ec_list = [];
  }

  _done = (data) => {
    let tmp = this.state.list;
    tmp[this.state.form] = data;
    this.setState({form: -1, list: tmp});
  }

  handleModalClose = () => {
    let tmp = this.state.list;
    if (this.state.list[this.state.form].ec_name == '') {
      tmp.pop();
    }
    this.setState({form: -1, list: tmp});
  }

  getForm = (index) => {
    return (
      <EmergencyForm
        name={this.state.list[index]? this.state.list[index].ec_name : ''}
        phone={this.state.list[index]? this.state.list[index].ec_num : ''}
        mail={this.state.list[index]? this.state.list[index].ec_mail : ''}
        done={this._done}
        back={this.handleModalClose}
        disable={this.state.form == 0}
      />
    );
  }

  listPress = (index) => {
    this.setState({form: index});
  }

  addList = () => {
    let tmp = this.state.list;
    tmp.push({ec_name: '', ec_num: '', ec_mail: ''});
    this.setState({list: tmp, form: tmp.length - 1});
  }

  componentWillMount () {
    AsyncStorage.getItem('ec').then((data) => {
      if (data) {
        ec_list = JSON.parse(data);
        this.setState({list: ec_list});
      }
    });
  }

  render () {
    let list_tmp = this.state.list.map((item, index) => {
      return { title: item.ec_name, key: index }
    });
    return (
      <ScrollView style={styles.host}>
        <Modal
          onRequestClose={this.handleModalClose}
          visible={this.state.form >= 0}
          transparent={false}
          animationType='slide'
        >
          {this.getForm(this.state.form)}
        </Modal>
        <Text style={styles.title}>Contact List</Text>
        <FlatList
          renderItem={({item}) => <ListItem title={item.title} action={() => this.listPress(item.key)}/>}
          data={list_tmp}
        />
        <TouchableOpacity style={styles.add} onPress={this.addList}>
          <Image style={styles.add_icon} source={getIcon('add_b')}/>
          <Text style={styles.add_label}>Add Contact</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  componentWillUnmount () {
    AsyncStorage.setItem('ec', JSON.stringify(this.state.list));
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    padding: 16
  },
  title: {
    height: 48,
    fontSize: metrics.FONT_SIZE * 1.2,
    textAlignVertical: 'center'
  },
  add: {
    height: 48,
    position: 'relative'
  },
  add_icon: {
    position: 'absolute',
    top: 12,
    left: 16,
    width: 24,
    height: 24,
    tintColor: 'rgba(0, 0, 0, 0.38)'
  },
  add_label: {
    position: 'absolute',
    top: 0,
    left: 56,
    height: 48,
    textAlignVertical: 'center',
    fontSize: metrics.FONT_SIZE * 0.8,
    color: 'rgba(0, 0, 0, 0.38)'
  }
});
