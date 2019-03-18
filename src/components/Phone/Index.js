import React, { Component } from 'react'
import { StyleSheet,Text, View, TextInput } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Index extends Component {
    
    state = {
        data: [],
        countryCode: [],
    };

    validations(text, value)
    {
        switch(value) {
        
        case "phone" : {
        this.setState({rPhone: text})
                console.warn(this.state.rPhone)
                if(this.state.rPhone==" " || this.state.rPhone==null)
                {
                    //this.setState({rPhone: " "})
                } else {
                    this.setState({rPhone: text})
                }
                return
            }
        }
    }
    componentWillMount(){
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/setting/get/', {
            method: 'GET',
            }).then((response) => response.json())
            .then((responseJson) => {
        
                this.setState({data : responseJson["data"][0]["countries"]})
                //console.warn(this.state.data)
                this.state.data.map((y) => {
                    this.state.countryCode.push(y.countryCode)
                })
                console.warn(this.state.countryCode)
            })
            .catch((error) => {
                console.warn(error);
            });

    }
    onChangeHandler = (value) => {
        console.warn("Selected value = ", value);
      }


  render() {
        
    return (
      <View style={styles.container}>
      
      <View style={styles.boxtop}>
        <Dropdown
                value="+91"
                data = {this.state.data}
                valueExtractor = {({countryCode}) => countryCode}
                onChangeText = {value => this.onChangeHandler(value)}
                selectedItemColor = "red"
            />
        </View>
         <View style={styles.box3}>
        <TextInput
                placeholderTextColor='grey'
                keyboardType="numeric"
                placeholder = "Phone Input *"
                returnKeyType="go"
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={10}
                onChangeText={text => this.validations(text, "phone")}
                ref={(input) => this.REGInput5 = input
                }
                style= { styles.boxTI }>
        </TextInput>
        </View>  
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        padding:30,
        marginBottom: 70,
        //width:200,
        flex:1,
        flexDirection:"row",
    },
    boxtop: {
        flex:0.2,
        //width: 70,
        // flexDirection:"row"
    },
    box3: {
        flex:0.8,
        //width:150,
        paddingTop: 20,


    },
    boxTI: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 20,
        marginBottom: 15,
        fontSize: 12,
        borderRadius: 50,
        fontFamily: 'Helvetica'
    },
})
