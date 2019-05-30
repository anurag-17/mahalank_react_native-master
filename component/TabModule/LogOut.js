import React, { Component } from 'react';
import { StyleSheet, View, Text,AsyncStorage,Button,Alert } from 'react-native';

export default class LogOut extends Component {
    constructor() {
        super();
        
      }
    setlog = () => {
        AsyncStorage.setItem('session_is', '');
        AsyncStorage.clear();
        AsyncStorage.setItem('user_email', '')
        AsyncStorage.setItem('ID', '')
        AsyncStorage.setItem('user_login', '')
        this.props.navigation.navigate('LoginHome')
    }
    Logout = () => {
        Alert.alert(
            '',
            'Are you sure you want to log out?',
            [
                { text: 'Cancel', onPress: () => { cancelable: false }, style: 'cancel' },
                { text: 'OK', onPress: () => this.setlog() },
            ],
            { cancelable: false }
        )
    }
    render() {
        return (
            <View style={styles.MainContainer}>
                <Button color="#421a8d" title="Log out" onPress={() => this.Logout()} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        marginTop: 50,
        justifyContent: 'center',
    },
});