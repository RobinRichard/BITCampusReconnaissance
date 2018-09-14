import React, { Component } from "react";
import { View, Dimensions, TextInput, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator, AsyncStorage } from "react-native";
import { Divider } from 'react-native-elements';
import { Icon, Textarea, Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from "react-native-underline-tabbar";
import _ from 'lodash';

const window = Dimensions.get('window');

class Reconnaissance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
        this.submitAns = this.submitAns.bind(this);
    }
    componentWillMount() {
        Actions.Reconnaissance({ title: this.props.title })
        AsyncStorage.getItem('user', (err, result) => {
            var user = JSON.parse(result)
            this.setState({
                userId: user[0]['id']
            }, function () {
                return fetch('http://10.0.2.2:8000/ajax/apiCategory?id=' + this.state.userId)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({
                            questionData: responseJson['qusetion'].filter(data => data.section == this.props.section_id),
                            answerData: responseJson['answers'],
                        }, function () {
                            var answerdata = this.state.answerData;
                            var answerJson = {}
                            this.state.questionData.map(function (item) {
                                var key = item.id
                                if (answerdata.filter(data => data.question == item.id).length > 0)
                                    answerJson[key] = answerdata.filter(data => data.question == item.id)[0]['answer_text']
                            })

                            this.setState({
                                isLoading: false,
                                answers: answerJson
                            });

                        });
                    })
                    .catch((error) => {
                        alert(error)
                    });
            });
        });
    }

    submitAns(id) {
        alert(id+this.state.answers[id])
         return fetch('http://10.0.2.2:8000/ajax/updateAnswer?qid='+id+'&uid='+ this.state.userId+'&ans=' + this.state.answers[id])
                    .then((response) => response.json())
                    .then((responseJson) => {
                        alert(responseJson['status'])
                    })
                    .catch((error) => {
                        alert(error)
                    });
      
    }

    handleChange = (e, id) => {
        let newanswers = this.state.answers;
        newanswers[id] = e
        this.setState({ answers: newanswers })
    };

    render() {

        if (!this.state.isLoading) {
            var Page = ({ label, type, qid, ans }) => (
                <View style={styles.container}>
                    <Text style={styles.welcome}>{label}</Text>
                    {type == 1 ? <Textarea autoFocus onChangeText={(text) => this.handleChange(text, qid)} value={ans} style={{ width: '85%' }} rowSpan={5} bordered placeholder="Textarea" /> : null}
                    {type == 2 ? <Text>Task</Text> : null}
                    {type == 3 ? <Text style={{ color: 'blue' }} onPress={() => Linking.openURL('http://google.com')}>Google</Text> : null}
                    <TouchableOpacity>
                        <Button success onPress={() => this.submitAns(qid)} ><Text>Submit </Text></Button>
                    </TouchableOpacity>
                </View>
            );
            var i = 1
            var answertemp = this.state.answers
            TabList = this.state.questionData.map(function (item) {
                return (
                    <Page key={item.id} tabLabel={{ label: "Question # " + (i++) }} label={item.question_text} type={item.question_type} qid={item.id} ans={answertemp[item.id]} />
                );
            });
        }
        if (this.state.isLoading) {
            const answer = this.state.answerData
            return (
                <View style={{ flex: 1, padding: 10 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        else {

            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={[styles.container, { paddingTop: 10 }]}>
                        <ScrollableTabView
                            tabBarActiveTextColor="white"
                            tabMargin
                            style={{ minWidth: window.width / 1.5 }}
                            renderTabBar={() => <TabBar tabStyles={{ tab: { backgroundColor: 'gray', padding: 10, borderRadius: 10, margin: 3 } }} underlineColor="white" />}>
                            {TabList}
                        </ScrollableTabView>

                    </View>
                </SafeAreaView>
            );
        }
    }
}
export default Reconnaissance;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        fontSize: 28,
    },
});