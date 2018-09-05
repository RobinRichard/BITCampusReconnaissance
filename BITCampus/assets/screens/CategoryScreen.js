import React, { Component } from "react";
import { View, ScrollView, StatusBar, ActivityIndicator, StyleSheet, SafeAreaView, TextInput, Platform, FlatList, TouchableOpacity, ProgressBarAndroid, ProgressViewIOS } from "react-native";
import { Button, Icon, Container, Header, Content, Left } from 'native-base'
import { Tile, Text } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

const jsonData = require('../data/Reconnaissance.json');

class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };

    }
    componentWillMount() {
        return fetch('http://10.0.2.2:8000/api/categoryList.json')
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
                isLoading: false,
                data: responseJson,
              }, function () {
                // alert(this.state.dataSource['studentFirstName']);
              });
            })
          .catch((error) => {
            alert(error)
          });
      };

    render() {
        if (!this.state.isLoading) {
        CategoryList = this.state.data.map(function (item) {
            const totalQues = 2//Object.keys(item.questionList).length
            const answeredQues = 1//Object.keys(item.questionList.filter(data => data.status == '1')).length
            return (
                <TouchableOpacity key={item.id} style={styles.imgContainer} onPress={() => Actions.List({ category_id: item.id,category:item.category_name })}>
                    <View style={{ backgroundColor: item.category_color, borderRadius: 5 }}>
                        <View style={styles.TextContainer}>
                            <View style={{ flex: 1 }}><Icon type="FontAwesome" style={{ fontSize: 28, color: 'white' }} name={item.category_icon} /></View>
                            <View style={{ flex: 3, alignItems: 'center' }}><Text style={styles.buttonText} >{item.category_name}</Text></View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}><Text style={styles.buttonText}>{answeredQues} / {totalQues}</Text></View>
                        </View>
                        <View style={{alignItems: 'center', flexDirection: 'row',marginBottom:10, justifyContent: 'center',}}>
                            <View style={{ flex: 4,alignItems: 'center'}}>
                                <View style={{ width:'80%'}}>
                            {
                                (Platform.OS === 'android')
                                    ?
                                    (<ProgressBarAndroid styleAttr="Horizontal" color="white" progress={answeredQues/totalQues} indeterminate={false} />)
                                    :
                                    (<ProgressViewIOS color="white" progress={this.state.Progress_Value} />)
                            }
                            </View>
                            </View>
                            <View style={{ flex: 1}}>
                                 <Text style={{ color:'white'}}>{parseInt(((answeredQues/totalQues) * 100))} %</Text>
                            </View>
                           </View>
                    </View>
                </TouchableOpacity>
            );
        });
    }
        if (this.state.isLoading) {
            return (
              <View style={{ flex: 1, padding: 20 }}>
                <ActivityIndicator />
              </View>
            )
          }
          else{
        return (
            <SafeAreaView style={{ flex: 1,backgroundColor:'white' }}>
                <StatusBar backgroundColor='#00121f' barStyle='light-content' />
                <View style={{ flex: 1 }}>
                <View style={{alignItems: 'center',justifyContent: 'center', padding:10}}>
                    <Text style={{fontSize:20,fontWeight:'bold', color: '#004898'}}>Reconnaissance</Text>
                    <Text style={{fontSize:16,fontWeight:'bold', color: '#5c5757'}}>Otago Polytechnic</Text>
                </View>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={styles.container}>
                            {CategoryList}
                        </View>
                        <View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
    }
}
export default Category;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    scrollContainer: {
        paddingVertical: 10
    },
    gallaryImg: {
        height: 250,
        width: '100%'
    },
    imgContainer: {
        width: '100%',
        padding: 10,

    },
    TextContainer: {
        margin: 10,
        padding: 20,
        borderRadius: 5,
        flexDirection: 'row'
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        color: '#ffffff',
    },
    containers: {
        flex: 1,
    }
});