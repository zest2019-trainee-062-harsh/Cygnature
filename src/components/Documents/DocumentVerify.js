import React, {Component} from 'react'
import {View, StyleSheet, Text,TextInput, TouchableOpacity, ScrollView,AsyncStorage, ActivityIndicator} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'


export default class DocumentVerify extends Component {
    constructor(props) {
        super(props)
        }
        
        state= {
            data : {},
            pdVisible: false,
            fileHash: "",
            auth: null
        }
        

        search = async() => {
            let auth = await AsyncStorage.getItem("auth")
            return fetch('http://cygnatureapipoc.stagingapplications.com/api/verify/search-by-hash',{
                method: 'POST',
                headers: {
                    'Authorization':this.state.auth,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "fileHash": this.state.fileHash,
                    "transactionHash": null,
                    "currentPage": 0,
                }),
                }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({data: responseJson["data"]})
                    console.warn(this.state.data)
                })
                .catch((error) => {
                    console.warn(error);
                });
              }
    
        
  render() {
    return (  
        <View style={styles.mainContainer}>
        <ScrollView>
      <View style= {{marginTop:25}}>
        <Text  style= {{textDecorationColor:'black', fontWeight:'bold'}}>Document Hash</Text>
        <TextInput
                    
                    placeholderTextColor='black'
                    keyboardType="default"
                    placeholder = "Enter hashcode"
                    placeholderTextColor ="grey"
                   
                    style={styles.boxTI} 
        />
        <TouchableOpacity style={styles.search} onPress={this.search}><Text>Search</Text></TouchableOpacity>
      </View>

      <View style= {{marginTop:15}}>
        <Text style= {{textDecorationColor:'black', fontWeight:'bold'}}>Transaction Hash</Text>
        <TextInput
         
         placeholderTextColor='grey'
                        placeholder = "Email"
                        returnKeyType="next"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style= { styles.boxTI }>

                        </TextInput>

        <TouchableOpacity style={styles.search}><Text>Search</Text></TouchableOpacity>
      </View>

        
            <View style={{flex:1, justifyContent: "center", alignItems: "center",marginTop:40}}>
            
             <Icon name="md-cloud-upload" color='#003d5a' size={70} />
             
             <Text style={{fontSize: 15,  color: 'black', fontWeight:'bold'}}>Upload a document to verify</Text>
             {this.state.pdVisible ? <ActivityIndicator color='#003d5a' size="large" /> : null}

             <Text style={{fontSize: 15,  color: 'red' ,}}>{this.state.fileName}</Text>

             <TouchableOpacity style={ styles.btnSave } onPress={this.upload}>
                    <Text style={styles.textSave}>Choose File</Text>
            </TouchableOpacity>

            </View>
            </ScrollView> 
    </View>
       
    
    )
  }
}
const styles = StyleSheet.create({
    mainContainer:{
        borderWidth:1,
        borderColor:'#003d5a',
        flex:1,
        backgroundColor: 'white',
        margin: 7, 
        borderWidth: 2,
        borderRadius:5,
        borderColor: "#003d5a",
        padding: 10
    },
    boxTI: {
        margin: 3,
        fontSize: 12,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        fontFamily: 'Helvetica',
    },
    search: {
        textAlign:'center',
        alignItems:'center',
        fontWeight:'bold',
        marginTop:5
    },
    btnSave: {
        backgroundColor: '#003d5a',
        marginLeft: "25%",
        marginRight: "25%",
        height:40,
        marginTop: 20,
        padding: 20,
        justifyContent: 'center',
        borderRadius: 5
    },
    textSave: {
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
})
