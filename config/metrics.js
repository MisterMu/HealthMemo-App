import { Dimensions, StatusBar } from 'react-native';

const { height, width } = Dimensions.get('window');

const ANDROID_STATUSBAR = StatusBar.currentHeight;
const DEVICE_HEIGHT = height - ANDROID_STATUSBAR;
const DEVICE_WIDTH = width;
const FONT_SIZE = DEVICE_WIDTH * 0.05;

export default {
  ANDROID_STATUSBAR,
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  FONT_SIZE
}