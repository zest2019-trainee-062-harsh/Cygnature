import React, {Component} from 'react'
import {View, StyleSheet,Text, TouchableOpacity, ScrollView, StatusBar, BackHandler, Alert} from 'react-native'
const util = require('util');
import  { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import { Dimensions } from "react-native";

import  Documents from '../Documents/Index.js'
import  Contacts from '../Contacts/Index.js'
import  Settings from '../Settings/General.js'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state.data  = this.props.navigation.getParam('data');
        this.state.count  = this.props.navigation.getParam('count');
        //console.warn(this.state.token)
        //console.warn(this.props.navigation.getParam('data'))
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
    }

    componentDidMount(){
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

    floatClicked=() => {
        alert("clicked")
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
                        <View style={styles.DocumentsList}>
                            <Text style={styles.DocumentsListFont}>
                                Document 1
                            </Text>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                    Completed by
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    Date xxx
                                </Text>
                            </View>
                        </View>
                        <View style={styles.DocumentsList}>
                            <Text style={styles.DocumentsListFont}>
                                Document 2
                            </Text>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                    Completed by
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    Date xxx
                                </Text>
                            </View>
                        </View>
                        <View style={styles.DocumentsList}>
                            <Text style={styles.DocumentsListFont}>
                                Document 3
                            </Text>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                    Completed by
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    Date xxx
                                </Text>
                            </View>
                        </View>
                        <View style={styles.DocumentsList}>
                            <Text style={styles.DocumentsListFont}>
                                Document 4
                            </Text>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                    Completed by
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    Date xxx
                                </Text>
                            </View>
                        </View>
                        <View style={styles.DocumentsList}>
                            <Text style={styles.DocumentsListFont}>
                                Document 5
                            </Text>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                    Completed by
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    Date xxx
                                </Text>
                            </View>
                        </View>
                        <View style={styles.DocumentsList}>
                            <Text style={styles.DocumentsListFont}>
                                Document 6
                            </Text>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                    Completed by
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    Date xxx
                                </Text>
                            </View>
                        </View>
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
    initialRouteName: 'dashboard',
    barStyle: { backgroundColor: '#003d5a' },
    activeTintColor: 'white',
    navigationOptions: () => ({ header: null })

})


const styles = StyleSheet.create({
    mainContainer: {
        width: width,
        height: height,
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
        justifyContent: 'center'
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
        flex:0.30, 
        borderColor: 'black',
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
        marginBottom: 70,
        margin: 10,
        flex:0.30, 
        borderColor: 'black',
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
           bottom: 35,
           right: 5,
           marginBottom: 50,
           alignItems: 'center',
           justifyContent: 'center',
       },
       floatButtonText: {
           color: 'white',
           fontSize: 25
       },
       DocumentsList:{
        flex: 1,
        backgroundColor: '#003d5a',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5
    },
    DocumentsListFont:{
        flex: 0.5,
        color: "white"
    },
})