import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator, TouchableWithoutFeedback, StatusBar, Animated, Dimensions, SafeAreaView } from 'react-native';
import{Icon } from 'native-base';
let SCREEN_WIDTH = Dimensions.get('window').width
let SCREEN_HEIGHT = Dimensions.get('window').height

class Gallery extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: true,
            activeImage: null,
        }
    }
    componentWillMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => this.onFocus());
        this._navListener2 = this.props.navigation.addListener('didBlur', () => this.onBlur())
        this.allImages = {}
        this.oldPosition = {}
        this.position = new Animated.ValueXY()
        this.dimensions = new Animated.ValueXY()
        this.animation = new Animated.Value(0)
        this.activeImageStyle = null
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
        this._navListener2.remove()
    }

    FetchData() {
        return fetch(global.url + '/api/getGallery')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    imageSource: responseJson,
                }, function () {
                    this.setState({
                        isLoading: false,
                    });
                });
            })
            .catch((error) => {
                alert(error)
            });
    }


    openImage = (index) => {

        this.allImages[index].measure((x, y, width, height, pageX, pageY) => {
            this.oldPosition.x = pageX
            this.oldPosition.y = pageY
            this.oldPosition.width = width
            this.oldPosition.height = height

            this.position.setValue({
                x: pageX,
                y: pageY
            })

            this.dimensions.setValue({
                x: width,
                y: height
            })

            this.setState({
                activeImage: this.state.imageSource[index],
            }, () => {
                this.viewImage.measure((dx, dy, dWidth, dHeight, dPageX, dPageY) => {

                    Animated.parallel([
                        Animated.timing(this.position.x, {
                            toValue: dPageX,
                            duration: 300
                        }),
                        Animated.timing(this.position.y, {
                            toValue: dPageY,
                            duration: 300
                        }),
                        Animated.timing(this.dimensions.x, {
                            toValue: dWidth,
                            duration: 300
                        }),
                        Animated.timing(this.dimensions.y, {
                            toValue: dHeight,
                            duration: 300
                        }),
                        Animated.timing(this.animation, {
                            toValue: 1,
                            duration: 300
                        })
                    ]).start()
                })
            })
        })
    }
    closeImage = () => {
        Animated.parallel([
            Animated.timing(this.position.x, {
                toValue: this.oldPosition.x,
                duration: 300
            }),
            Animated.timing(this.position.y, {
                toValue: this.oldPosition.y,
                duration: 250
            }),
            Animated.timing(this.dimensions.x, {
                toValue: this.oldPosition.width,
                duration: 250
            }),
            Animated.timing(this.dimensions.y, {
                toValue: this.oldPosition.height,
                duration: 250
            }),
            Animated.timing(this.animation, {
                toValue: 0,
                duration: 250
            })
        ]).start(() => {
            this.setState({
                activeImage: null
            })
        })
    }
    render() {
        const activeImageStyle = {
            width: this.dimensions.x,
            height: this.dimensions.y,
            left: this.position.x,
            top: this.position.y
        }

        const animatedContentY = this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [-150, 0]
        })

        const animatedContentOpacity = this.animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 1, 1]
        })

        const animatedContentStyle = {
            opacity: animatedContentOpacity,
            transform: [{
                translateY: animatedContentY
            }]
        }

        const animatedCrossOpacity = {
            opacity: this.animation
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
                <SafeAreaView style={{ flex: 1 }}>
                    <StatusBar backgroundColor='#00121f' barStyle='light-content' />
                    <View key="sticky-header" style={styles.stickySection}>
                        <Image style={{ height: 38, width: 40 }} source={require('../Images/logo_small.png')} /><Text style={styles.stickySectionText}>OTAGO Polytechnic</Text>
                    </View>
                    <ScrollView style={{ flex: 1 }}>
                        {this.state.imageSource.map((image, index) => {
                            return (
                                <TouchableWithoutFeedback
                                    onPress={() => this.openImage(index)}
                                    key={image.id}>
                                    <Animated.View style={{ height: SCREEN_HEIGHT - 150, width: SCREEN_WIDTH, padding: 15 }}>
                                        <Image
                                            ref={(image) => (this.allImages[index] = image)}
                                            source={{ uri: global.url + image.Actual_name }}
                                            style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 5 }}
                                        />
                                    </Animated.View>
                                </TouchableWithoutFeedback>
                            )
                        })}
                    </ScrollView>
                    <View style={StyleSheet.absoluteFill} pointerEvents={this.state.activeImage ? "auto" : "none"}>
                        <View style={{ flex: 2, zIndex: 1001 }} ref={(view) => (this.viewImage = view)}>
                            <Animated.Image
                                source={this.state.activeImage ? { uri: global.url + this.state.activeImage.Actual_name } : null}
                                style={[{ resizeMode: 'cover', top: 0, left: 0, height: null, width: null }, activeImageStyle]}
                            >
                            </Animated.Image>
                            <TouchableWithoutFeedback onPress={() => this.closeImage()}>
                                <Animated.View style={[{ position: 'absolute', top: 30, right: 30,paddingLeft:3,paddingRight:3,backgroundColor:'#fff',borderRadius:5 }, animatedCrossOpacity]}>
                                <Icon type="FontAwesome" style={{ color: 'black'}} name="times" />
                                </Animated.View>
                            </TouchableWithoutFeedback>
                        </View>
                        <Animated.View style={[{ flex: 1, zIndex: 1000, backgroundColor: 'white', padding: 20, paddingTop: 10 }, animatedContentStyle]}>
                            <Text style={{ fontSize: 24, paddingBottom: 10 }}>{this.state.activeImage == null ? '' : this.state.activeImage.file_name}</Text>
                            <Animated.ScrollView>
                                <Text>{this.state.activeImage == null ? '' : this.state.activeImage.description}</Text>
                            </Animated.ScrollView>
                        </Animated.View>
                    </View>
                </SafeAreaView>
            );
        }
    }
}
export default Gallery;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stickySection: {
        height: 55,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        padding: 10,
        flexDirection: 'row'
    },
    stickySectionText: {
        color: '#004898',
        fontSize: 20,
        marginLeft: 10,
        justifyContent: 'center',
        textAlignVertical: 'center'
    }
});