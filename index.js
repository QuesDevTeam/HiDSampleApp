import { AppRegistry } from 'react-native';

import App from './src/App';
import { name as appName } from './app.json';

import './src/setup/setupNotification';
import './src/setup/setupLocalization';
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => App);
