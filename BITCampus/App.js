import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

import App from './assets/index';
export default class BITCampus extends Component {
  render() {
    return (
     <App />
    );
  }
}

AppRegistry.registerComponent('BITCampus', () => BITCampus);