import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  AsyncStorage,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Container, Left, Right, Card, CardItem, Body } from 'native-base';
import { Text, Avatar } from "react-native-elements";
import { Icon } from 'native-base';

import { onSignOut } from "../auth";

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  componentWillMount() {
      AsyncStorage.getItem('user', (err, result) => {
            var user = JSON.parse(result)
            this.setState({
                userId: user[0]['id'],
                // dataSource: JSON.parse(result),
            },function () {
        return fetch('http://robinrichard.pythonanywhere.com/ajax/getUserDetails?uid=' + this.state.userId)
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
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    else {
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white',padding:5 }}>
          <StatusBar backgroundColor='#00121f' barStyle='light-content' />
          <Card>
            <CardItem >
              <Left/>
              <Right><Icon type="FontAwesome" style={{ color: 'black',fontSize:22 }} name="power-off" onPress={() => onSignOut().then(() => this.props.navigation.navigate("SignedOut"))} /></Right>
            </CardItem>
            <CardItem bordered>
              <Body>
                <View style={styles.usercontainer}>
                <Text style={styles.texttitle}>{this.state.dataSource['user_name']}</Text>
                  <Avatar
                    xlarge
                    rounded
                    source={{uri: 'http://robinrichard.pythonanywhere.com'+this.state.dataSource['user_image']}}
     
                    
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
                    <View style={styles.textcontainer} ><Text><Icon type="FontAwesome" style={{ color: 'black', fontSize: 18 }} name="phone" /> {this.state.dataSource['user_phone']}</Text></View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.textcontainer} ><Text><Icon type="FontAwesome" style={{ color: 'black', fontSize: 18 }} name="envelope" /> {this.state.dataSource['user_mail']}</Text></View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.textcontainer} ><Text>Address : {this.state.dataSource['user_address']}</Text></View>
                  </View>

                </View>
              </Body>
            </CardItem>
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
    height: 50,
  },
  headerStyle: {
    backgroundColor: '#e8630a'
  },
  texttitle: {
    fontSize: 20,
    fontWeight:'200',
    color:'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:10
  }
});
