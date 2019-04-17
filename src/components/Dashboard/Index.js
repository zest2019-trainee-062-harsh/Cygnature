import React, {Component} from 'react'
import {View, StyleSheet,Text, TouchableOpacity, ScrollView, StatusBar, BackHandler, Alert, AsyncStorage,
ActivityIndicator } from 'react-native'
import  { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon1 from 'react-native-vector-icons/FontAwesome5'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import { Dimensions } from "react-native";
import moment from 'moment';
import ActionButton from 'react-native-action-button';

import { NavigationEvents } from 'react-navigation';
import { ProgressDialog } from 'react-native-simple-dialogs';

import UploadModal from './UploadModal.js'

import  Documents from '../Documents/Index.js'
import  Contacts from '../Contacts/Index.js'
import  Account from '../Account/Index.js'
import  DocumentVerify from '../Verify/Index.js'

var Spinner = require('react-native-spinkit');
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
        loadingCount: true,
        loading: true,
        pdVisible: false,
        refreshData:false
    }

    getCount() {
        this.setState({loadingCount: true})
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/dashboard/document-counts/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.state.auth,
            },
            }).then((response) => response.json())
            .then((responseJson) => {
            
                //this.state.count = responseJson["data"]
                //console.warn(responseJson["data"][0]["awaitingMySign"])
                this.state.count["awaitingMySign"] = responseJson["data"][0]["awaitingMySign"]
                this.state.count["awaitingOthers"] = responseJson["data"][0]["awaitingOthers"]
                this.state.count["completed"] = responseJson["data"][0]["completed"]
                this.state.count["expireSoon"] = responseJson["data"][0]["expireSoon"]
                this.setState({loadingCount: false})
                //console.warn(this.state.count)
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    getRecentDocuments = async() => {
        this.setState({loading: true, documents: null})
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
            //this.refs.UploadModal.show()
            // console.warn(this.state.documents)
        })
        .catch((error) => {
            console.warn(error);
        });
      }

    // componentWillMount = async() =>{
    //     this.getRecentDocuments();
    //     this.state.count  = this.props.navigation.getParam('count')
      
    // }
    

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

    uploadDocument= async() => {
        this.refs.UploadModal.show()
    }

    showData = (data) => {
        if(data == null)
        {
            console.warn("no data")
        }else {
            //console.warn("return data"+data["Id"])
            //console.warn("return data"+data["name"])
            this.props.navigation.navigate('Document_Upload',{'data':data})
        }
    }

    didBlur = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed);
    }
    
    didFocus = async() => {
        let auth = await AsyncStorage.getItem("auth")
        this.setState({auth: auth})

        this.getCount();
        this.getRecentDocuments();
        BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);
    }


    render() {
    var {navigate} = this.props.navigation;
        return (
            <View style={{flex:1}}>
            <NavigationEvents
                onDidBlur={payload => this.didBlur()}
                onDidFocus={payload => this.didFocus()}/>
                
                <StatusBar backgroundColor="#003d58" barStyle="light-content" />
                <View style={styles.mainContainer}>
                
                    <View style={styles.box1}>
                        <View style={[styles.boxHalf, {justifyContent:'center', alignItems: 'center'}]}>
                        
                        {this.state.loadingCount ? 
                        <Spinner style={styles.spinner} isVisible={true} size={40} type={'ThreeBounce'} color={'white'}/>
                        :
                            <Text style={styles.box1Text}>
                            {this.state.count["awaitingMySign"]}
                               {"\n"}{"\n"} Need to Sign
                            </Text>
                        }
                        </View>

                       <View style={[styles.boxHalf, {justifyContent:'center', alignItems: 'center'}]}>
                        
                        {this.state.loadingCount ? 
                        <Spinner style={styles.spinner} isVisible={true} size={40} type={'ThreeBounce'} color={'white'}/>
                        :
                            <Text style={styles.box1Text}>
                            {this.state.count["awaitingOthers"]}
                               {"\n"}{"\n"} Waiting for others
                            </Text>
                        }

                        </View>
                    </View>
                        
                    <View style={styles.box1}>
                    <View style={[styles.boxHalf, {justifyContent:'center', alignItems: 'center'}]}>
                        
                        {this.state.loadingCount ? 
                        <Spinner style={styles.spinner} isVisible={true} size={40} type={'ThreeBounce'} color={'white'}/>
                        :
                            <Text style={styles.box1Text}>
                            {this.state.count["completed"]}
                               {"\n"}{"\n"} Completed
                            </Text>
                        }
                        </View>
                        <View style={[styles.boxHalf, {justifyContent:'center', alignItems: 'center'}]}>
                        
                        {this.state.loadingCount ? 
                        <Spinner style={styles.spinner} isVisible={true} size={40} type={'ThreeBounce'} color={'white'}/>
                        :
                            <Text style={styles.box1Text}>
                            {this.state.count["expireSoon"]}
                               {"\n"}{"\n"} Expire Soon
                            </Text>
                        }
                        </View>
                    </View>

                    <View style={styles.box2}>
                        <Text style={styles.box2Text1}>Recent Documents</Text>
                        {this.state.loading ? 
                        <View style={{flex: 1,padding:"10%",justifyContent: 'center', alignContent:'center'}}> 
                            <ActivityIndicator color="#003d5a" size="large" /> 
                        </View> 
                        : null}
                        {this.state.documents ?
                        <ScrollView>
                        {
                            this.state.documents.map((docs)=>{
                                return(
                                    <TouchableOpacity
                                        style={styles.DocumentsList}
                                        key={docs.Id}
                                        onPress={()=>this.props.navigation.navigate("DocumentDetails", {Id: docs.Id, token: this.state.token})}
                                    >
                                        <View style={{margin: 2}}>
                                            <Text style={[styles.DocumentsListFont, {fontWeight: 'bold'}]}>
                                                {docs.name}{docs.extension}
                                            </Text>
                                            <View style={{flexDirection: "row"}}>
                                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                                    {docs.uploadedBy}
                                                </Text>
                                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                                    {docs.creationTime}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                        </ScrollView>
                        :null}
                    </View>
                    <ActionButton buttonColor="#003d5a" bgColor="rgba(255,255,255,0.8)">
                        <ActionButton.Item buttonColor="#003d5a" title="Upload File" onPress={() => this.uploadDocument()}>
                            <Icon name="md-document" style={styles.actionButtonIcon} />
                        </ActionButton.Item>`
                        <ActionButton.Item buttonColor="#003d5a" title="Add Signature" onPress={() => {}}>
                            <Icon1 name="signature" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                    </ActionButton>
                    {/* <TouchableOpacity style={styles.floatButton} onPress={this.floatClicked}>
                        <Text style={styles.floatButtonText}>+</Text>
                    </TouchableOpacity> */}
                </View>
                <UploadModal ref={'UploadModal'}  parentFlatList={this}/>
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
    DocumentVerify: { screen: DocumentVerify,
        navigationOptions: {
            tabBarLabel: 'Verify',
            tabBarIcon: ({tintColor}) => (
                <Icon2 name="check" color={tintColor} size={24} />
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
    account: { screen: Account,
        navigationOptions: {
            tabBarLabel: 'Account',
            tabBarIcon: ({ tintColor}) => (
                <Icon2 name="user-circle" color={tintColor} size={24} />
                
            )
        }
    },
},
{
  //  initialRouteName: 'account',
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
        flex:0.25,
    },
    boxHalf: {
        width: '50%', 
        backgroundColor: '#003d5a', 
        borderRightColor: 'white', 
        borderRightWidth: 2,
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: -17
    },
    box1Text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'monospace',
        fontWeight: 'bold',
    },
    box2 :{
        marginTop: 25,
        margin: 10,
        flex:0.50,
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
        borderWidth: 0.5,
        borderColor: "#003d5a",
        borderRadius: 5,
        margin: 5,
        backgroundColor: '#DCDCDC'
    },
    DocumentsListFont:{
        flex: 0.5,
        color: "black"
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    }
})