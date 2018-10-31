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
    return fetch(global.url+'/api/applogin?uname=' + this.state.uname + '&password=' + this.state.password)
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
     const { navigate } = this.props.navigation;
    return (
      <View>
        <FormInput containerStyle={{borderBottomWidth: 1}} placeholder="Email" onChangeText={(uname) => this.setState({ uname })} />
        <FormInput containerStyle={{borderBottomWidth: 1,marginTop:15}}  secureTextEntry placeholder="Password" onChangeText={(password) => this.setState({ password })} />
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
    );
  }
}
export default LoginForm
