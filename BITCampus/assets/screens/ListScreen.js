import React, { Component } from "react";
import { View,Text,Image,StyleSheet, SafeAreaView,TextInput, Platform, StatusBar, FlatList } from "react-native";
import {Divider} from 'react-native-elements'
import { Button,Icon, Container, Header, Content, Left } from 'native-base'
import { Actions } from 'react-native-router-flux';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questionList: this.props.questionList,
            category: this.props.types
        };

    }
    componentWillMount() {
        this.startHeaderHeight = 80
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 10 + StatusBar.currentHeight
        }
        Actions.List({ title: this.state.category })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1,backgroundColor:'white' }}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.questionList}
                        renderItem={
                            ({ item }) =>
                            <View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 4, justifyContent: 'center', padding: 10 }}>
                                        <Text style={styles.item} onPress={() => Actions.Wizard({ questionList: item.questions })}>{item.key} {this.category}</Text>
                                        {/*<Text>Count {Object.keys(item.questions).length} / {Object.keys(item.questions.filter(data => data.status == '0')).length}</Text>*/}
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', height: 50 }}>
                                        {item.status == '1' ? <Icon type="FontAwesome" style={{ color: 'green',fontSize:22 }} name="check" /> : <Icon type="FontAwesome" style={{ color: '#f6c523',fontSize:22 }} name="warning" />}
                                    </View>
                                </View>
                                <View>
                                <Divider style={{ height: 1,backgroundColor: 'gray' }} /></View></View>
                        }
                    />
                </View>
            </SafeAreaView>
        );
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
    }
});