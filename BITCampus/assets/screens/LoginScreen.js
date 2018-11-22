import React, { Component } from "react";
import { StyleSheet, View, AsyncStorage, Animated, Dimensions, KeyboardAvoidingView, Keyboard, Platform, ActivityIndicator } from "react-native";
import { Text, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "../auth";
const window = Dimensions.get('window');
export const IMAGE_HEIGHT = window.width / 3;
export const IMAGE_HEIGHT_SMALL = window.width / 5;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      uname: '', password: ''
    }
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
  }

  componentWillMount() {
    if (Platform.OS == 'ios') {
      this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
      this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    } else {
      this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
      this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT_SMALL,
    }).start();
  };

  keyboardWillHide = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT,
    }).start();
  };
  keyboardDidShow = (event) => {
    Animated.timing(this.imageHeight, {
      toValue: IMAGE_HEIGHT_SMALL,
    }).start();
  };

  keyboardDidHide = (event) => {
    Animated.timing(this.imageHeight, {
      toValue: IMAGE_HEIGHT,
    }).start();
  };

  checkLogin = () => {

    if (this.state.uname != '' && this.state.password != '') {
      this.setState({
        isLoading: true,
      });
      return fetch(global.url + '/api/applogin?uname=' + this.state.uname + '&password=' + this.state.password)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson['status'] == 1) {
            AsyncStorage.setItem('user', JSON.stringify(responseJson['data'])).then(() => { onSignIn().then(() => this.props.navigation.navigate("SignedIn")); })
          }
          else {
            if (responseJson['status'] == 2) {
              alert('Activate your account by cliking the link send to your email')
            }
            if (responseJson['status'] == 0) {
              alert(responseJson['data'])
            }
            this.setState({
              isLoading: false,
            });
          }

        })
        .catch((error) => {
          alert(error)
        });
    }
    else {
      alert('Enter User Name and password')
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#004898" />
        </View>
      )
    }
    else {
      return (
        <KeyboardAvoidingView style={styles.container}>
          <Text style={styles.title}>Reconnaissance</Text>
          <Animated.Image source={require('../Images/logotransperant.png')} style={[styles.logo, { height: this.imageHeight }]} />
          <View>
            <FormInput containerStyle={{ borderBottomWidth: 1 }} placeholder="Email" onChangeText={(uname) => this.setState({ uname })} />
            <FormInput containerStyle={{ borderBottomWidth: 1, marginTop: 15 }} secureTextEntry placeholder="Password" onChangeText={(password) => this.setState({ password })} />
            <View style={{ flexDirection: 'row', padding: 10, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                buttonStyle={{ marginTop: 20, padding: 15 }}
                backgroundColor="#004898"
                title="SIGN IN"
                onPress={this.checkLogin}
              />
              <Button
                buttonStyle={{ marginTop: 20, padding: 15 }}
                backgroundColor="#004898"
                title="SIGN UP"
                onPress={() =>
                  navigate('SignUp')
                }
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      );
    }
  }
}
export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    resizeMode: 'contain',
  },
  title: {
    color: '#004898',
    fontSize: 26,
    fontWeight: 'bold'
  }

});