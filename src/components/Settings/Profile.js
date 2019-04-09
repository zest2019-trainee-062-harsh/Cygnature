import React, {Component} from 'react'
import {View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, AsyncStorage, Switch, TextInput, Image} from 'react-native'

import { Dropdown } from 'react-native-material-dropdown';   

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
import Modal from 'react-native-modalbox'
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
        this.refs.myModal.open()
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
            <Modal
            ref={"myModal"}
            style={ styles.modal }
            position= 'center'
            backdrop={true}
            onClosed={() =>{
                //console.warn("modal closed")
            }}
            >

            <Text style={styles.basic}>Set Signature</Text>

            <TouchableOpacity style={styles.selectoption} onPress={() => this.props.navigation.navigate('Canvas')}>
                <Text>Draw</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.selectoption} onPress={() => this.props.navigation.navigate('Image')}>
                <Text>Capture</Text>
            </TouchableOpacity>

            

             <TouchableOpacity style={styles.selectoption} onPress={() => this.sendtoCanvas()}>
                <Text>Type</Text>
            </TouchableOpacity> 

            </Modal>
                <ScrollView>
                    <Text style={{fontWeight: "bold", fontSize: 25, color: "black"}}> Profile Picture </Text>
                    <View style={styles.DocumentsList}>
                    
                        <View style={styles.DocumentsList}>

                            <View style={{height: 212, width: 212, flexGrow:1, justifyContent: "center", alignItems: "center"}}>
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
                            First Name
                        </Text>
                        <TextInput
                            placeholderTextColor='grey'
                            placeholder = "First Name"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onSubmitEditing={() => this.REGInput1.focus()}
                            onChangeText={text => this.validations(text, "fname")}
                            style= { styles.boxTI }>
                        </TextInput>
                        </View>
                        <View>
                        <Text style={[styles.DocumentsListFont, {fontSize: 17}]}>
                            Last Name
                        </Text>
                        <TextInput
                            placeholderTextColor='grey'
                            placeholder = "Last Name"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onSubmitEditing={() => this.REGInput1.focus()}
                            onChangeText={text => this.validations(text, "lname")}
                            style= { styles.boxTI }>
                        </TextInput>
                        </View>
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
                                    onChangeText={text => this.update("email", text)}
                                    onSubmitEditing={() => this.ref1.focus()}
                                    underlineColorAndroid = "#003d5a"
                                >
                                </TextInput>
                            </View>
                        </View> 
                        <View style={styles.DocumentsList}>
                            <View>
                                <Text style={[styles.DocumentsListFont, {fontSize: 17}]}>
                                    Gender
                                </Text>
                                {/* <RadioForm
                                    radio_props={radio_props}
                                    initial={0}
                                    onPress={(value) => {this.setState({value:value})}}
                                /> */}
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
                                    onChangeText={text => this.update("phone", text)}
                                    onSubmitEditing={() => this.ref1.focus()}
                                    underlineColorAndroid = "#003d5a"
                                >
                                </TextInput>
                            </View>
                        </View>
                        <View style={styles.DocumentsList}>
                            <View>
                                <Text style={[styles.DocumentsListFont, {fontSize: 17}]}>
                                    Country Id
                                </Text>
                                <Dropdown
                                containerStyle={{
                                    marginBottom: -20,
                                    paddingTop:10
                                }}
                                pickerStyle={{
                                    marginBottom: -40,
                                    paddingTop:10
                                }}
                                value="+91"
                                data = {this.state.data}
                                valueExtractor = {({countryCode}) => countryCode}
                                onChangeText = {value => this.onChangeHandler(value)}
                                selectedItemColor = "red"
                        />
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
                            onPress={this.showModal}
                            style={styles.boxadd}>
                            <Text style={styles.box3Text2}>Add/Edit E-Signature</Text>
                            </TouchableOpacity>
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
    modal:{
        justifyContent: 'center',
        shadowRadius:20,
        width:width-80,
        height:height*.5,
        borderColor:'#003d5a',
        borderWidth: 1,
        borderRadius:5,
    },
    basic:{
        paddingLeft:90,
        color:'white',
        borderWidth:1,
        marginTop:-30,
        //marginBottom:20,
        fontSize:18,
        backgroundColor: '#003d5a',

    },
    selectoption:{
        borderRadius: 5,
        marginLeft:25,
        width:230,
        height:70,
        borderWidth:1,
        borderColor:'black',
        color:'black',
        fontSize:10,
        marginTop:20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      },
      ImageContainer: {
        //borderRadius: 10,
        width: 400,
        height: 800,
        borderColor: '#9B9B9B',
        //borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CDDC39',
        
      },
})