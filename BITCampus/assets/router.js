import React from "react";
import { Platform, StatusBar } from "react-native";
import {
  StackNavigator,
  TabNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { Icon } from 'native-base';

import Home from "./screens/HomeScreen";
import Settings from './screens/SettingsScreen'
import Campus from './screens/CampusScreen'
import Gallery from './screens/GalleryScreen'
import Wizard from './screens/WizardScreen'
import Login from './screens/LoginScreen'


const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = StackNavigator({
  SignLoginIn: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  }
});

export const SignedIn = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon type="FontAwesome" style={{ color: tintColor,fontSize:24 }} name="home" />
      )
    }
  },
  Campus: {
    screen: Campus,
    navigationOptions: {
      tabBarLabel: 'Campus',
      tabBarIcon: ({ tintColor }) => (
        <Icon type="FontAwesome" style={{ color: tintColor,fontSize:22 }} name="university" />
      )
    }
  },
  Gallery: {
    screen: Gallery,
    navigationOptions: {
      tabBarLabel: 'Gallery',
      tabBarIcon: ({ tintColor }) => (
        <Icon type="FontAwesome" style={{ color: tintColor,fontSize:22 }} name="photo" />
      )
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'User',
      tabBarIcon: ({ tintColor }) => (
        <Icon type="FontAwesome" style={{ color: tintColor,fontSize:24 }} name="user" />
      )
    }
  }
}, {
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#00121f',
      labelStyle: {
        fontSize: 12,
        fontWeight: 'bold'
      },
      style: {
        backgroundColor: '#004898',
        borderTopWidth: 1,
        paddingTop: 5,
        height:50,
        borderBottomColor: '#dddddd',
        shadowOffset: { width: 5, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.5
      }
    }
  });




export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};