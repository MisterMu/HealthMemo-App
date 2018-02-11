import { Dimensions, StatusBar } from 'react-native';

const { height, width } = Dimensions.get('window');

const ANDROID_STATUSBAR = StatusBar.currentHeight;
const DEVICE_HEIGHT = height;
const DEVICE_WIDTH = width;
const FONT_SIZE = DEVICE_WIDTH * 0.05;

const APP_BAR_HEIGHT = 56;
const CONTAINER_HEIGHT = DEVICE_HEIGHT - APP_BAR_HEIGHT;
const SIDEBAR_WIDTH = (width <= 320)? (width - 56) : 320;

export default {
  ANDROID_STATUSBAR,
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  FONT_SIZE,
  APP_BAR_HEIGHT,
  SIDEBAR_WIDTH,
  CONTAINER_HEIGHT
}