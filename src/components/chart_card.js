import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator
} from 'react-native';
import { BarChart, XAxis, YAxis } from 'react-native-svg-charts';
import metrics from '../../config/metrics';
import color from '../../config/color';
import { DAYS, MONTHS } from '../../tools/date';

export class ChartCard extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      tab_selected: 'd'
    };
  }

  tabSelect = (tab) => {
    this.setState({tab_selected: tab});
  }

  getLabelFormat = (value, index) => {
    if (this.state.tab_selected === 'd') {
      return index + 1;
    } else if (this.state.tab_selected === 'w') {
      return DAYS[index];
    } else if (this.state.tab_selected === 'm') {
      return index + 1;
    } else if (this.state.tab_selected === 'y') {
      return MONTHS[index];
    }
  }

  render () {
    let data = [];
    if (this.props.data) {
      if (this.state.tab_selected === 'd') {
        data = this.props.data.D;
      } else if (this.state.tab_selected === 'w') {
        data = this.props.data.W;
      } else if (this.state.tab_selected === 'm') {
        data = this.props.data.M;
      } else if (this.state.tab_selected === 'y') {
        data = this.props.data.Y;
      }
    }
    let barData = [{
      values: data,
      positive: {
        fill: this.props.color
      },
      negative: {
        fill: 'pink'
      }
    }];
    return (
      <View style={styles.host}>
        <View style={styles.nav_bar}>
          <TouchableOpacity style={styles.nav_btn} onPress={() => this.tabSelect('d')}>
            <Text style={styles.nav_title}>D</Text>
            {(this.state.tab_selected === 'd')? <View style={styles.highlight}/> : null}
          </TouchableOpacity>
          <TouchableOpacity style={styles.nav_btn} onPress={() => this.tabSelect('w')}>
            <Text style={styles.nav_title}>W</Text>
            {(this.state.tab_selected === 'w')? <View style={styles.highlight}/> : null}
          </TouchableOpacity>
          <TouchableOpacity style={styles.nav_btn} onPress={() => this.tabSelect('m')}>
            <Text style={styles.nav_title}>M</Text>
            {(this.state.tab_selected === 'm')? <View style={styles.highlight}/> : null}
          </TouchableOpacity>
          <TouchableOpacity style={styles.nav_btn} onPress={() => this.tabSelect('y')}>
            <Text style={styles.nav_title}>Y</Text>
            {(this.state.tab_selected === 'y')? <View style={styles.highlight}/> : null}
          </TouchableOpacity>
        </View>
        {
          (this.props.data)?
          <View style={styles.chart_container}>
            <BarChart
              style={{flex: 1}}
              data={barData}
              animate={false}
            />
            <XAxis
              style={ { paddingVertical: 16 } }
              values={ data }
              formatLabel={this.getLabelFormat}
              chartType={ XAxis.Type.BAR }
              labelStyle={ { color: 'grey' } }
            />
          </View> : <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator/></View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    elevation: 2
  },
  nav_bar: {
    width: '100%',
    height: '15%',
    flexDirection: 'row'
  },
  nav_btn: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative'
  },
  nav_title: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: metrics.FONT_SIZE,
    color: color.APP_THEME
  },
  highlight: {
    position: 'absolute',
    bottom: 0,
    height: '10%',
    width: '100%',
    backgroundColor: color.APP_THEME
  },
  chart_container: {
    marginTop: 16,
    width: '100%',
    height: '85%'
  }
});