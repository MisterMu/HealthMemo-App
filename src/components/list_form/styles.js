import { StyleSheet } from 'react-native';
import color from '../../../config/color';
import metrics from '../../../config/metrics';

const styles = StyleSheet.create({
  app_bar: {
    width: '100%',
    height: 56,
    backgroundColor: color.APP_THEME,
    elevation: 2,
    position: 'relative'
  },
  back_btn: {
    width: 48,
    height: 48,
    position: 'absolute',
    top: 4,
    left: 4
  },
  back_icon: {
    width: 24,
    height: 24,
    margin: 12
  },
  title: {
    fontSize: metrics.FONT_SIZE * 1.4,
    color: 'white',
    position: 'absolute',
    top: 0,
    left: 72,
    height: 56,
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