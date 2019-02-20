import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, KeyboardAvoidingView} from 'react-native'

import { Dimensions } from "react-native";
import Form from './Form';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
class Login extends Component {
   render() {
         return (
            
            <KeyboardAvoidingView behavior="padding" style={styles.container}> 
            
            <View style={styles.logoContainer}>
                <Image
                source={require('../../../img/logo.png')}
                />
                <Text style = { styles.boxTitle }>Login to your account</Text>
                
            </View>
            <View style={ styles.formContainer }>
                <Form />
            </View>           
        </KeyboardAvoidingView>
            
                )
         }
     }

export default Login

const styles = StyleSheet.create({
    bkImg: {
        width: width,
        height: height,
        resizeMode: 'cover'
    },
    container: {
        backgroundColor: '#7f8fa6',
        width: width,
        height: height
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    boxTitle: {
        margin: 10,
        fontSize: 22,
        color: '#003d5a'
    },

})