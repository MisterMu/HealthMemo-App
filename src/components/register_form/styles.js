import { StyleSheet } from 'react-native';
import metrics from '../../../config/metrics';

const styles = StyleSheet.create({
  host: {
    paddingLeft: metrics.DEVICE_WIDTH * 0.1,
    paddingRight: metrics.DEVICE_WIDTH * 0.1,
    // flex: 1,
    // justifyContent: 'space-around'
  },
  form_container: {
    marginTop: metrics.DEVICE_HEIGHT * 0.15,
    height: metrics.DEVICE_HEIGHT * 0.5,
    // backgroundColor: 'lightblue'
  },
  img_container: {
    width: metrics.DEVICE_WIDTH * 0.3,
    height: metrics.DEVICE_WIDTH * 0.3,
    borderRadius: metrics.DEVICE_WIDTH * 0.15,
    alignSelf: 'center',
    backgroundColor: 'red'
  },
  container: {
    width: metrics.DEVICE_WIDTH * 0.6,
    alignSelf: 'center'
  },
  btn: {
    width: metrics.DEVICE_WIDTH * 0.6,
    alignSelf: 'center',
    marginTop: 30
  }
});

export default styles;
