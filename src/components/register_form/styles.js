import { StyleSheet } from 'react-native';
import metrics from '../../../config/metrics';

const IMG_SIZE_RATIO = 0.3;
const IMG_BORDER_RADIUS = IMG_SIZE_RATIO / 2;
const COMP_WIDTH_RATIO = 0.5;

const styles = StyleSheet.create({
  host: {
    paddingLeft: metrics.DEVICE_WIDTH * 0.1,
    paddingRight: metrics.DEVICE_WIDTH * 0.1
  },
  form_container: {
    marginTop: metrics.DEVICE_HEIGHT * 0.15,
    height: metrics.DEVICE_HEIGHT * 0.5
  },
  img_container: {
    width: metrics.DEVICE_WIDTH * IMG_SIZE_RATIO,
    height: metrics.DEVICE_WIDTH * IMG_SIZE_RATIO,
    borderRadius: metrics.DEVICE_WIDTH * IMG_BORDER_RADIUS,
    alignSelf: 'center',
    backgroundColor: 'red'
  },
  container: {
    width: metrics.DEVICE_WIDTH * COMP_WIDTH_RATIO,
    alignSelf: 'center',
    marginBottom: 25
  },
  btn: {
    width: metrics.DEVICE_WIDTH * COMP_WIDTH_RATIO,
    alignSelf: 'center',
    marginTop: 30
  },
  picker: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.38)',
    paddingTop: 20
  },
  number: {
    textAlign: 'center'
  },
  rtt_container: {
    position: 'relative',
    width: metrics.DEVICE_WIDTH * COMP_WIDTH_RATIO,
    alignSelf: 'center',
    marginBottom: 10
  },
  rtt_label: {
    position: 'absolute',
    top: 5,
    left: 35
  }
});

export default styles;
