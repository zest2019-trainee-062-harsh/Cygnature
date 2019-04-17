import React, {Component} from 'react'
import {View, StyleSheet, Text,TextInput, TouchableOpacity,AsyncStorage, ActivityIndicator} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'

export default class DocumentVerify extends Component {
    constructor(props) {
        super(props)
    }
        
    state= {
        data : [],
        pdVisible: false,
        fileHash: null,
        transactionHash: null,
        auth: null,
        token:null,
        documentList: [],
        totalRows: [],  
    }

    componentWillMount = async() =>{
        this.state.auth = await AsyncStorage.getItem('auth')
    }
       
        
    search = () =>{    
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
            if(responseJson["data"][0]["totalRows"] > 1){
                this.showData(responseJson["data"][0]["documentList"])
            }
            else{
                
                this.verifydetail(responseJson["data"][0]["documentList"][0]["Id"])          
            }
            
        })
        .catch((error) => {
            console.warn(error);
        });
    }

    search2 = () =>{
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/verify/search-by-hash',{
        method: 'POST',
        headers: {
            'Authorization':this.state.auth,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "fileHash": null,
            "transactionHash": this.state.transactionHash,
            "currentPage": 0,
        }),
        }).then((response) => response.json())
        .then((responseJson) => {
           
            this.props.navigation.navigate('VerifyDetails',{'data':responseJson["data"][0]})
            
        })
        .catch((error) => {
            console.warn(error);
        });
    }

    update=(value, text)=> {
        switch(value) {
            case "fileHash": {
                this.setState({fileHash: text})
                return
            }
            case "transactionHash": {
                this.setState({transactionHash: text})
                return
            }
        }
    }

    upload = async() => {

        let auth = await AsyncStorage.getItem("auth")

        DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()],
            },(error,res) => {
                
                if(error) {
                    
                    this.setState({fileName: 'No file selected'})
                }
                else {
                   
                    this.setState({pdVisible: true, fileName: res.fileName})

                    const formData = new FormData()
                    formData.append('file',{
                        
                        uri: res.uri,
                        type: res.type,
                        name: res.fileName,
                    })
                            
                    return fetch('http://cygnatureapipoc.stagingapplications.com/api/verify/document-upload',{
                    method: 'POST',
                    headers: {
                        'Authorization':auth,
                    },
                    body: formData
                    }
                    ).then((response) => response.json())
                    .then((responseJson) => {
                       
                        if(responseJson["data"][0]["totalRows"] > 1){
                            this.showData(responseJson["data"][0]["documentList"])
                        }
                        else{
                            
                            this.verifydetail(responseJson["data"][0]["documentList"][0]["Id"])          
                        }
                    
                    })
                    .catch((error) => {
                        
                        console.warn(error.message)
                    });      
                }
    
            });
    }

    showData = (data) => {
        if(data == null)
        {
            console.warn("no data")
        }else {
            
            this.props.navigation.navigate('DocumentList',{'data':data})
        }
    }
   


    verifydetail = (id) => {
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/verify/document-detail/'+id,{
        method: 'GET',
        headers: {
            'Authorization': this.state.auth
        }}).then((response) => response.json())
        .then((responseJson) => {
           
             this.props.navigation.navigate('VerifyDetails',{'data':responseJson["data"][0]})
        })
        .catch((error) => {
            console.warn(error);
        });
    }
            
        
  render() {
    return (  
        <View style={styles.mainContainer}>
        
      
        <Text  style= {{textDecorationColor:'black', fontWeight:'bold'}}>Document Hash</Text>
      
        <TextInput
                    
                    placeholderTextColor='grey'
                    keyboardType="default"
                    placeholder = "Enter hashcode"
                    onChangeText = {text => this.update("fileHash",text)} 
                    value = {this.state.fileHash}     
                    returnKeyType="next"
                    style={styles.boxTI} 
        />
     
        <TouchableOpacity style={styles.search} onPress={this.search}><Text>Search</Text></TouchableOpacity>
    

      
        <Text style= {{textDecorationColor:'black', fontWeight:'bold'}}>Transaction Hash</Text>
        <TextInput
         
                    placeholderTextColor='grey'
                    keyboardType="default"
                    placeholder = "Enter hashcode"
                    onChangeText = {text => this.update("transactionHash",text)}
                    value = {this.state.transactionHash}
                    returnKeyType="next"
                    style={styles.boxTI} 

                        />

        <TouchableOpacity style={styles.search} onPress={this.search2}><Text>Search</Text></TouchableOpacity>
     

        
            <View style={{flex:1, justifyContent: "center", alignItems: "center",marginTop:40}}>
            
             <Icon name="md-cloud-upload" color='#003d5a' size={70} />
             
             <Text style={{fontSize: 15,  color: 'black', fontWeight:'bold'}}>Upload a document to verify</Text>
             {this.state.pdVisible ? <ActivityIndicator color='#003d5a' size="large" /> : null}

             <Text style={{fontSize: 15,  color: 'red' ,}}>{this.state.fileName}</Text>

             <TouchableOpacity style={ styles.btnSave } onPress={this.upload}>
                    <Text style={styles.textSave}>Choose File</Text>
            </TouchableOpacity>

            </View>
            
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
        marginBottom: 10,
        marginTop:10,
        marginLeft:2,
        fontSize: 12,
        borderRadius: 30,
        fontFamily: 'Helvetica',
        borderWidth: 1,
        width:300,
        flex: 0.2,
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