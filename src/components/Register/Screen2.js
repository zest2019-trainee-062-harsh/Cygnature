import React, {Component} from 'react'
import {View, Text, TouchableOpacity,TextInput, StyleSheet, Image,} from 'react-native'
const util = require('util');

import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


class Screen2 extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        register: null,
        message: ''
    }

     render() {
         return (
             


<View style={{flex: 1}}>
            <View style={{width: width, height: height - 90}}>
            
            <View style={styles.container}>
            
            <Image
                source={require('../../../img/logo.png')}
                />
            <Text style = { styles.boxTitle }>Work Details</Text>

            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ultraviolet/2x/new-job.png'}}/>
                <TextInput style= { styles.inputs }
                     returnKeyType="next"
                     placeholder="Job Title"
                     placeholderTextColor="gray"
                     underlineColorAndroid='transparent'
                     autoCapitalize="none"
                     autoCorrect={false}

                />
                </View>
                <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ultraviolet/2x/new-company.png'}}/>
                <TextInput style= { styles.inputs }
                     returnKeyType="next"
                     placeholder="Company Name"
                     placeholderTextColor="gray"
                     underlineColorAndroid='transparent'
                     autoCapitalize="none"
                     autoCorrect={false}
                     
                />
                </View>
                <Text>PLACE PHONE NUMBER INPUT HERE</Text>

            </View>
            </View>{/* Main container end */}


            <View style={{width: width, height: 200}}>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={_ => this.reg()} style={{backgroundColor:'blue', margin: 10}}>
                <Text style={styles.signUpText}>Done</Text>
                </TouchableOpacity>
            </View>
            
            </View>
        </View>
                )
         }
     }

export default Screen2

const styles = StyleSheet.create({
    container: {
        marginTop: -110,
        backgroundColor: '#A3CB38',
        width: width,
        height: height,
        resizeMode: 'cover',
        justifyContent:'center',
        alignItems:'center',
        flex: 1
    },
    inputContainer: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius:40,
        width:width,
        height:45,
        marginBottom:10,
        marginTop:10,
        flexDirection: 'row',
        alignItems:'center',
    },
    error: {
        color: 'red'
    },
    inputs: {
    
        height:height,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
        fontSize: 20,
    },
    inputIcon:{
        width:25,
        height:25,
        marginLeft:15,
        justifyContent: 'center'
      },
    boxTitle:{
        margin: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width:width,
        backgroundColor: "#833471",
        
      },
      signUpText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize:25,
        width:110,
        height:50,
        textAlignVertical: 'center',
        
      }
})