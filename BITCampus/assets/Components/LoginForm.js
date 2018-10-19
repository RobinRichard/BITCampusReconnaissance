import React, { Component } from "react";
import { View, AsyncStorage } from "react-native";
import { Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "../auth";

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = { uname: '', password: '' }
  }
  checkLogin = () => {
    return fetch('http://robinrichard.pythonanywhere.com/ajax/applogin?uname=' + this.state.uname + '&password=' + this.state.password)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.length != 0) {
          AsyncStorage.setItem('user', JSON.stringify(responseJson)).then(() => { onSignIn().then(() => this.props.navigation.navigate("SignedIn")); })
        }
        else {
          alert('Invalid username or password')
        }
      })
      .catch((error) => {
        alert(error)
      });
  }
  render() {
    return (
      <View>
        <FormLabel>Email</FormLabel>
        <FormInput placeholder="Email address..." onChangeText={(uname) => this.setState({ uname })} />
        <FormLabel>Password</FormLabel>
        <FormInput secureTextEntry placeholder="Password..." onChangeText={(password) => this.setState({ password })} />
        <Button
          buttonStyle={{ marginTop: 10, padding: 20 }}
          backgroundColor="#004898"
          title="SIGN IN"
          onPress={this.checkLogin}
        />
      </View>
    );
  }
}
export default LoginForm
