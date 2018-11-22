import React, { Component } from "react";
import { StyleSheet, View, Image, ToastAndroid, SafeAreaView, ActivityIndicator } from 'react-native';

import { Button, Text } from 'native-base';

import ImagePicker from "react-native-image-picker";
import RNFetchBlob from 'rn-fetch-blob';

const options = {
    title: 'Select Photo',
    takePhotoButtonTitle: "Take a photo",
    chooseFromLibraryButtonTitle: "Choose from gallery ",
    quality: 1
};

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            imageSource: null,
            data: null,
            isLoading: true
        }
    }

    componentWillMount() {
        const { navigation } = this.props;
        this.setState({
            v1 : navigation.getParam('pd'),
            v2 : navigation.getParam('ld')
        }, function () {
            var value = this.state.v1
            var value2 = this.state.v2
             return fetch(global.url + '/api/addUser?type=reg&user_name=' + value['Name'] + '&user_mail=' + value['Email'] + '&user_password=' + value['Password'] + '&user_department=' + value2['Course'] + '&user_rollno=' + value2['ID'] + '&user_phone=' + value2['Phone'] + '&user_address=' + value2['Address'])
                    .then((response) => response.json())
                    .then((responseJson) => {
                        if (responseJson['status'] == 1) {
                            alert('Registration finished')
                            this.setState({
                                uid : responseJson['user_id'],
                                isLoading : false
                            })
                        }
                        if (responseJson['status'] == 0) {
                            this.props.navigation.navigate("SignIn")
                            alert('Registration Failed')
                        }
                    })
                    .catch((error) => {
                        alert('Error:' + error)
                    });

        })
    }


    selectPhoto = () => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.error) {
                alert('ImagePicker Error : ' + response.error)
            }
            else {
                if (response.uri !== undefined) {
                    let source = { uri: response.uri };

                    this.setState({
                        imageSource: source,
                        data: response.data,
                        filetype: response.type,
                        filename: response.fileName,
                    });
                }
            }
        });

    }

    uploadPhoto = () => {
        this.setState({
            isLoading: true
        }, function () {
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
                        alert('profile picture uploded')
                    }
                    if (resdata['status'] == 0) {
                        alert('Erroro while uploading image')
                    }
                }).catch((err) => {
                    alert('Server error : ' + err)
                })
        });
    }

    RemovePhoto = () => {
        this.setState({
            imageSource: null
        })
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
                <SafeAreaView style={styles.container}>
                    <Text style={{ fontSize: 20, textAlign: 'center', margin: 10, }} >Upload Your Profile Picture Here</Text>
                    <Image style={{ width: '80%', height: '50%' }} source={this.state.imageSource != null ? this.state.imageSource :
                        require('../Images/upload.png')}>
                    </Image>
                    <View style={{ flexDirection: 'row', padding: 10, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Button onPress={()=> this.props.navigation.navigate("SignIn")} style={{ margin: 5 }} info><Text>Skip</Text></Button>

                        {this.state.imageSource == null ? <Button onPress={() => this.selectPhoto()} style={{ margin: 5 }} info><Text>Select</Text></Button> : null}

                        {this.state.imageSource != null ? <Button onPress={() => this.RemovePhoto()} style={{ margin: 5 }} danger><Text>Clear</Text></Button> : null}

                        {this.state.imageSource != null ? <Button onPress={() => this.uploadPhoto()} style={{ margin: 5 }} info><Text>Upload</Text></Button> : null}
                    </View>
                </SafeAreaView>
            );
        }
    }
}
export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});