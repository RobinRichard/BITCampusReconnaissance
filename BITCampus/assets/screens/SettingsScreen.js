import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Card, Text, Avatar } from "react-native-elements";
import { Icon } from 'native-base';

import { onSignOut } from "../auth";

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }
  componentWillMount() {
    return fetch('http://10.118.0.186:3000/api/getstudent')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.recordset[0],
        }, function () {
          // alert(this.state.dataSource['studentFirstName']);
        });

      })
      .catch((error) => {
        console.error(error);
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

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <StatusBar backgroundColor='#00121f' barStyle='light-content' />

        <Card style={{ flex: 1 }} title={this.state.dataSource['studentFirstName'] + ' '+ this.state.dataSource['studentLastName']}>
          <View style={styles.usercontainer}>
            <Icon type="FontAwesome" style={{ color: 'black' }} name="power-off" onPress={() => onSignOut().then(() => this.props.navigation.navigate("SignedOut"))}/>
            <Avatar
              xlarge
              rounded
              source={require('../Images/user.png')}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}

            />
            <View style={{ flexDirection: 'row', margin: 5 }}>
              <View style={styles.textcontainer} ><Text h4>#{this.state.dataSource['studentRollNo']} </Text></View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.textcontainer} ><Text>{this.state.dataSource['studentDepartment']}</Text></View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.textcontainer} ><Text><Icon type="FontAwesome" style={{ color: 'black', fontSize: 18 }} name="phone" /> {this.state.dataSource['studentphone']}</Text></View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.textcontainer} ><Text><Icon type="FontAwesome" style={{ color: 'black', fontSize: 18 }} name="envelope" /> {this.state.dataSource['studentEmail']}</Text></View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.textcontainer} ><Text>Address : {this.state.dataSource['studentAddress']}</Text></View>
            </View>

          </View>
        </Card>

      </SafeAreaView>
    );
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
  }
});
