import { StyleSheet } from 'react-native';

import metrics from '../../../config/metrics';
import color from '../../../config/color';

const IMG_SIZE_RATIO = 0.3;
const IMG_BORDER_RADIUS = IMG_SIZE_RATIO / 2;
const COMP_WIDTH_RATIO = 0.5;

const styles = StyleSheet.create({
  host: {
    paddingLeft: metrics.DEVICE_WIDTH * 0.1,
    paddingRight: metrics.DEVICE_WIDTH * 0.1
  },
  form_container: {
    marginTop: metrics.DEVICE_HEIGHT * 0.1,
    height: metrics.DEVICE_HEIGHT * 0.55
  },
  form_title: {
    fontSize: metrics.FONT_SIZE * 2,
    color: color.APP_THEME,
    marginBottom: 15
  },
  img_container: {
    width: metrics.DEVICE_WIDTH * IMG_SIZE_RATIO,
    height: metrics.DEVICE_WIDTH * IMG_SIZE_RATIO,
    borderRadius: metrics.DEVICE_WIDTH * IMG_BORDER_RADIUS,
    alignSelf: 'center',
    marginBottom: 15,
    backgroundColor: 'red',
    overflow: 'hidden'
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
  },
  label: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.38)',
    marginBottom: 5
  }
});

export default styles;
