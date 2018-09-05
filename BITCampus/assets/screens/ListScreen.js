import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { Divider } from 'react-native-elements';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';


class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }
    componentWillMount() {
        Actions.List({ title: this.props.category })
        return fetch('http://10.0.2.2:8000/api/sectionList.json')
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
                isLoading: false,
                data: responseJson.filter(data => data.category == this.props.category_id),
              }, function () {
                // alert(this.state.dataSource['studentFirstName']);
              });
            })
          .catch((error) => {
            alert(error)
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
          else{
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.data}
                        renderItem={
                            ({ item }) =>
                                <TouchableOpacity onPress={() => Actions.Wizard({ section_id: item.id,title:item.section_name})}>
                                    <View style={{ flex: 1, flexDirection: 'row',padding:10 }} >
                                        <View style={{ flex: 4, justifyContent: 'center', padding: 10 }}>
                                            <Text style={styles.item} >{item.section_name}</Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', height: 50 }}>
                                            {item.status == '1' ? <Icon type="FontAwesome" style={{ color: 'green', fontSize: 22 }} name="check" /> : <Icon type="FontAwesome" style={{ color: '#f6c523', fontSize: 22 }} name="warning" />}
                                        </View>
                                    </View>
                                    <View>
                                        <Divider style={{ height: 1, backgroundColor: '#f0f2eb' }} />
                                    </View>
                                </TouchableOpacity>
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </SafeAreaView>
        );
    }
    }
}
export default List;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    thumbs: {
        width: 24,
        height: 24,
    },
    item:{
        fontSize: 16,
        fontWeight:'100',
        color:'black'  
    }
});