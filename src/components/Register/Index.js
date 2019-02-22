import React, {Component} from 'react'
import {View, Text, Button} from 'react-native'
 
class Register extends Component {

    reg() {
        firstname = "Harsh"
        lastname = "Bhatia"
        email = "yjyjessoss-3180@yopmail.com"
        password = "Test@123"
        confirmPassword = "Test@123"
        jobTitle = "intern"
        companyName = "cygnet"
        countryId = "91"
        phoneNumber = "8905003200"
        userLatitude = "4.092356",
        userLongitude = "-56.062161",
        userAgent = "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0 Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0",
        userTimeZoneOffSet = "+05:30"

        console.warn(firstname,lastname,email,password,confirmPassword,jobTitle,countryId,
            phoneNumber,userLatitude,userLongitude,userAgent,userTimeZoneOffSet)


            return fetch('http://cygnatureapipoc.stagingapplications.com/api//account/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                jobTitle: jobTitle,
                companyName: companyName,
                countryId: countryId,
                phoneNumber: phoneNumber,
                userLatitude: userLatitude,
                userLongitude: userLongitude,
                userAgent: userAgent,
                userTimeZoneOffSet: userTimeZoneOffSet
            }),
        }).then((response) => response.json())
        .then((responseJson) => {
            console.warn(responseJson["message"])
            
        })
        .catch((error) => {
            console.warn(error);
        });


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