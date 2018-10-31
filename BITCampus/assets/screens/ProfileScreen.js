import React, { Component } from "react";
import { StyleSheet, View, Image, ToastAndroid, SafeAreaView } from 'react-native';

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
            data: null
        }
    }

componentWillMount() {
    const { navigation } = this.props;
     this.setState({
        uid: navigation.getParam('id')
  })
}
    

    selectPhoto() {
        ImagePicker.showImagePicker(options, (response) => {
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
                });
            }
        });

    }

    uploadPhoto() {

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

    RemovePhoto() {
        this.setState({
            imageSource: null
        })
    }
    render() {

        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ fontSize: 20, textAlign: 'center',margin: 10,  }} >Upload Profile Picture</Text>
                <Image style={{ width: '80%', height: '50%' }} source={this.state.imageSource != null ? this.state.imageSource :
                    require('../Images/upload.png')}>
                </Image>
                <View style={{ flexDirection: 'row', padding: 10, width: '100%', justifyContent: 'center', alignItems: 'center' }}>

                    {this.state.imageSource == null ? <Button onPress={this.selectPhoto.bind(this)} style={{ margin: 5 }} info><Text>Select</Text></Button> : null}

                    {this.state.imageSource != null ? <Button onPress={this.RemovePhoto.bind(this)} style={{ margin: 5 }} danger><Text>Clear</Text></Button> : null}

                    {this.state.imageSource != null ? <Button onPress={this.uploadPhoto.bind(this)} style={{ margin: 5 }} info><Text>Upload</Text></Button> : null}
                </View>
            </SafeAreaView>
        );
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