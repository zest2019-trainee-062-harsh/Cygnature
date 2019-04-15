import React, {Component} from 'react'
import {View, StyleSheet,TextInput, Dimensions} from 'react-native'


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
class trys extends Component {
   
     render() {
         return (
             <View style={styles.maincontainer}>
               <TextInput
                        placeholderTextColor='grey'
                        placeholder = ''
                        returnKeyType="next"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onSubmitEditing={() => this.passwordInput.focus()}
                        onChangeText={text => this.validate(text, "email")}
                        style= { styles.boxTI }>
                    </TextInput>

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
   
})