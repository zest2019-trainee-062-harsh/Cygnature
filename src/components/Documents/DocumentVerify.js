import React, {Component} from 'react'
import {View, StyleSheet, Text,TextInput, TouchableOpacity, ScrollView,AsyncStorage,Clipboard, ActivityIndicator} from 'react-native'
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
        
        async _getContent() {
            var content = await Clipboard.getString();
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
      
        <Text  style= {{textDecorationColor:'black', fontWeight:'bold'}}>Document Hash</Text>
        <View style={styles.textcontain}>
        <TextInput
                    
                    placeholderTextColor='black'
                    keyboardType="default"
                    placeholder = "Enter hashcode"
                    placeholderTextColor ="grey"
                    returnKeyType="next"
                    style={styles.boxTI} 
        />
        <TouchableOpacity style={styles.paste} onPress={this._getContent}><Text>Paste</Text></TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.search} onPress={this.search}><Text>Search</Text></TouchableOpacity>
    

      
        <Text style= {{textDecorationColor:'black', fontWeight:'bold'}}>Transaction Hash</Text>
        <TextInput
         
                        placeholderTextColor='grey'
                        placeholder = "enter hash code"
                        returnKeyType="next"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style= { styles.boxTI }>

                        </TextInput>

        <TouchableOpacity style={styles.search}><Text>Search</Text></TouchableOpacity>
     

        
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
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 20,
        marginBottom: 15,
        marginLeft:2,
        fontSize: 12,
        borderRadius: 30,
        fontFamily: 'Helvetica',
        borderWidth: 1,
        width:150,
        flex: 1,
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
    textcontain:{
        flex: 1,
        flexDirection: 'row',
    },
    paste:{
        borderWidth:1,
        borderColor:'black',
        borderRadius:8,   
        flex:0.2,
        height:30,
        marginTop:20,
        textAlign:'center',
        backgroundColor:'#003d5a',
        justifyContent:'center'
    }
})
