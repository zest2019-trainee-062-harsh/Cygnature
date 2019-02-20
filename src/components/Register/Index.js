import React, {Component} from 'react'
import {View, Text, Button} from 'react-native'
 
class Register extends Component {

    reg() {
        firstname
        lastname
        email
        password
        confirmPassword
        jobTitle
        companyNam
        countryId
        phoneNumber
        userLatitude = "4.092356",
        userLongitude = "-56.062161",
        userAgent = "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0 Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0",
        userTimeZoneOffSet = "+05:30"
    }


     render() {
         return (
             <View>
                <Button title="call" onPress={_ =>this.reg()} />
             </View>
                )
         }
     }

export default Register