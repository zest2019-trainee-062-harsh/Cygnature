import React, {Component} from 'react'
import {View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity,
    Linking, TextInput,  AsyncStorage,Image} from 'react-native'

import AddModal from './AddModal'
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class Profile extends Component {
   
    constructor(props) {
        super(props)
        this.floatClicked = this.floatClicked.bind(this)
    }
    
    floatClicked=() => {
      // alert("clicked")
        this.refs.AddModal.show()    
    }

    sendtoCanvas = () => {
        //this.props.navigation.navigate('Canvas');
        console.warn("YES")
     }

     logout = async() => {
        AsyncStorage.clear();
        this.props.navigation.navigate("Login")
    }

    changepwd=() => {
        this.props.navigation.navigate("ChangePassword")
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
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={styles.DocumentsList}>
                            <View style={{height: 100, width: 100, flexGrow:1,}}>
                                <Image
                                style={{height:100,width:100}}
                                    source={require('../../../img/profile.png')}
                                />
                            </View>
                            
                              <Text style={{color: 'blue',textDecorationLine:'underline',marginTop:5,marginLeft:3}} onPress={ ()=> Linking.openURL('https://google.com') } >Update Photo</Text>
                           
                        </View>
                        <View style={{flex:1,flexDirection:'column'}}>
                        <View>
                        <TouchableOpacity style = {styles.buttonContainer} onPress={() => this.logout()}>
                            <Text style = { styles.buttonText }>Logout</Text>
                        </TouchableOpacity>
                        </View>
                        <View>
                        <TouchableOpacity 
                            onPress={this.floatClicked}>
                            <Text style={styles.Text4} >Add/Edit E-Signature</Text>
                        </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity 
                                onPress={this.changepwd}>
                                <Text style={styles.Text4} >Change Password</Text>
                            </TouchableOpacity> 
                        </View>
                        </View>    
                    </View>

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
                    <TouchableOpacity 
                            onPress={this.floatClicked}
                            style={styles.boxadd}>
                            <Text style={styles.box3Text2}>Update Profile</Text>
                    </TouchableOpacity>
                    
                </ScrollView>
                <AddModal ref={'AddModal'} />
                
            </View>
        )
    }
}

export default Profile

const styles = StyleSheet.create({
    mainContainer:{
        borderWidth:1,
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
        borderRadius: 5,
        marginTop:15,
        width:130,
        height:30,
        justifyContent:'center',
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        justifyContent:'center'  
    },
    boxadd:{
        backgroundColor: '#003d5a',
        paddingVertical: 10,
        margin: 5,
        borderRadius: 5,
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
        textAlign: 'center',
        color: '#ffffff',   
    },
    Text4:{
        fontWeight: 'bold',
        color: 'blue',
        textDecorationLine:'underline',
        marginTop:15,
        marginRight:10
    }
})