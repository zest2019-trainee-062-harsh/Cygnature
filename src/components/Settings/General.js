import React, {Component} from 'react'
import {
    View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Linking, Switch, AsyncStorage
} from 'react-native'
import { Dropdown } from 'react-native-material-dropdown'

import  { createMaterialTopTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

import  Profile from '../Settings/Profile.js'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
 
class General extends Component {
    // constructor (props) {
    //     super(props)
    //     state = {
    //         screenshots = false,
    //         document_activity = false
    //     }
    // }

    logout = async() => {
        AsyncStorage.setItem('auth', 'not_present');
        AsyncStorage.setItem('otp_check', 'not_present');
        this.props.navigation.navigate("Login")
    }

    render() {
        const navigate = this.props.navigation;
        let data = [
            {
                value: "DD/MM/YYYY"
            },
            {
                value: "MM/DD/YYYY"
            },
            {
                value: "YYYY/DD/MM"
            },
            {
                value: "YYYY/MM/DD"
            }
        ]
        return(
            <View style={styles.mainContainer}>
                <ScrollView>
                    <View style={{margin: 10, width: width}}></View>
                    <Text style={{fontWeight: "bold", fontSize: 22, color: "black"}}> General </Text>
                    <View style={styles.DocumentsList}>
                        <View style={styles.DocumentsList}>
                            <TouchableOpacity style={{marginTop: -height*0.03}}>
                                <Dropdown
                                    label="Change the date format from here"
                                    data={data}
                                    selectedItemColor="#003d5a"
                                    rippleCentered={true}
                                    itemTextStyle={"helvetica"}
                                >
                                </Dropdown>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.DocumentsList}>
                            <Text
                                style={[styles.DocumentsListFont, {fontSize: 17, color: "#003d5a", textDecorationLine: "underline"}]}
                                onPress={() => Linking.openURL('https://account.cygnature.io/Terms-Condition')}
                            >
                                Terms & Conditions
                            </Text>
                        </View>
                        <View style={styles.DocumentsList}>
                            <Text
                                style={[styles.DocumentsListFont, {fontSize: 17, color: "#003d5a", textDecorationLine: "underline"}]}
                                onPress={() => Linking.openURL('https://account.cygnature.io/Privacy-Policy')}
                            >
                                Privacy Policy
                            </Text>
                        </View>
                        <View style={styles.DocumentsList}>
                            <Text
                                style={[styles.DocumentsListFont, {fontSize: 17, color: "#003d5a", textDecorationLine: "underline"}]}
                                onPress={() => Linking.openURL('https://www.cygnature.io')}
                            >
                                About us
                            </Text>
                        </View>
                    </View>
                    <View style={{borderColor: "#003d5a", borderWidth: 1, margin: 20}}></View>
                    <Text style={{fontWeight: "bold", fontSize: 25, color: "black"}}> Security </Text>
                    <View style={styles.DocumentsList}>
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={[styles.DocumentsListFont, {fontSize: 17}]}>
                                    Allow Screenshots
                                </Text>
                                <Switch
                                    style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }
                                    thumbColor = "#003d5a"
                                    trackColor = "#003d5a"
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{borderColor: "#003d5a", borderWidth: 1, margin: 20}}></View>
                    <Text style={{fontWeight: "bold", fontSize: 25, color: "black"}}> Notifications </Text>
                    <View style={styles.DocumentsList}>
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={[styles.DocumentsListFont, {fontSize: 17}]}>
                                    Document Activity
                                </Text>
                                <Switch
                                    style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }
                                    thumbColor = "#003d5a"
                                    trackColor = "#003d5a"
                                />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style = { [styles.buttonContainer]} onPress={() => this.logout()}>
                        <Text style = { styles.buttonText }>Logout</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}

export default createMaterialTopTabNavigator({
    general: { screen: General,
        navigationOptions: {
            tabBarLabel: 'General',
            tabBarIcon: ({tintColor}) => (
                <Icon name="md-home" color={tintColor} size={18} />
            )
        }
    },
    profile: { screen: Profile,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({tintColor}) => (
                <Icon name="md-document" color={tintColor} size={18} />
            )
        }
    }, 
},
{
    tabBarOptions: {
        activeTintColor: 'white',
        style: {
            backgroundColor: '#003d5a'
        },
        indicatorStyle: {
            height: 0
        },
        labelStyle: {
            fontSize: 12,
            fontWeight: 'bold'
        },
        showIcon: true,
        
    },
    navigationOptions: () => ({ header: null })

})
    
const styles = StyleSheet.create({
    mainContainer:{
        borderWidth:1,
        borderColor:'black',
        flex:1,
        backgroundColor: 'white',
        margin: 7, borderWidth: 2,
        borderRadius:5,
        borderColor: "#003d5a",
        padding: 10
    },
    DocumentsList:{
        flex: 1,
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5
    },
    DocumentsListFont:{
        flex: 0.5,
        color: "black",
        fontSize: 12
    },
    buttonContainer: {
        backgroundColor: '#003d5a',
        paddingVertical: 10,
        margin: 5,
        borderRadius: 5
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
})