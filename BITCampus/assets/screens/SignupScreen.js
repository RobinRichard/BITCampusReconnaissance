import React, { Component } from 'react';
import { View, Alert, ScrollView, StyleSheet, SafeAreaView, TextInput, Text, Image, ToastAndroid, Dimensions, ActivityIndicator } from 'react-native';
import Stager, { Stage, StageButtons, StageProgress } from 'react-native-stager'
import t from 'tcomb-form-native'; // 0.6.9
import { Card, Avatar, Button } from "react-native-elements";

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
    ID: t.Number,
    Phone: t.Number,
    Address: t.String,

});

const UserRegister = t.struct({
    Name: t.String,
    Email: Email,
    Password: t.String,
    ConfirmPassword: t.String,
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
};
const optionsupdate = {
    auto: 'placeholders',

    stylesheet: formStyles,
};


class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            continue1: true,
            text: '',
            custom: true,
            buttonText: 'Next',
            uid: null,
            isLoading: false,
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
                            <Button buttonStyle={{ backgroundColor: '#004898' }} title={this.state.buttonText} onPress={() => this.HandleNext(context)} />
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

                <Stage key="Details">
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

    }
    handleRegistation = (context) => {
        this.setState({
            Regvalue: this.reg_form.getValue()
        })
        const value = this.reg_form.getValue();
        if (value) {
            if (value.Password == value.ConfirmPassword) {
                return fetch(global.url + '/api/addUser?type=check&user_mail=' + value.Email)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        if (responseJson['status'] == 1) {
                            this.state.buttonText = "Sign Up"
                            context.next()
                        }
                        if (responseJson['status'] == 0) {
                            alert('Email already exist')
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
        this.setState({
            isLoading : true,
        })
        const value = this.state.Regvalue
        const value2 = this.det_form.getValue();
        if (value2) {
            if (value.Password == value.ConfirmPassword) {
                this.props.navigation.navigate("Profile", { pd:value,ld:value2 })
            }
            else {
                alert("password missmatch")
            }
        }
    }



    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#004898" />
                </View>
            )
        }
        else {
            return (
                <ScrollView style={styles.scrollcontainer}>
                    {this.getType()}
                </ScrollView>
            );
        }
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