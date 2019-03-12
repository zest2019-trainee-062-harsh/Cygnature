import React, {Component} from 'react'
import {View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Linking, Switch, TextInput, Image} from 'react-native'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class Profile extends Component {
    render() {
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
                    <Text style={{fontWeight: "bold", fontSize: 25, color: "black"}}> Profile Picture </Text>
                    <View style={styles.DocumentsList}>
                        <View style={styles.DocumentsList}>
                            <View style={{height: 212, width: 212, flexGrow:1, justifyContent: "center", alignItems: "center"}}>
                                <Image
                                    source={require('../../../img/profile.png')}
                                />
                            </View>
                            <TouchableOpacity style = { [styles.buttonContainer]}>
                                <Text style = { styles.buttonText }>Update Profile Picture</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{fontWeight: "bold", fontSize: 25, color: "black"}}> Profile </Text>
                    <View style={styles.DocumentsList}>
                        <View style={styles.DocumentsList}>
                            <View>
                                <Text style={[styles.DocumentsListFont, {fontSize: 17}]}>
                                    Email
                                </Text>
                                <TextInput
                                    style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }
                                    placeholder="Change email"
                                    placeholderTextColor='grey'
                                    returnKeyType="next"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColorAndroid = "#003d5a"
                                >
                                </TextInput>
                            </View>
                        </View>
                        <View style={styles.DocumentsList}>
                            <View>
                                <Text style={[styles.DocumentsListFont, {fontSize: 17}]}>
                                    Mobile Number
                                </Text>
                                <TextInput
                                    style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }
                                    placeholder="Change phone number"
                                    placeholderTextColor='grey'
                                    returnKeyType="next"
                                    keyboardType="numeric"
                                    maxLength={10}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColorAndroid = "#003d5a"
                                >
                                </TextInput>
                            </View>
                        </View>
                        <View style={styles.DocumentsList}>
                            <View>
                                <Text style={[styles.DocumentsListFont, {fontSize: 17}]}>
                                    City
                                </Text>
                                <TextInput
                                    style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }
                                    placeholder="Change city"
                                    placeholderTextColor='grey'
                                    returnKeyType="next"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColorAndroid = "#003d5a"
                                >
                                </TextInput>
                            </View>
                        </View>
                        <View style={styles.DocumentsList}>
                            <View>
                                <Text style={[styles.DocumentsListFont, {fontSize: 17}]}>
                                    Country
                                </Text>
                                <TextInput
                                    style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }
                                    placeholder="Change email"
                                    placeholderTextColor='grey'
                                    returnKeyType="next"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColorAndroid = "#003d5a"
                                >
                                </TextInput>
                            </View>
                        </View>
                    </View>
                    <View style={{borderColor: "#003d5a", borderWidth: 1, margin: 20, width: width}}></View>
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
                </ScrollView>
            </View>
        )
    }
}

export default Profile

const styles = StyleSheet.create({
    mainContainer:{
        height: height*0.75,
        margin: 7,
        borderWidth: 2,
        borderRadius:5,
        borderColor: "#003d5a",
        padding: 10,
        backgroundColor: "white"
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