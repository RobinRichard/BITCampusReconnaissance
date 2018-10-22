import React, { Component } from 'react';
import {  AppRegistry,YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

import App from './assets/index';
export default class BITCampus extends Component {
  constructor(){
    super();
    global.url = 'http://robinrichard.pythonanywhere.com';
  }
  render() {
    return (
     <App />
    );
  }
}

AppRegistry.registerComponent('BITCampus', () => BITCampus);