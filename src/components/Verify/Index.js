import React, {Component} from 'react'
import {View, StyleSheet, Text,TextInput, TouchableOpacity,AsyncStorage, ActivityIndicator} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'

export default class Index extends Component {
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
            if(responseJson["message"]) {
                alert(responseJson["message"])
            }
            else {
                if(responseJson["data"][0]["totalRows"] > 1){
                    this.showData(responseJson["data"][0]["documentList"])
                }
                else{
                    
                    this.verifydetail(responseJson["data"][0]["documentList"][0]["Id"])          
                }
            }
            
        })
        .catch((error) => {
            console.warn(error.message);
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
            //console.warn(responseJson)
            //console.warn(responseJson["data"][0])
            if(responseJson["message"]) {
                alert(responseJson["message"])
            }
            else this.props.navigation.navigate('VerifyDetails',{'data':responseJson["data"][0]})
            
        })
        .catch((error) => {
            console.warn(error.message);
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
            <View style={styles.box}>
                <Text style= {{fontWeight: "bold", fontSize: 22, color: "black"}}>Document Hash</Text>
                <TextInput
                    placeholderTextColor='grey'
                    placeholder = "Enter hashcode"
                    onChangeText = {text => this.update("fileHash",text)} 
                    value = {this.state.fileHash}     
                    returnKeyType="next"
                    style={styles.boxTI} 
                />
                <TouchableOpacity style={styles.btnSave} onPress={this.search}>
                    <Text style={styles.textSave}>Search</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.box}>
                <Text style= {{fontWeight: "bold", fontSize: 22, color: "black"}}>Transaction Hash</Text>
                <TextInput
                    placeholderTextColor='grey'
                    placeholder = "Enter hashcode"
                    onChangeText = {text => this.update("transactionHash",text)}
                    value = {this.state.transactionHash}
                    returnKeyType="next"
                    style={styles.boxTI} 
                />
                <TouchableOpacity style={styles.btnSave} onPress={this.search2}>
                    <Text style={styles.textSave}>Search</Text>
                </TouchableOpacity>
            </View>
     
            <View style={{flex:1, justifyContent: "center", alignItems: "center",marginTop:20}}>
                <Icon name="md-cloud-upload" color='#003d5a' size={70} />
                <Text style={{fontSize: 22,  color: 'black', fontWeight:'bold'}}>Upload a document to verify</Text>
                
                {this.state.pdVisible ? <ActivityIndicator color='#003d5a' size="large" /> : null}

                <Text style={{fontSize: 20,  color: 'red' ,}}>{this.state.fileName}</Text>

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
        margin: 15,
        fontSize: 12,
        borderRadius: 30,
        borderWidth:1,
        fontFamily: 'Helvetica',
        fontSize:20
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
    },
    box: { 
        margin: 5,
        padding: 5,
    },
})