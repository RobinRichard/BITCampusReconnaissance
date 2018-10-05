import React, { Component } from "react";
import { View, Dimensions,Text,Switch,TextInput, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator, AsyncStorage } from "react-native";
import { Container, Header, Content, Textarea, Form } from "native-base";
import { Actions } from 'react-native-router-flux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from "react-native-underline-tabbar";
const window = Dimensions.get('window');

const Page = ({label}) => (
    <View style={styles.container}>
        <Text style={styles.welcome}>
            {label} 
        </Text>
        <Textarea rowSpan={5} bordered placeholder="Textarea" />
    </View>
);

const Task = ({label}) => (
    <View style={styles.container}>
        <Text style={styles.welcome}>
            {label} 
        </Text>
        <Switch onChangeValue={this.toggleSwitch} value ={this.state.sqitchValue}></Switch>

    </View>
);

const Link = ({label}) => (
    <View style={styles.container}>
        <Text style={styles.welcome}>
            {label} 
        </Text>

    </View>
);

class Reconnaissance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            switchvalue:false
        };
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
                                answerJson[key] = answerdata.filter(data => data.question == item.id)[0]['answer_text'].toString()
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

    toggleSwitch(){
        this.state.switchValue = !this.state.switchValue
    }

    render() {
        if (!this.state.isLoading) {
            var i = 1
            TabList = this.state.questionData.map(function (item) {
                return (
                    item.question_type==1?<Page key={item.id} tabLabel={{ label: "Question # "+(i++) }} label={item.question_text} />:null
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
                            tabBarActiveTextColor="#53ac49"
                            tabMargin
                            renderTabBar={() => <TabBar tabStyles={{tab:{width:(window.width-40)/this.state.questionData.length}}} underlineColor="#53ac49" />}>
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