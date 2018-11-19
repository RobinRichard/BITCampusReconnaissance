import React, { Component } from "react";
import { Router, Scene,Actions } from 'react-native-router-flux';
import {BackHandler, View, Dimensions, Animated, TouchableOpacity, Text} from 'react-native';
import Category from './CategoryScreen';
import List from './ListScreen';
import Wizard from './WizardScreen';
import Reconnaissance from './ReconnaissanceScreen';

class Campus extends Component {

  
  onBackPress = () => {
    if (Actions.state.index === 0) {
      BackHandler.exitApp();
      // this.props.navigation.navigate("Home")
    }
    Actions.pop()
    return true 
}

  render() {
    return (
      <Router backAndroidHandler={this.onBackPress}>
        <Scene key="root">
          <Scene key="Category"
            component={Category}
            title="Reconnaissance"
            initial
            transitionConfig
            hideNavBar={true}
          />
          <Scene
            key="List"
            component={List}
            title="Questions List"
            transitionConfig
            tintColor='#004898'
            titleStyle={{ color: '#004898' }}
            navigationBarStyle={{ backgroundColor: 'white' }}
          />
          <Scene
            key="Wizard"
            component={Wizard}
            title="Reconnaissance"
            transitionConfig
            tintColor='#004898'
            titleStyle={{ color: '#004898' }}
            navigationBarStyle={{ backgroundColor: 'white' }}
          />
          <Scene
            key="Reconnaissance"
            component={Reconnaissance}
            title="Reconnaissance"
            transitionConfig
            tintColor='#004898'
            titleStyle={{ color: '#004898' }}
            navigationBarStyle={{ backgroundColor: 'white' }}
          />
        </Scene>
      </Router>
    );
  }
}
export default Campus;

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps

      const thisSceneIndex = scene.index
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      })

      return { transform: [{ translateX }] }
    },
  }
}