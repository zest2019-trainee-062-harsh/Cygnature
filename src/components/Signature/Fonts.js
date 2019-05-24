import React, {Component} from 'react'
import {View, TextInput, StyleSheet, ScrollView, Text,} from 'react-native'

 
class Fonts extends Component {
    constructor(props) {
        super(props)
       
    } 
    static navigationOptions = {
        title: "Fonts"
    }


    state = {
        name: null
    }

     render() {
         return (
             <View style={styles.mainContainer}>
                <TextInput
                    placeholderTextColor='grey'
                    placeholder="Input text"
                    returnKeyType="go"
                    underlineColorAndroid="black"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={text => this.setState({name:text})}
                    style= { styles.boxTI }>
                </TextInput>
                <ScrollView>
                    <Text style={{ color:'black', fontFamily: 'Iowan Old Style' }}>{this.state.name}</Text>
                    <Text style={{ color:'black',fontFamily: 'notoserif' }}>{this.state.name}</Text>
                    <Text style={{ color:'black',fontFamily: 'sans-serif' }}>{this.state.name}</Text>
                    <Text style={{ color:'black',fontFamily: 'serif' }}>{this.state.name}</Text>
                    <Text style={{ color:'black',fontFamily: 'Roboto' }}>{this.state.name}</Text>
                    <Text style={{ color:'black',fontFamily: 'monospace' }}>{this.state.name}</Text>
                    <Text style={{ color:'black',fontFamily: 'sans-serif-condensed' }}>{this.state.name}</Text>
                    <Text style={{ color:'black',fontFamily: 'sans-serif-light' }}>{this.state.name}</Text>
                </ScrollView>
             </View>
                )
         }
     }

export default Fonts



const styles = StyleSheet.create({
    mainContainer: {
        borderWidth:1,
        flex:1,
        backgroundColor: 'white',
        margin: 7, 
        borderWidth: 2,
        borderRadius:5,
        borderColor: "#003d5a",
        padding: 10
    },
    boxTI: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 20,
        marginBottom: 15,
        fontSize: 12,
        borderRadius: 30,
        fontFamily: 'Helvetica'
    },
})