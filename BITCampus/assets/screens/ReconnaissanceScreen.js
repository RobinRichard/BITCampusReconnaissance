import React, { Component } from "react";
import { View, Dimensions, Image, TextInput, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator, AsyncStorage, Linking } from "react-native";
import { Divider } from 'react-native-elements';
import { Icon, Textarea, Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper'
import QRCodeScanner from 'react-native-qrcode-scanner';


const window = Dimensions.get('window');
const { width } = Dimensions.get('window')
const renderPagination = (index, total, context) => {
    return (
        <View style={styles.paginationStyle}>
            <Text style={{ color: 'black' }}>
                <Text style={styles.paginationText}>{index + 1}</Text>/{total}
            </Text>
        </View>
    )
}

class Reconnaissance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }
    componentWillMount() {
        Actions.Reconnaissance({ title: this.props.title })
        this.FetchData()
    }
    FetchData() {
        AsyncStorage.getItem('user', (err, result) => {
            var user = JSON.parse(result)
            this.setState({
                userId: user[0]['id']
            }, function () {
                return fetch('http://robinrichard.pythonanywhere.com/ajax/apiCategory?id=' + this.state.userId)
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



    render() {

        handleChange = (e, id) => {
            let newanswers = this.state.answers;
            newanswers[id] = e
            this.setState({ answers: newanswers })
        };

        updateAnswer = (id,answer) =>{
                return fetch('http://robinrichard.pythonanywhere.com/ajax/updateAnswer?qid=' + id + '&uid=' + this.state.userId + '&ans=' + answer)
                .then((response) => response.json())
                .then((responseJson) => {
                    alert(responseJson['status'])
                })
                .catch((error) => {
                    alert(error)
                });
        }

        onSuccess = (e,id,qr) => {
            alert('val: '+e+' id: '+id+' qrdata :'+qr['data'])
            if (e == qr['data']) {
                updateAnswer(id,'QR code successfully Verified')
            }
            else {
                alert('Invalid QR')
            }
        }

        submitAns = (id) => {
            updateAnswer(id,this.state.answers[id])
        }

        openLink = (url,id) => {
            Linking.canOpenURL(url).then(supported => {
                if (supported) {
                    Linking.openURL(url);
                    updateAnswer(id,'Link visted')
                    Actions.pop()
                } else {
                    alert("Invalid URL : " + url);
                }
            });
        };

        if (!this.state.isLoading) {
            var answertemp = this.state.answers
            controlList = this.state.questionData.map(function (item) {
                return (
                    <View key={item.id} style={styles.slide}>
                        
                        <Text>{item.question_text}</Text>
                        
                        {item.question_type == 1 ?
                            <View>
                                <Textarea onChangeText={(text) => handleChange(text, item.id)} value={answertemp[item.id]} style={{ width: '75%' }} rowSpan={5} bordered placeholder="Textarea" />
                                <TouchableOpacity>
                                    <Button success onPress={() => submitAns(item.id)} ><Text>Submit </Text></Button>
                                </TouchableOpacity></View> : null}
                        
                        {item.question_type == 2 ?
                            <QRCodeScanner
                                onRead={this.onSuccess.bind(this, item.question_validation.toString(),item.id.toString())}
                                reactivate={true}
                            /> : null}

                        
                        {item.question_type == 3 ?
                            <View>
                                <TouchableOpacity>
                                    <Button success onPress={() => openLink(item.question_validation,item.id.toString())} ><Text>Open Link </Text></Button>
                                </TouchableOpacity></View> : null}
                    </View>
                );
            })
        }
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 10 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        else {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                    <Swiper
                        style={styles.wrapper}
                        showsButtons={true}
                        renderPagination={renderPagination}
                        loop={false}>
                        {controlList}
                    </Swiper>
                </SafeAreaView>
            );
        }
    }
}
export default Reconnaissance;

const styles = {
    wrapper: {
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    image: {
        width,
        flex: 1
    },
    paginationStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        top: 10,
    },
    paginationText: {

        color: 'black',
        fontSize: 20
    }, centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
}
