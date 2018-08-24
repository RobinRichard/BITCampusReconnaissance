import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { Header, Body, Title, Content, Left, Icon, Right } from 'native-base'

class CustomHeader extends Component {
    render() {
        return (
            <Header style={styles.header}>
                <Left><Icon style={styles.headerMenu} name="menu" onPress={() => this.props.drawerOpen()} /></Left>
                <Body>
                    <Title>{this.props.title}</Title>
                </Body>
                <Right />
            </Header>
        );
    }
}
export default CustomHeader;

const styles = StyleSheet.create({
    header: {
        paddingTop: 20,
        height: 80
    },
    headerMenu: {
        color: 'white'
    }
})