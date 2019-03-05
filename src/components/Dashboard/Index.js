import React, {Component} from 'react'
import {View, StyleSheet,Text, TouchableOpacity} from 'react-native'
const util = require('util');
import  { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import { Dimensions } from "react-native";

import  Register from '../Register/Index.js'
import  Documents from '../Documents/Index.js'
import  Contacts from '../Contacts/Index.js'
import  Settings from '../Settings/Index.js'
import { ScrollView } from 'react-native-gesture-handler';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state.data  = this.props.navigation.getParam('data');
        this.state.name = this.state.data["firstName"]
        console.warn(this.state.name)
    }
    static navigationOptions = {
        header: null
    }
    
    state = {
        data: { },
        name: null,
    }
    floatClicked=() => {
        alert("clicked")
    }
     render() {
        var {navigate} = this.props.navigation;
         return (
             <View style={{flex:1}}>
                <View style={styles.mainContainer}>
                    
                    <View style={styles.box1}>
                        <View style={styles.boxHalf}>
                            <Text style={styles.box1Text}>
                                0 {"\n"}{"\n"} Need to Sign
                            </Text>
                        </View>
                        <View style={styles.boxHalf}>
                        <Text style={styles.box1Text}>
                                0 {"\n"}{"\n"} Waiting for Others
                            </Text>
                        </View>
                    </View>

                    <View style={styles.box2}>
                        <Text style={styles.box2Text1}>Recent Documents</Text>
                        <Text>Scroll view here</Text>
                    </View>
                
                    <View style={styles.box3}>
                        <Text style={styles.box3Text1}>Quick Actions</Text>
                        <TouchableOpacity style={{ backgroundColor: 'rgba(52, 52, 52, 0.0)'}}>
                            <Text style={styles.box3Text2}>Add/Edit Signature</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: 'rgba(52, 52, 52, 0.0)'}}>
                            <Text style={styles.box3Text2}>Add Profile Picture</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: 'rgba(52, 52, 52, 0.0)'}}>
                            <Text style={styles.box3Text2}>View Contacts</Text>
                        </TouchableOpacity>
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
            )
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
    barStyle: { backgroundColor: '#6eab52' },
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
       backgroundColor: 'green',
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

})