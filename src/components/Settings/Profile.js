import React, {Component} from 'react'
import {View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, AsyncStorage, Switch, TextInput, Image} from 'react-native'
import AddModal from './AddModal'
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class Profile extends Component {
    state = {
        signature: null,
        visible: false
    }
    componentWillMount= async() => {
        
        let auth = await AsyncStorage.getItem('auth');
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/user/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth,
        },
        }).then((response) => response.json())
        .then((responseJson) => {
            //console.warn(responseJson['data'][0]['impressions'][0]['imageBytes'])
            this.setState({signature: responseJson['data'][0]['impressions'][0]['imageBytes']}) 
            //console.warn(this.state.signature)
            this.setState({visible:true})
        })
        .catch((error) => {
          console.error(error)
        });
    }

    showModal = () => {
        this.refs.AddModal.show() 
    }

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
                    <Text style={{fontWeight: "bold", fontSize: 25, color: "black"}}> Signature </Text>
                    <View style={styles.DocumentsList}>
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                            {this.state.visible?
                                <Image style={styles.signContainer} source={{uri: `data:image/png;base64,${this.state.signature}`}}/>
                            :null}
                            </View>
                            <TouchableOpacity 
                            onPress={this.floatClicked}
                            style={styles.boxadd}>
                            <Text style={styles.box3Text2}>Add/Edit E-Signature</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                
                <AddModal ref={'AddModal'}  parentFlatList={this} />
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
        margin: 5,
        borderRadius: 5
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
    signContainer: {
        width:150,
        height:150,
        borderWidth:1,
        borderRadius:5,
        borderColor: "#003d5a",
    },
    boxadd:{
        backgroundColor: '#003d5a',
        paddingVertical: 10,
        margin: 5,
        borderRadius: 5,
    },
    box3Text2: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
})