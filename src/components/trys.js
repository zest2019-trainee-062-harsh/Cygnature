import React, {Component} from 'react'
import {View, Image, StyleSheet, Dimensions, ImageBackground} from 'react-native'
import CustomText from './customtext.js';

import Draggable from 'react-native-draggable';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
class trys extends Component {
    state =  {
        X : -100,
        x : 50,
        y: 150,
        image: require('../../img/download.png')
    }

    click () {
        //console.warn("ss")
        this.setState({image: require('../../img/logo.png')})
        
    }
     render() {
         return (
             <View style={styles.maincontainer}>
               <ImageBackground style={styles.logoContainer}
                    source={require('../../img/download.png')}
                >
                               
<Draggable 
renderSize={70} 
renderShape='image' 
imageSource = {this.state.image}
 x={this.state.x}
 y={this.state.y}
  renderText='Click here to sign\nTEST'
  pressDragRelease={_=> this.click()}/> 
        

            </ImageBackground>
             </View>
                )
         }
     }

export default trys

const styles = StyleSheet.create({
    container: {
        padding:30,
        marginBottom: 70
    },
    boxLabel: {
        fontSize: 18,
        fontStyle: 'italic',
        color: 'white',
        textAlign: 'center'
    },
    boxTI: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 20,
        marginBottom: 15,
        fontSize: 12,
        borderRadius: 30,
        fontFamily: 'Helvetica'
    },
    buttonContainer: {
        backgroundColor: '#6eab52',
        paddingVertical: 10,
        margin: 5,
        height:50,
        borderRadius: 5
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
    bkImg: {
        width: width,
        height: height,
        resizeMode: 'cover'
    },
    maincontainer: {
        backgroundColor: '#414345',
        width: width,
        height: height,
        flex:1 ,
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
    }
})