import React, { Component } from "react";
import { View, Alert, ScrollView, KeyboardAvoidingView, Image, ImageBackground, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator, AsyncStorage, Linking } from "react-native";
import { Icon, Textarea, Button, Text, } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper'
import QRCodeScanner from 'react-native-qrcode-scanner';
import Modal from "react-native-modal";
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import Moment from 'moment';
Moment.locale('en');

const renderPagination = (index, total, context) => {
    return (
        <View style={styles.paginationStyle}>
            <Text style={{ color: 'black' }}>
                Question <Text style={styles.paginationText}>{index + 1} </Text> out of {total}
            </Text>
        </View>
    )
}



class Reconnaissance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isModalVisible: false,
            description: ''
        };
    }

    componentWillMount() {
        Actions.Reconnaissance({ title: this.props.title })
        AsyncStorage.getItem('user', (err, result) => {
            var user = JSON.parse(result)
            this.setState({
                userId: user['id']
            }, function () {
                this.FetchData()
            })
        });
    }


    FetchData() {

        return fetch(global.url + '/api/getQuestions?id=' + this.state.userId)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    questionData: responseJson['qusetion'].filter(data => data.section == this.props.section_id),
                    answerData: responseJson['answers'],
                    answerstatedata: responseJson['answers']
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

    }

    render() {

        handleChange = (e, id) => {
            let newanswers = this.state.answers;
            newanswers[id] = e
            this.setState({ answers: newanswers })
        };

        updateAnswer = (id, answer) => {
            return fetch(global.url + '/api/updateAnswer?qid=' + id + '&uid=' + this.state.userId + '&ans=' + answer)
                .then((response) => response.json())
                .then((responseJson) => {
                    alert(responseJson['status'])
                    this.FetchData()
                })
                .catch((error) => {
                    alert(error)
                });
        }

        onSuccess = (e, id, qr) => {
            if (e == qr['data']) {
                updateAnswer(id, 'QR code successfully Verified')
            }
            else {
                alert('Invalid QR')
            }
        }

        submitAns = (id) => {
            if (this.state.answers[id] !== undefined && this.state.answers[id].trim() !== '') {
                updateAnswer(id, this.state.answers[id])
            }
            else {
                alert('Please enter your answer')
            }
        }


        menuSelection = (value) => {
            if (value.menu == 1) {
                this.setState({ isModalVisible: !this.state.isModalVisible, description: value.data });
            }
            if (value.menu == 2) {
                obj = JSON.parse(value.data)
                Alert.alert(
                    'Sure',
                    'Do you want to reset your answers?',
                    [
                        {
                            text: 'Yes', onPress: () => {
                                return fetch(global.url + '/api/resetAnswer?rid=' + obj[0]['id'])
                                    .then((response) => response.json())
                                    .then((responseJson) => {
                                        this.FetchData()
                                        alert(responseJson['status'])
                                    })
                                    .catch((error) => {
                                        alert('Error : ' + error)
                                    });
                            }
                        }, { text: 'No', style: 'cancel' }
                    ],
                    { cancelable: false }
                );

            }
        }

        openLink = (url, id) => {
            Linking.canOpenURL(url).then(supported => {
                if (supported) {
                    Linking.openURL(url);
                    updateAnswer(id, 'Link visted')
                    // Actions.pop()
                } else {
                    alert("Invalid URL : " + url);
                }
            });
        };

        reset = (id) => {
            alert(id)
        }

        if (!this.state.isLoading) {
            var answertemp = this.state.answers
            var answerstate = this.state.answerstatedata
            controlList = this.state.questionData.map(function (item) {
                return (
                    <View key={item.id} style={styles.slide}>
                        <View style={{ width: '100%', paddingLeft: 20, paddingRight: 20, marginTop: 2 }}>
                            <Menu style={{ top: 12, right: 20, position: 'absolute' }} onSelect={(value) => menuSelection(value)}>
                                <MenuTrigger>
                                    <Icon type="FontAwesome" style={{ fontSize: 25, color: '#666666' }} name="bars" />
                                </MenuTrigger>
                                <MenuOptions>
                                    <MenuOption value={{ menu: 1, data: item.question_description }}>
                                        <View style={{ flex: 1, flexDirection: 'row', padding: 5 }}>
                                            <Icon type="FontAwesome" style={{ fontSize: 20, color: '#004898' }} name="info" />
                                            <Text style={{ marginLeft: 10, color: '#004898' }}>More Info</Text>
                                        </View>
                                    </MenuOption>
                                    {answerstate.filter(data => data.question == item.id && data.answer_status == 3).length == 1 ?
                                        <MenuOption value={{ menu: 2, data: JSON.stringify(answerstate.filter(data => data.question == item.id)) }}>
                                            <View style={{ flex: 1, flexDirection: 'row', padding: 5 }}>
                                                <Icon type="FontAwesome" style={{ fontSize: 20, color: '#004898' }} name="refresh" />
                                                <Text style={{ marginLeft: 10, color: '#004898' }}> Reset Answer</Text>
                                            </View>
                                        </MenuOption> :
                                        <MenuOption disabled={true} value={{ menu: 2, data: JSON.stringify(answerstate.filter(data => data.question == item.id)) }}>
                                            <View style={{ flex: 1, flexDirection: 'row', padding: 5 }}>
                                                <Icon type="FontAwesome" style={{ fontSize: 20, color: '#bcbab8' }} name="refresh" />
                                                <Text style={{ marginLeft: 10, color: '#bcbab8' }}> Reset Answer</Text>
                                            </View>
                                        </MenuOption>

                                    }
                                </MenuOptions>
                            </Menu>

                            <View style={{ paddingTop: 45 }}>
                                <View style={{ borderTopWidth: 1, borderTopColor: '#e6e6fa' }}>
                                    <Text style={{ marginTop: 5 }}>{item.question_text}</Text>

                                </View>
                            </View>
                        </View>

                        {item.question_type == 1 ?
                            answerstate.filter(data => data.question == item.id && data.answer_status == 3).length == 1 ?
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, marginTop: 20 }}>
                                    <Text>Already finished on {Moment(item.answer_date).format('lll')}</Text>
                                    <Text style={{ marginTop: 20 }}>Your Answer : {answertemp[item.id]}</Text>
                                </View> :

                                <View style={{ width: '100%', paddingLeft: 20, paddingRight: 20, marginTop: 10 }}>
                                    <KeyboardAvoidingView>
                                        <Textarea onChangeText={(text) => handleChange(text, item.id)} value={answertemp[item.id]} style={{ width: '85%', alignSelf: "center" }} rowSpan={4} bordered placeholder="Textarea" />
                                        <TouchableOpacity>
                                            <Button style={{ alignSelf: "center", marginTop: 10 }} success onPress={() => submitAns(item.id)} ><Text>Submit </Text></Button>
                                        </TouchableOpacity>
                                    </KeyboardAvoidingView>
                                </View>
                            : null}

                        {item.question_type == 2 ?
                            answerstate.filter(data => data.question == item.id && data.answer_status == 3).length == 1 ?
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, marginTop: 20 }}>
                                    <Text>Already finished on {Moment(item.answer_date).format('lll')}</Text>
                                </View> :
                                <QRCodeScanner
                                    cameraStyle={{ width: '80%', height: '80%', alignSelf: "center" }}
                                    onRead={this.onSuccess.bind(this, item.question_validation.toString(), item.id.toString())}
                                    reactivate={true}
                                    reactivateTimeout={3000}
                                />
                            : null}


                        {item.question_type == 3 ?
                            answerstate.filter(data => data.question == item.id && data.answer_status == 3).length == 1 ?
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, marginTop: 20 }}>
                                    <Text>Already finished on {Moment(item.answer_date).format('lll')}</Text>
                                </View> :
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', padding: 20, marginTop: 50 }}>
                                    <TouchableOpacity>
                                        <Button success onPress={() => openLink(item.question_validation, item.id.toString())} ><Text>Open Link </Text></Button>
                                    </TouchableOpacity></View> : null}
                    </View>
                );
            })
        }
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#004898" />
                </View>
            )
        }
        else {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                    <MenuContext style={{ flex: 1 }} >
                        <Swiper
                            style={styles.wrapper}
                            showsButtons={true}
                            renderPagination={renderPagination}
                            loop={false}>
                            {controlList}
                        </Swiper>
                        <Modal isVisible={this.state.isModalVisible}
                            backdropOpacity={0}
                            onBackdropPress={() => this.setState({ isModalVisible: false })}
                            onBackButtonPress={() => this.setState({ isModalVisible: false })}
                            animationIn="slideInDown"
                            animationOut="slideOutUp"
                            animationInTiming={500}
                            animationOutTiming={500}
                            style={{ margin: -10 }}
                        >
                            <View style={{ top: 0, right: 0, overflow: 'hidden', alignItems: 'flex-end', position: 'absolute', backgroundColor: '#004898', padding: 10, width: '90%', height: '50%', borderBottomLeftRadius: 600, borderTopLeftRadius: 10 }}>
                                <ScrollView style={{ margin: 10 }}>
                                    <Text style={{ height: 30, fontSize: 22, textAlign: 'right', color: '#fff' }}>Description</Text>
                                    <Text style={{ marginTop: 10, width: 300, textAlign: 'right', color: '#fff' }}>{this.state.description} </Text>
                                </ScrollView>
                                <TouchableOpacity style={{ right: 20, position: 'absolute', bottom: 10 }} onPress={() => this.setState({ isModalVisible: false })}>
                                    <Text style={{ textAlign: 'right', color: '#fff' }}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </MenuContext>
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
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
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
    TouchableOpacity_Style: {
        width: 25,
        height: 25,
        top: 10,
        right: 10,
        position: 'absolute'

    }
}
