import { StyleSheet } from 'react-native';
import color from '../../../config/color';
import metrics from '../../../config/metrics';

const styles = StyleSheet.create({
  host: {

  },
  app_bar: {
    width: '100%',
    height: 48,
    backgroundColor: color.APP_THEME,
    elevation: 2,
    position: 'relative'
  },
  back_btn: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 12,
    left: 16
  },
  title: {
    fontSize: metrics.FONT_SIZE * 1.4,
    color: 'white',
    position: 'absolute',
    top: 0,
    left: 72,
    height: 48,
    textAlignVertical: 'center'
  },
  form_container: {
    padding: 16,

  },
  container: {
    width: metrics.DEVICE_WIDTH * 0.5,
    alignSelf: 'center',
    marginBottom: 25
  },
  btn_container: {
    width: metrics.DEVICE_WIDTH * 0.5,
    alignSelf: 'center'
  }
});

export default styles;