import React from 'react';
import {
  AsyncStorage,
  ScrollView,
  Modal,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  View
} from 'react-native';

import { HospitalForm } from '../components/list_form/h_form';
import { ListItem } from '../components/list_item';
import metrics from '../../config/metrics';
import { getIcon } from '../../assets/icons';
import { InsuranceForm } from '../components/list_form/i_form';

export class HospitalInfoScreen extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      h_form: -1,
      h_list: [],
      i_form: -1,
      i_list: []
    };
  }

  hListPress = (index) => {
    this.setState({h_form: index});
  }

  hAddList = () => {
    let tmp = this.state.h_list;
    tmp.push({name: '', num: '', addr: '', tel: ''});
    this.setState({h_list: tmp, h_form: tmp.length - 1});
  }

  hDone = (data) => {
    let tmp = this.state.h_list;
    tmp[this.state.h_form] = data;
    this.setState({h_form: -1, h_list: tmp});
  }

  hFormClose = () => {
    let tmp = this.state.h_list;
    if (tmp[this.state.h_form].name == '') {
      tmp.pop();
    }
    this.setState({h_form: -1, h_list: tmp});
  }

  hGetForm = (index) => {
    return (
      <HospitalForm
        name={this.state.h_list[index]? this.state.h_list[index].name : null}
        num={this.state.h_list[index]? this.state.h_list[index].num : null}
        addr={this.state.h_list[index]? this.state.h_list[index].addr : null}
        tel={this.state.h_list[index]? this.state.h_list[index].tel : null}
        done={this.hDone}
        back={this.hFormClose}
      />
    );
  }

  iListPress = (index) => {
    this.setState({i_form: index});
  }

  iAddList = () => {
    let tmp = this.state.i_list;
    tmp.push({company: '', i_name: '', i_num: '', a_name: '', a_tel: ''});
    this.setState({i_list: tmp, i_form: tmp.length - 1});
  }

  iDone = (data) => {
    let tmp = this.state.i_list;
    tmp[this.state.i_form] = data;
    this.setState({i_form: -1, i_list: tmp});
  }

  iFormClose = () => {
    let tmp = this.state.i_list;
    if (tmp[this.state.i_form].name == '') {
      tmp.pop();
    }
    this.setState({i_form: -1, i_list: tmp});
  }

  iGetForm = (index) => {
    return (
      <InsuranceForm
        company={this.state.i_list[index]? this.state.i_list[index].company : null}
        name={this.state.i_list[index]? this.state.i_list[index].i_name :null}
        num={this.state.i_list[index]? this.state.i_list[index].i_num : null}
        a_name={this.state.i_list[index]? this.state.i_list[index].a_name : null}
        a_tel={this.state.i_list[index]? this.state.i_list[index].a_tel : null}
        done={this.iDone}
        back={this.iFormClose}
      />
    );
  }

  componentWillMount () {
    AsyncStorage.multiGet(['hospital', 'insurance']).then((data) => {
      let h_list = data[0][1]? JSON.parse(data[0][1]) : [];
      let i_list = data[1][1]? JSON.parse(data[1][1]) : [];
      this.setState({ h_list: h_list, i_list: i_list});
    }).catch(err => console.error(err));
  }

  render () {
    let h_list_tmp = this.state.h_list.map((item, index) => {
      return {title: item.name, key: index}
    });
    let i_list_tmp = this.state.i_list.map((item, index) => {
      return {title: item.i_name, key: index}
    });
    return (
      <ScrollView style={styles.host}>
        {/* hospital form */}
        <Modal
          onRequestClose={this.hFormClose}
          visible={this.state.h_form >= 0}
          transparent={false}
        >
          {this.hGetForm(this.state.h_form)}
        </Modal>
        {/* insurance form */}
        <Modal
          onRequestClose={this.iFormClose}
          visible={this.state.i_form >= 0}
          transparent={false}
        >
          {this.iGetForm(this.state.i_form)}
        </Modal>
        {/* hospital list */}
        <View>
          <Text style={styles.title}>Hospital</Text>
          <FlatList
            renderItem={({item}) => <ListItem title={item.title} action={() => this.hListPress(item.key)}/>}
            data={h_list_tmp}
          />
          <TouchableOpacity style={styles.add} onPress={this.hAddList}>
            <Image style={styles.add_icon} source={getIcon('add_b')}/>
            <Text style={styles.add_label}>Add Hospital</Text>
          </TouchableOpacity>
        </View>
        {/* insurance list */}
        <View>
          <Text style={styles.title}>Insurance</Text>
          <FlatList
            renderItem={({item}) => <ListItem title={item.title} action={() => this.iListPress(item.key)}/>}
            data={i_list_tmp}
          />
          <TouchableOpacity style={styles.add} onPress={this.iAddList}>
            <Image style={styles.add_icon} source={getIcon('add_b')}/>
            <Text style={styles.add_label}>Add Insurance</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  componentWillUnmount () {
    AsyncStorage.multiSet([['hospital', JSON.stringify(this.state.h_list)], ['insurance', JSON.stringify(this.state.i_list)]]);
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
