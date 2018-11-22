import React, { Component } from "react";
import { View, StyleSheet, Alert, SafeAreaView, AsyncStorage, StatusBar, ActivityIndicator, Image } from "react-native";

import { Container, Content, Header, Icon, Body, Right, Title } from 'native-base';

import { Card, Text, Avatar } from "react-native-elements";

import { onSignOut } from "../auth";

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  componentWillMount() {
    this.FetchData()
    // this._navListener = this.props.navigation.addListener('didFocus', () => this.onFocus());
    // this._navListener = this.props.navigation.addListener('didBlur', () => this.onBlur())
  }
  // onFocus() {
  //   this.FetchData()
  // }

  // onBlur() {
  //   // this.setState({
  //   //   isLoading: true,
  //   // });
  // }

  // componentWillUnmount() {
  //   this._navListener.remove()
  // }

  FetchData() {
    AsyncStorage.getItem('user', (err, result) => {
      var user = JSON.parse(result)
      this.setState({
        userId: user['id'],
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

  signout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure You want to logout ?',
      [
        { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Yes', onPress: () => onSignOut().then(() => this.props.navigation.navigate("SignedOut")) },
      ],
      { cancelable: false }
    )

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
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
          <StatusBar backgroundColor='#00121f' barStyle='light-content' />
          <Header androidStatusBarColor="#00121f" style={styles.headerStyle} >
            <Body>
              <Title>User Profile</Title>
            </Body>
            <Right><Icon type="FontAwesome" style={{ color: 'white', marginRight: 10 }} name="power-off" onPress={() => this.signout()} /></Right>
          </Header>


          <Card title={this.state.dataSource['user_name']}>
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
                <View style={styles.textcontainer} >
                  <View style={{ flexDirection: 'row', padding: 10, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon type="FontAwesome" style={{ color: '#004898', fontSize: 20 }} name="phone" />
                    <Text style={{ marginLeft: 10 }}>{this.state.dataSource['user_phone']}</Text>
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.textcontainer} >
                  <View style={{ flexDirection: 'row', padding: 10, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon type="FontAwesome" style={{ color: '#004898', fontSize: 20 }} name="envelope" />
                    <Text style={{ marginLeft: 15 }}>{this.state.dataSource['user_mail']}</Text>
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.textcontainer} >
                  <View style={{ flexDirection: 'row', padding: 10, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon type="FontAwesome" style={{ color: '#004898', fontSize: 20 }} name="map-marker" />
                    <Text style={{ marginLeft: 15 }}>{this.state.dataSource['user_address']}</Text>
                  </View>
                </View>
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
    backgroundColor: '#004898'
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
