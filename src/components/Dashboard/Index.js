import React, {Component} from 'react'
import {View, StyleSheet,Text, TouchableOpacity, ScrollView, StatusBar, BackHandler, Alert, AsyncStorage,
ActivityIndicator } from 'react-native'
const util = require('util');
import  { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import { Dimensions } from "react-native";
import moment from 'moment';

import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';


import  Documents from '../Documents/Index.js'
import  Contacts from '../Contacts/Index.js'
import  Settings from '../Settings/General.js'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state.data  = this.props.navigation.getParam('data');
    }

    static navigationOptions = {
        header: null
    }

    state = {
        data: { },
        count: {
            awaitingMySign: null,
            awaitingOthers: null,
            completed: null,
            expireSoon: null,
        },
        auth: null,
        documents: [],
        loading: true
    }

    getRecentDocuments = async() => {
        let auth = await AsyncStorage.getItem("auth")
        this.setState({auth: auth})
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/documents',{
        method: 'POST',
        headers: {
            'Authorization':this.state.auth,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "documentStatusId": null,
            "currentPage": 0,
            "isNext": true,
            "searchText": "",
            "startDate": "",
            "endDate": moment().utcOffset("+5:30").format("MM/DD/YYYY"),
            "signatureType": 0,
            "uploadedBy": "",
            "signerName": "",
            "dateDuration": ""
        }),
        }).then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                documents: responseJson["data"][0]["documents"],
                loading: false
            })
            // console.warn(this.state.documents)
        })
        .catch((error) => {
            console.warn(error);
        });
      }

    componentWillMount = async() =>{
        this.getRecentDocuments();
        this.state.count  = this.props.navigation.getParam('count')
        BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);
    }
    
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed);
    }

    onBackPressed() {
        Alert.alert(
        'Exit App',
        'Do you want to exit?',
        [
            {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'Yes', onPress: () => BackHandler.exitApp()},
        ],
        { cancelable: false });
        return true;
    }

    floatClicked= async() => {

        DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()],
            },(error,res) => {
                
       const formData = new FormData()
       formData.append('file',{
           
        uri: res.uri,
        type: res.type,
        name: res.fileName,
       })
       //console.warn(res.uri+res.type+res.fileName)
       //console.warn(formData)
       
            
    return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/upload',{
    method: 'POST',
    headers: {
        'Authorization':this.state.auth,
        //'Content-Type':'multipart/form-data'
        // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.N9w0jV/v+9PKjqTQVRpre2jTzBser7/a/Thzwn6/3UCGTehr+Gk9tZrbfUo0jndFhKFx2ywj3gA0kjDn9uf/mrfnjcwIru3WHKGL1lhTCxH/Uf7NYBtBbAd5M1f77b2aqFJHSXiQ0miSqKUB2cipfOf88VU+XiCO57FQtQzRFX0BtR5LZHaZQqSMMj8y47n6M86I6CKl/SntvdAyzVMh7uXFWsaYHY/nKmyIunJgewZM3q2ImLEx7ndLwRT1Kpus2er5pnvq19gX43RfAEkl80kK7axwGX2rPYYpoedDBXS35npshScOXwmZhiv36CmefEFHYLgFb83BWVafahApZ5huYSa1DHVNA6rCFJmrEdIZSVy/3U3prOcyiOsRM11DwsXwuJoOVYlwJgvluzUgDz32moOaTde6a1vkrdMaedYDyNNolAGSQ1Pu3+CKxRmp2tRpNY7GaajQVLaie574mFc2BGCwJdrueGAA8DuCPCgN2fpVlMYrufbYI7om3MnSjypSyoFuWg4O+4PG72+Qm5HvUfADtSbX4REh6XWBwyt89NRYf9f/qp/S3aLWZ8XsY5akfYKBECZQ6H6Z3rVRxAW7OgnqlPlAMBSw+DqAi3+28ActC0gqb3KOiDJFb3jIT4OoAMBRAA3hdAmblTr6EwpPmbxXqoCZ2CFL/PQqA/OTuKiBadJ1ZxkxCuFcb2Cl2J1fHnRKKWqv3CY4UMyBVkIFH2zGCh3g5IgaG3hH6IYaM2xrtMNJ2AZRByaG0ki5r99ydraBgmbN6OhEaKYlnG5RqR3tuIpNieQDbe6hFZEpvqk8iOk4pD2/nm2gBbymmt9bQcX1giYgYVUgsOUBytjTawP4g1BeJ0Rt0w0ev/jotRYNpxQaWs5aMGMYfdPW.ooqT_toFub_53Hn22ZdRhSAkcNnJrnwlDag93pWBvlA',
    },
    body: formData
    }
    ).then((response) => response.json())
    .then((responseJson) => {
        
          
            console.warn(responseJson["data"])
        
    
    })
    .catch((error) => {
        console.warn(error.message);
    });      
          });
    }

    render() {
    var {navigate} = this.props.navigation;
        return (
            <View style={{flex:1}}>
            <StatusBar backgroundColor="#003d58" barStyle="light-content" />
            <View style={styles.mainContainer}>
                
                <View style={styles.box1}>
                    <View style={styles.boxHalf}>
                        <Text style={styles.box1Text}>
                            {this.state.count["awaitingMySign"]}
                            {"\n"}{"\n"} Need to Sign
                        </Text>
                    </View>
                    <View style={styles.boxHalf}>
                        <Text style={styles.box1Text}>
                            {this.state.count["awaitingOthers"]}
                            {"\n"}{"\n"} Waiting for Others
                        </Text>
                    </View>
                </View>

                <View style={styles.box2}>
                    <Text style={styles.box2Text1}>Recent Documents</Text>
                    <ScrollView>
                    {
                        this.state.documents.map((docs)=>{
                            return(
                                <TouchableOpacity
                                    key={docs.Id}
                                    onPress={()=>this.props.navigation.navigate("DocumentDetails", {Id: docs.Id, token: this.state.token})}
                                >
                                    <View style={styles.DocumentsList}>
                                        <Text style={styles.DocumentsListFont}>
                                            {docs.name}{docs.extension}
                                        </Text>
                                        <View style={{flexDirection: "row"}}>
                                            <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                                Completed by {docs.uploadedBy}
                                            </Text>
                                            <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                                Date: {docs.creationTime}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                    </ScrollView>
                </View>
                <View style={styles.box3}>
                <ScrollView>
                        <Text style={styles.box3Text1}>Quick Actions</Text>
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate("Canvas")}
                            style={{ backgroundColor: 'rgba(52, 52, 52, 0.0)'}}>
                            <Text style={styles.box3Text2}>Add/Edit Signature</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: 'rgba(52, 52, 52, 0.0)'}}>
                            <Text style={styles.box3Text2}>Add Profile Picture</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: 'rgba(52, 52, 52, 0.0)'}}>
                            <Text style={styles.box3Text2}>View Contacts</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            
                <TouchableOpacity style={styles.floatButton} onPress={this.floatClicked}>
                        <Text style={styles.floatButtonText}>+</Text>
                </TouchableOpacity>
            </View>
            </View>
            )
        }
    }


export default createMaterialBottomTabNavigator({ 
    dashboard: { screen: Dashboard,
        navigationOptions: {
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({tintColor}) => (
                <Icon name="md-home" color={tintColor} size={24} />
            )
        }
    },
    documents: { screen: Documents,
        navigationOptions: {
            tabBarLabel: 'Documents',
            tabBarIcon: ({tintColor}) => (
                <Icon name="md-document" color={tintColor} size={24} />
            ),
        }
    },
    contacts: { screen: Contacts,
        navigationOptions: {
            tabBarLabel: 'Contacts',
            tabBarIcon: ({tintColor}) => (
                <Icon name="md-contacts" color={tintColor} size={24} />
            )
        }
    },
    settings: { screen: Settings,
        navigationOptions: {
            tabBarLabel: 'Settings',
            tabBarIcon: ({ tintColor}) => (
                <Icon name="md-settings" color={tintColor} size={24} />
            )
        }
    },
},
{
    // initialRouteName: 'documents',
    barStyle: { backgroundColor: '#003d5a' },
    activeTintColor: 'white',
    navigationOptions: () => ({ header: null })

})


const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        backgroundColor: 'white',
        margin: 7, 
        borderWidth: 2,
        borderRadius:5,
        borderColor: "#003d5a",
    },
    box1: {
        margin:10,
        flexDirection: 'row',
        flex:0.35, 
    },
    boxHalf: {
        width: '50%', 
        backgroundColor: '#003d5a', 
        borderRightColor: 'white', 
        borderRightWidth: 2,
        justifyContent: 'center',
        borderRadius: 5
    },
    box1Text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 25,
        fontFamily: 'monospace',
        fontWeight: 'bold',
    },
    box2 :{
        marginTop: 20,
        margin: 10,
        flex:0.40, 
        borderRadius:5,
        borderColor: "#003d5a",
        borderWidth: 2,
        borderWidth: 2,
    },
    box2Text1: {
        marginLeft:10,
        fontSize:18,
        color: 'black',
        fontWeight: 'bold'
    },
    box3 :{
        marginTop: 20,
        margin: 10,
        flex:0.30, 
        borderRadius:5,
        borderColor: "#003d5a",
        borderWidth: 2,
    },
    box3Text1: {
        marginLeft:10,
        fontSize:18,
        color: 'black',
        fontWeight: 'bold'
    },
    box3Text2: {
        marginLeft:15,
        margin:10,
        fontSize:16,
        color: '#0000EE',
    },
    floatButton: {
        position: 'absolute',
        width:50,
        height: 50,
        backgroundColor: '#003d5a',
        borderRadius: 30,
        bottom: 5,
        right: -1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    floatButtonText: {
        color: 'white',
        fontSize: 25
    },
    DocumentsList:{
        flex: 1,
        borderWidth: 1,
        borderColor: "#003d5a",
        borderRadius: 5,
        margin: 5,
    },
    DocumentsListFont:{
        flex: 0.5,
        color: "black"
    },
})