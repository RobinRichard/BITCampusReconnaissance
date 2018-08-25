import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { Divider } from 'react-native-elements';
import { Icon } from 'native-base';
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
       
        Actions.List({ title: this.state.category })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.questionList}
                        renderItem={
                            ({ item }) =>
                                <TouchableOpacity onPress={() => Actions.Wizard({ questionList: item.questions,title: item.key})}>
                                    <View style={{ flex: 1, flexDirection: 'row',padding:10 }} >
                                        <View style={{ flex: 4, justifyContent: 'center', padding: 10 }}>
                                            <Text style={styles.item} >{item.key}</Text>
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
    },
    item:{
        fontSize: 16,
        fontWeight:'100',
        color:'black'  
    }
});