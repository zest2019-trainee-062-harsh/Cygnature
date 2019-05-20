import React, { Component } from 'react'
import { StyleSheet,Text, View,ScrollView, Dimensions ,TouchableOpacity,Image,AsyncStorage} from 'react-native'
import fetch_blob from 'rn-fetch-blob';
import Icon1 from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';

var height = Dimensions.get('window').height; //full height

export default class DocumentCertificate extends Component {

    constructor(props){
        super(props)
            this.state.data  = this.props.navigation.getParam('data');
    }

    static navigationOptions = {
        header:null
    }
    state = {
        data: [],
        Id:"",
        pdVisible:true,
        newData: ""
    }

    download = () => {
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/certificate-download/'+this.state.Id, {
        method: 'GET',
        headers: {
            'Authorization': this.state.auth,
        },
        }).then((response) => response.json())
        .then((responseJson) => {
            
            const fs = fetch_blob.fs
            const dirs = fetch_blob.fs.dirs 
            const file_path = dirs.DownloadDir + "/" + "Certficiate_"+this.state.data["documentDetail"]["fileName"]+"_"+this.state.data["documentDetail"]["creationTime"]
            
            RNFS.writeFile(file_path, responseJson["data"][0], 'base64')
                .then((success) => {
                    alert('Document Saved!');
                })
                .catch((error) => {
                    alert(JSON.stringify(error.message));
            });
        })
        .catch((error) => {
            console.warn(error);
        });
    }
    
    
    componentWillMount = async() =>{
        this.state.auth = await AsyncStorage.getItem('auth');
        this.setState({Id: this.state.data["documentDetail"]["Id"]})
    }

    
  render() {
    return (
      <View style={styles.mainContainer}>

    <Image source={{uri: `data:image/gif;base64,${this.state.data['documentHistory'][0]["profileImage"]}`}} />
      
      <TouchableOpacity style={styles.floatButton} onPress={this.download}>
        <Icon1
            name="md-cloud-download"
            size={25}
            color="white"
        />
      </TouchableOpacity>        
     </View>
    )}
}
    
const styles = StyleSheet.create({
    mainContainer:{
        height: height*0.87,
        margin: 7,
        borderWidth: 2,
        borderRadius:5,
        borderColor: "#003d5a",
        padding: 10,
        backgroundColor: "white"
    },
    floatButton: {
        position: 'absolute',
        width:50,
        height: 50,
        backgroundColor: '#003d5a',
        borderRadius: 30,
        bottom: 20,
        right: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    floatButtonText: {
        color: 'white',
        fontSize: 25    
    },
    header:{
        height: 100,
        backgroundColor:"#003d5a",
        borderRadius:5,
        marginLeft:-12,
        marginRight:-12,
        marginTop:-12
    },
    DocumentsList:{
        color:"black",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5
    },
    DocumentsListFont:{
        color: "black",
        fontSize: 14
    },
    box: { 
        marginTop: 25,
        margin: 10,
        borderRadius:5,
        borderColor: "#003d5a",
        borderWidth: 2,
        borderWidth: 2,
    },
    rowDataBg: {
        position: 'absolute',
        width:25,
        height: 25,
        backgroundColor: '#003d5a',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowDataText1: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
        borderRadius: 5,
    },
    buttonContainer: {
        //flex: 0.5,
        backgroundColor: '#003d5a',
        margin: 20,
        height:40,
        justifyContent: 'center',
        borderRadius:10
    },
    buttonText: {
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
})
