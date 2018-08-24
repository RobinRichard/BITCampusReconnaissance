import React, { Component } from "react";
import {
    View,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar
} from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { Container, Content, Header, Icon, Body, Right, Title } from 'native-base';

class Settings extends Component {

    componentWillMount() {
        this.startHeaderHeight = 80
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1,paddingTop:40 }}>
                 <StatusBar backgroundColor='#00121f' barStyle='light-content' />
                 <Card style={{ flex: 1 }}  title="Robin Richard Arulanandam">
                <View style={styles.usercontainer}>
                  <Avatar
                    xlarge
                    rounded
                    source={require('../Images/user.png')}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}

                  />

                  <View style={{ flexDirection: 'row', margin: 5 }}>
                    <View style={styles.textcontainer} ><Text h4>#1000054229 </Text></View>
                  </View>
                   <View style={{ flexDirection: 'row' }}>
                    <View style={styles.textcontainer} ><Text>Graduate Diplma in IT</Text></View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.textcontainer} ><Text><Icon type="FontAwesome" style={{ color: 'black',fontSize:18 }} name="phone" /> 021 1507791</Text></View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.textcontainer} ><Text><Icon type="FontAwesome" style={{ color: 'black',fontSize:18 }} name="envelope" /> arulr1@student.op.ac.nz</Text></View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.textcontainer} ><Text>Address : 9 Renfrew street, Mary Hill, Dunedin</Text></View>
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
  headerStyle:{
      backgroundColor:'#e8630a'
  }
});
