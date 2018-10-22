import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView, AsyncStorage, StatusBar, ActivityIndicator } from "react-native";
import { Left, Right, CardItem, Body } from 'native-base';
import { Card,Text, Avatar } from "react-native-elements";
import { Icon } from 'native-base';

import { onSignOut } from "../auth";

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  componentWillMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => this.onFocus());
    this._navListener = this.props.navigation.addListener('didBlur', () => this.onBlur())
  }
  onFocus() {
    this.FetchData()
  }

  onBlur() {
    this.setState({
      isLoading: true,
    });
  }

  componentWillUnmount() {
    this._navListener.remove()
  }

  FetchData() {
    AsyncStorage.getItem('user', (err, result) => {
      var user = JSON.parse(result)
      this.setState({
        userId: user[0]['id'],
      }, function () {
        return fetch(global.url + '/api/getUserDetails?uid=' + this.state.userId)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              dataSource: responseJson[0],
            }, function () {
              this.setState({
                isLoading: false,
              });
            });
          })
          .catch((error) => {
            alert(error)
          });
      });
    }).catch((error) => {
      this.props.navigation.navigate("SignedOut")
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#004898" />
        </View>
      )
    }
    else {
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 5 }}>
          <StatusBar backgroundColor='#00121f' barStyle='light-content' />
          <Card title={this.state.dataSource['user_name']}> 
              <View style={{ flex: 1, flexDirection: 'row', padding: 10, alignItems: 'center', justifyContent: 'center', }} >
                  <Icon type="FontAwesome" style={{ color: 'black', fontSize: 22}} name="power-off" onPress={() => onSignOut().then(() => this.props.navigation.navigate("SignedOut"))} />
              </View>
                <View style={styles.usercontainer}>
                  <Avatar
                    xlarge
                    rounded
                    source={{ uri: global.url + this.state.dataSource['user_image'] }}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                  />
                  <View style={{ flexDirection: 'row', margin: 5 }}>
                    <View style={styles.textcontainer} ><Text h4>#{this.state.dataSource['user_rollno']} </Text></View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.textcontainer} ><Text>{this.state.dataSource['user_department']}</Text></View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.textcontainer} ><Text><Icon type="FontAwesome" style={{ color: '#004898', fontSize: 20 }} name="phone" /> <Text style={{marginLeft:10}}>{this.state.dataSource['user_phone']}</Text></Text></View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.textcontainer} ><Text><Icon type="FontAwesome" style={{ color: '#004898', fontSize: 20 }} name="envelope" /> <Text style={{marginLeft:15}}>{this.state.dataSource['user_mail']}</Text></Text></View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.textcontainer} ><Text>Address : {this.state.dataSource['user_address']}</Text></View>
                  </View>

                </View>
                </Card>
        </SafeAreaView>
      );
    }
  }
}
export default Settings;

const styles = StyleSheet.create({
  usercontainer: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 35,
  },
  headerStyle: {
    backgroundColor: '#e8630a'
  },
  texttitle: {
    fontSize: 20,
    fontWeight: '200',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  }
});
