import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, TextInput, Text, Image, ToastAndroid, Dimensions } from 'react-native';
import Stager, { Stage, StageButtons, StageProgress } from 'react-native-stager'
import t from 'tcomb-form-native'; // 0.6.9
import { Card, Avatar,Button } from "react-native-elements";

import ImagePicker from "react-native-image-picker";
import RNFetchBlob from 'rn-fetch-blob';
const window = Dimensions.get('window');

const Form = t.form.Form;
const Email = t.subtype(t.Str, (email) => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
});
var _ = require('lodash');

const formStyles = _.cloneDeep(t.form.Form.stylesheet);

formStyles.textbox.normal.borderWidth = 0;
formStyles.textbox.error.borderWidth = 0;
formStyles.textbox.normal.marginBottom = 0;
formStyles.textbox.error.marginBottom = 0;

formStyles.textboxView.normal.borderWidth = 0;
formStyles.textboxView.normal.width = window.width - 20;
formStyles.textboxView.error.width = window.width - 20;
formStyles.textboxView.error.borderWidth = 0;
formStyles.textboxView.normal.borderRadius = 0;
formStyles.textboxView.error.borderRadius = 0;
formStyles.textboxView.normal.borderBottomWidth = 1;
formStyles.textboxView.error.borderBottomWidth = 1;
formStyles.textboxView.normal.borderBottomColor = 'black';
formStyles.textboxView.error.borderBottomColor = 'red';
formStyles.textboxView.normal.marginBottom = 5;
formStyles.textboxView.error.marginBottom = 5;

const UserDetails = t.struct({
    Course: t.String,
    Roll: t.Number,
    Phone: t.Number,
    Address: t.String,
});

const UserRegister = t.struct({
    Name: t.String,
    Email: Email,
    Password: t.String,
    ConfirmPassword: t.String
});



const optionsreg = {
    auto: 'placeholders',

    fields: {
        Password: {
            password: true,
            secureTextEntry: true,
        },
        ConfirmPassword: {
            password: true,
            secureTextEntry: true,
        }
    },
    stylesheet: formStyles
    // stylesheet: formStyles,
};
const optionsupdate = {
    auto: 'placeholders',

    stylesheet: formStyles,
};

const imgpickeroptions = {
    title: 'Select Photo',
    takePhotoButtonTitle: "Take a photo",
    chooseFromLibraryButtonTitle: "Choose from gallery ",
    quality: 1
};
class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            continue1: true,
            text: '',
            custom: true,
            buttonText: 'SignUp',
            uid: null,
            imageSource: null,
            data: null
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.custom !== nextState.custom
    }

    FirstNext = (context, instance) => {
        // context.next()
        this.setState({
            continue1: true
        }, instance.refresh)
    }
    SecondNext = (context) => {
        context.next()
    }
    getType() {
        return (
            <Stager key="Reg">
                <StageButtons>
                    {({ context }) => (
                        <View>
                            {/*<Button title="<" onPress={context.prev} />*/}
                            <Button buttonStyle={{backgroundColor:'#004898'}}  title={this.state.buttonText} onPress={() => this.HandleNext(context)} />
                        </View>
                    )}
                </StageButtons>
                <StageProgress>
                    {({ context }) => (
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>{`${context.currentStage()}`}</Text>
                    )}
                </StageProgress>

                <Stage key="Registration" continue={() => this.state.continue1}>
                    {({ context, instance }) => (
                        <View style={styles.container}>
                            <Form
                                ref={c => this.reg_form = c}
                                type={UserRegister}
                                options={optionsreg}
                            />
                        </View>
                    )}
                </Stage>

                <Stage
                    key="Details"
                    noPrevious
                >
                    {({ instance, context }) => (
                        <View style={styles.container}>
                            <Form
                                ref={d => this.det_form = d}
                                type={UserDetails}
                                options={optionsupdate}
                            />
                        </View>
                    )}
                </Stage>
                <Stage key="Profile" noPrevious>
                    {({ instance,context }) => (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Avatar
                                xlarge
                                rounded
                                source={this.state.imageSource != null ? require('../Images/user.png') :
                                    require('../Images/upload.png')}
                                onPress={() => this.selectPhoto(instance)}
                                activeOpacity={0.7}
                            />

                            <Button onPress={() => this.uploadPhoto()} style={{ margin: 5 }} title='Upload' />
                            <View style={{ flexDirection: 'row', padding: 10, width: '100%', justifyContent: 'center', alignItems: 'center' }}>

                                {this.state.imageSource == null ? <Button onPress={() => this.selectPhoto(instance)} style={{ margin: 5 }} title='Select' /> : null}

                                {this.state.imageSource != null ? <Button onPress={() => this.RemovePhoto()} style={{ margin: 5 }} title='Clear' /> : null}

                                {this.state.imageSource != null ? <Button onPress={() => this.uploadPhoto()} style={{ margin: 5 }} title='Upload' /> : null}
                            </View>
                        </View>
                    )}
                </Stage>

            </Stager>
        )
    }

    HandleNext = (context) => {
        if (context.currentStage() == 'Registration') {
            this.handleRegistation(context)
        }
        if (context.currentStage() == 'Details') {
            this.handleUpdate(context)
        }
        if (context.currentStage() == 'Profile') {
            this.props.navigation.navigate("SignIn")
            alert('Registration Finished')
        }
    }
    handleRegistation = (context) => {
        const value = this.reg_form.getValue();
        if (value) {
            if (value.Password == value.ConfirmPassword) {
                return fetch(global.url + '/api/addUser?type=reg&user_name=' + value.Name + '&user_mail=' + value.Email + '&user_password=' + value.Password)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        if (responseJson['status'] == 1) {
                            this.setState({
                                uid: responseJson['user_id']
                            })
                            this.state.buttonText = "Add Details"
                            context.next()
                        }
                        if (responseJson['status'] == 0) {
                            alert('Email already exist')
                        }
                        if (responseJson['status'] == 2) {
                            alert('Registration Failed')
                        }
                    })
                    .catch((error) => {
                        alert('Error:' + error)
                    });
            }
            else {
                alert("password missmatch")
            }
        }
    }

    handleUpdate = (context) => {
        const value = this.det_form.getValue();
        return fetch(global.url + '/api/addUser?type=update&user_department=' + value.Course + '&user_rollno=' + value.Roll + '&user_phone=' + value.Phone + '&user_address=' + value.Address + '&user_id=' + this.state.uid)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson['status'] == 1) {
                    this.state.buttonText = "Skip"
                    this.props.navigation.navigate("Profile", { id: this.state.uid })
                    // context.next()
                }
                if (responseJson['status'] == 0) {
                    alert('Failed to save')
                }
            })
            .catch((error) => {
                alert('Error:' + error)
            });
    }

    selectPhoto = (instance) => {
        ImagePicker.showImagePicker(imgpickeroptions, (response) => {
            if (response.error) {
                alert('ImagePicker Error : ' + response.error)
            }
            else {
                let source = { uri: response.uri };
                this.setState({
                    imageSource: source,
                    data: response.data,
                    filetype: response.type,
                    filename: response.fileName,
                }, instance.refresh);
            }
        });

    }

    uploadPhoto = () => {

        RNFetchBlob.fetch('POST', global.url + '/api/apiUpload', {
            Authorization: "Bearer access-token",
            otherHeader: "foo",
            'Content-Type': 'multipart/form-data',
        }, [
                { name: 'profile', filename: this.state.filename, type: this.state.filetype, data: this.state.data },
                { name: 'user_id', data: this.state.uid.toString() }

            ]).then((resp) => {
                resdata = JSON.parse(resp['data'])
                if (resdata['status'] == 1) {
                    this.props.navigation.navigate("SignIn")
                    alert('Registration Finished')
                }
                if (resdata['status'] == 0) {
                    alert('Erroro while uploading image')
                }
            }).catch((err) => {
                alert('Server error : ' + err)
            })

    }

    RemovePhoto = () => {
        this.setState({
            imageSource: null
        })
    }

    render() {
        return (
            <ScrollView style={styles.scrollcontainer}>
                {this.getType()}
            </ScrollView>
        );
    }
}
export default Signup;
const styles = StyleSheet.create({
    scrollcontainer: {
        backgroundColor: '#fff',
        padding: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
    },
});