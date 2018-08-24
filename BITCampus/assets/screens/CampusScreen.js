import React, { Component } from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    FlatList
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import { Button, Container, Header, Content, Left } from 'native-base'

import { Router, Scene } from 'react-native-router-flux';

import Category from './CategoryScreen';
import List from './ListScreen';
import Wizard from './WizardScreen';
class Campus extends Component {

      render() {
            return (
            <Router>
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
                titleStyle ={{color:'#004898'}}
                navigationBarStyle={{ backgroundColor: 'transparent'}} 
                />
                <Scene
                key="Wizard"
                component={Wizard}
                title=""
                transitionConfig
                tintColor='#004898'
                titleStyle ={{color:'#004898'}}
                navigationBarStyle={{ backgroundColor: 'transparent'}} 
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

      return { transform: [ { translateX } ] }
    },
  }
}