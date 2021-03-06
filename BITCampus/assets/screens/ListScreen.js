import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator, AsyncStorage } from "react-native";
import { Divider } from 'react-native-elements';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Modal from "react-native-modal";

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            flag: false,
            isModalVisible: false
        };
    }

    componentWillMount() {
        Actions.List({ title: this.props.category })
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
                userId: user['id']
            }, function () {
                return fetch(global.url + '/api/getQuestions?id=' + this.state.userId)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({
                            categoryData: responseJson['category'],
                            sectionData: responseJson['section'].filter(data => data.category == this.props.category_id),
                            questionData: responseJson['qusetion'],
                            answerData: responseJson['answers'],
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

    modalClose = () => {
        this.setState({ isModalVisible: false })
    }
    getIcon(id) {
        var answer = this.state.answerData
        var flagtemp = []
        this.state.questionData.filter(data => data.section == id).map(function (qitem) {
            key = answer.filter(data => data.question == qitem.id && data.answer_status == 3).length == 1 ? 1 : 0
            flagtemp.push(key)
        })
        return (flagtemp.filter(data => data == 0).length >= 1 ? <Icon type="FontAwesome" style={{ color: '#f6c523', fontSize: 22 }} name="warning" /> : <Icon type="FontAwesome" style={{ color: 'green', fontSize: 22 }} name="check" />);
    }

    render() {
        if (this.state.isLoading) {
            const answer = this.state.answerData
            return (
                <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#004898" />
                </View>
            )
        }
        else {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                    <View>
                        <Modal isVisible={this.state.isModalVisible}
                            backdropOpacity={0}
                            onBackdropPress={() => this.modalClose()}
                            animationIn="slideInDown"
                            animationOut="slideOutUp"
                            animationInTiming={500}
                            animationOutTiming={500}
                            style={{ margin: -10 }}
                        >
                            <View style={{ top: 0, right: 0, overflow: 'hidden', alignItems: 'flex-end', position: 'absolute', backgroundColor: '#004898', padding: 10, width: '90%', height: '50%', borderBottomLeftRadius: 600, borderTopLeftRadius: 10 }}>
                                <ScrollView style={{ margin: 10 }}>
                                    <Text style={{ height: 30, fontSize: 22, textAlign: 'right', color: '#fff' }}>{this.props.category} Section</Text>
                                    <Text style={{ marginTop: 10, width: 300, textAlign: 'right', color: '#fff' }}>This section contains one or more question about {this.props.category}. Each may ask you to write or do something to make you clear all about {this.props.category} in this campus </Text>
                                    <Text style={{ marginTop: 10, width: 300, textAlign: 'right', color: '#fff' }}>Click on the sections to get all questions</Text>
                                </ScrollView>
                                <TouchableOpacity style={{ right: 20, position: 'absolute', bottom: 10 }} onPress={() => this.modalClose()}>
                                    <Text style={{ textAlign: 'right', color: '#fff' }}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={this.state.sectionData}
                            renderItem={
                                ({ item }) =>
                                    <TouchableOpacity onPress={() => Actions.Reconnaissance({ section_id: item.id, title: item.section_name, catid: this.props.category_id, category: this.props.category })}>
                                        <View style={{ flex: 1, flexDirection: 'row', padding: 10,borderBottomWidth:1,borderBottomColor:'#929aab' }} >
                                            <View style={{ flex: 4, justifyContent: 'center', padding: 10 }}>
                                                <Text style={styles.item} >{item.section_name}</Text>
                                            </View>
                                            <View style={{ flex: 1, justifyContent: 'center', height: 40 }}>
                                                {this.getIcon(item.id)}
                                            </View>
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
    item: {
        fontSize: 16,
        fontWeight: '100',
        color: 'black'
    }
});