import React, { Component } from 'react'
import { StyleSheet,Text, View, Dimensions, TouchableOpacity, ActivityIndicator, } from 'react-native'
import { TextInput } from 'react-native-paper';

var width = Dimensions.get('window').width
var height = Dimensions.get('window').height

export default class DocumentVerify extends Component {
    constructor(props) {
        super(props)
        }
    
        state= {
            pdVisible: false,
            fileName: "",
        }

        upload = async() => {
        
            let auth = await AsyncStorage.getItem("auth")
    
            DocumentPicker.show({
                filetype: [DocumentPickerUtil.allFiles()],
                },(error,res) => {
                  
                    if(error) {
                        //console.warn("ERROR"+error)
                        this.setState({fileName: 'No file selected'})
                    }
                    else {
                        //console.warn("Response"+res)
                        this.setState({pdVisible: true, fileName: res.fileName})
    
                        const formData = new FormData()
                        formData.append('file',{
                            
                         uri: res.uri,
                         type: res.type,
                         name: res.fileName,
                        })
                        //console.warn(res.uri+res.type+res.fileName)
                        //console.warn(formData)
                        
                             
                     return fetch('http://cygnatureapipoc.stagingapplications.com/api//verify/document-upload',{
                     method: 'POST',
                     headers: {
                         'Authorization':auth,
                     },
                     body: formData
                     }
                     ).then((response) => response.json())
                     .then((responseJson) => {
                         
                         this.setState({pdVisible: false})
                         //console.warn(responseJson["data"][0])
                         this.refs.myModal.close()
                         this.props.parentFlatList.showData(responseJson["data"][0])
                     
                     })
                     .catch((error) => {
                         // this.refs.myModal.close();
                         // Alert(error.message);
                         console.warn(error.message)
                     });      
                    }
                 
    
    
       
              });
        }
        
  render() {
    return (
    <View style={styles.mainContainer}>
      <View >
        <Text>Document Hash</Text>
        <TextInput
         textAlignVertical='top'
                    placeholderTextColor='black'
                    keyboardType="name-phone-pad"
                    placeholder = "Enter hashcode"
                    returnKeyType="done"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.boxTI} 
        />
        <TouchableOpacity><Text>Search</Text></TouchableOpacity>
      </View>

      <View >
        <Text>Transaction Hash</Text>
        <TextInput
         textAlignVertical='top'
                    placeholderTextColor='black'
                    keyboardType="name-phone-pad"
                    placeholder = "Enter hash code"
                    returnKeyType="done"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.boxTI} 
        />
        <TouchableOpacity><Text>Search</Text></TouchableOpacity>
      </View>

        
            <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
            
             <Icon name="md-cloud-upload" color='black' size={100} />
             <Text style={{fontSize: 18,  color: 'red' ,}}>{this.state.fileName}</Text>
             <Text style={{fontSize: 18,  color: 'black', fontWeight:'bold'}}>Upload a document to verify</Text>
             {this.state.pdVisible ? <ActivityIndicator color='#003d5a' size="large" /> : null}

             <TouchableOpacity style={ styles.btnSave } onPress={this.upload}>
                    <Text style={styles.textSave}>Choose File</Text>
            </TouchableOpacity>

            </View>
       
    </View>
    )
  }
}
const styles = StylesSheet.create({
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
        margin: 5,
        fontSize: 12,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        fontFamily: 'Helvetica'
    },
})
