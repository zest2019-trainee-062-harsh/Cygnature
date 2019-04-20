import React, {Component} from 'react'
import {View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, AsyncStorage, Switch, TextInput, Image, ImageBackground} from 'react-native'
import Moment from 'moment';
import { Dropdown } from 'react-native-material-dropdown'; 
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';  
//import ModalDatePicker from 'react-native-datepicker-modal'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
import Modal from 'react-native-modalbox'
import { StackActions, NavigationActions } from 'react-navigation'
class Profile extends Component {
    constructor(props) {
        super(props)

        this.state.userData  = this.props.navigation.getParam('userData')
    }
    state = {
        signature: null,
        visible: false,
        userData: [],
        fname:"",
        lname:"",
        phoneNumber:"",
        jobTitle:"",
        organization:"",
        birthDate:"",
        value:"",
        gender:"",
        userId:"",
        valueIndex: ""
    }
    componentWillMount = async() => {
        
            this.state.auth = await AsyncStorage.getItem('auth')
       
        if(this.state.userData['impressions'][0] == null) {
            console.warn("null")
        }
        else {
        this.setState({signature: this.state.userData['impressions'][0]['imageBytes']})
        this.setState({visible:true}) 
        }
        this.setState({userId: this.state.userData['userId']})
        this.setState({email: this.state.userData['email']})
        this.setState({gender: this.state.userData['gender']})
        this.setState({fname: this.state.userData['firstName']})
        this.setState({lname: this.state.userData['lastName']})
        this.setState({email: this.state.userData['email']})
        this.setState({gender: this.state.userData['gender']})
        this.setState({valueIndex: this.state.userData['gender']})
        this.setState({phoneNumber : this.state.userData['phoneNumber']})
        this.setState({description: this.state.userData['description']})
        this.setState({countryId: this.state.userData['countryId']})
        this.setState({jobTitle: this.state.userData['jobTitle']})
        this.setState({organization: this.state.userData['organization']})
        this.setState({birthDate: this.state.userData['birthDate']})
        this.setState({visible:true})
    
    }

    onChangeHandler = (value) => {
        // console.warn(this.state.countryCode);
        // console.warn("Selected value = ", value);
        this.setState({countryCode: value.replace(/[^0-9]/g, '')})
        
        console.warn(this.state.countryCode);
    }

    validations(text, value)
    {
        switch(value) {

            case "fname": {
                name= text
                let reg = /^([a-zA-z\s]{0,32})$/ ;
            
                if(reg.test(name) === false)
                {
                   
                    this.setState({errorFName: "Only alphabets allows"})
                }
                else {
                    this.setState({fname: name})
                }
                break
            }
                

            case "lname": {
                name= text
                let reg = /^([a-zA-z\s]{0,32})$/ ;
            
                if(reg.test(name) === false)
                {
                    // console.warn("error")
                    this.setState({errorLName: "Only alphabets allows"})
                }
                else {
                    
                    this.setState({lname: name})
                }
            break
            }

            case "phone" : {
                name= text
                this.setState({phoneNumber: name})

                break
            }
            case "jobTitle": {
                name= text
                this.setState({jobTitle: name})
                break
            } 
            case "organization": {
                name= text
                this.setState({organization: name})
                break
            } 
            case "birthDate": {
                name= text
                this.setState({birthDate: name})
                break
            } 
        }
    }
    
    putprofile = () =>{
        console.warn(this.state.gender)
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/user/profile/'+this.state.userId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.state.auth,
            },
            body: JSON.stringify({
                userId:this.state.userId,
                email:this.state.email,
                firstName:this.state.fname,
                lastName:this.state.lname,
                gender:this.state.gender,
                countryId:this.state.countryId,
                jobTitle:this.state.jobTitle,
                organization:this.state.organization,
                phoneNumber:this.state.phoneNumber,
                birthDate:"1996/06/20",    
            }),
            }).then((response) => response.json())
            .then((responseJson) => {
                
                console.warn(responseJson)
                this.setState({pdVisible:false})
            })
            .catch((error) => {
              console.error(error)
            });


    }
 
    static navigationOptions = {
        title: "Edit Profile"
    }

    showModal = () => {
        this.refs.myModal.open()
    }

    render() {

        var radio_props = [
            {label: 'Female', value: 0 },
            {label: 'Male', value: 1 }
          ];

        Moment.locale('en');
        var dt = this.state.birthDate
        return(
            <View style={styles.mainContainer}>
            
            <Modal
            ref={"myModal"}
            style={ styles.modal }
            position= 'center'
            backdrop={true}
           
            >
            
            <Text style={{marginLeft:14,  fontSize: 18,  color: 'black', fontWeight:'bold'}}>Set Signature</Text>

           
            <TouchableOpacity style={styles.modalTI} onPress={() =>
                 //this.props.navigation.navigate('Canvas')
                {
                    const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({ routeName: 'Canvas'})
                    ]
                  })
                  this.props.navigation.dispatch(resetAction)
                }
                }>
                <Text style={styles.modalText}>Draw</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalTI} onPress={() => this.props.navigation.navigate('Image')}>
                <Text style={styles.modalText}>Capture</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalTI} onPress={() => this.sendtoCanvas()}>
                <Text style={styles.modalText}>Type</Text>
            </TouchableOpacity> 
            
           
            </Modal>

                <ScrollView>
                    <Text style={{fontWeight: "bold", fontSize: 20, color: "black"}}> Signature</Text>
                    <View style={styles.DocumentsList}>
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                            {this.state.visible?
                                <ImageBackground style={styles.signContainer} source={{uri: `data:image/png;base64,${this.state.signature}`}}>
                                    <TouchableOpacity style={styles.floatButton} onPress={this.showModal}>
                                        <Text style={styles.floatButtonText}>+</Text>
                                    </TouchableOpacity>
                                </ImageBackground>
                            :<ImageBackground style={styles.signContainer} >
                            <TouchableOpacity style={styles.floatButton} onPress={this.showModal}>
                                <Text style={styles.floatButtonText}>+</Text>
                            </TouchableOpacity>
                        </ImageBackground>}
                            </View>
                          
                        </View>
                        </View>    
                   


                    <Text style={{fontWeight: "bold", fontSize: 25, color: "black"}}> Profile </Text>
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
                            value={this.state.fname}
                            style= { {color:'grey',alignContent: "flex-end"} }
                            underlineColorAndroid = "#003d5a">
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
                            value={this.state.lname}
                            style= { {color:'grey',alignContent: "flex-end"} }
                            underlineColorAndroid = "#003d5a">
                        </TextInput>
                        </View>
                            <View>
                                <Text style={[styles.DocumentsListFont, {fontSize: 17}]}>
                                    Email
                                </Text>
                                <TextInput
                                    style={ {color:'grey',alignContent: "flex-end"} }
                                    placeholder="Change email"
                                    placeholderTextColor='grey'
                                    returnKeyType="next"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={this.state.email}
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
                                <RadioForm
                                    style={{marginTop:10}}
                                    radio_props={radio_props}
                                    onPress={(value) => {this.setState({gender:value})}}
                                    animation={true}
                                    formHorizontal={true}
                                    labelHorizontal={true}
                                    labelStyle={{color:'grey'}}
                                    buttonColor={'grey'}
                                    buttonSize={10} 
                                    selectedButtonColor={'black'}
                                    initial={radio_props[this.state.gender]}
                                />
                            </View>
                        </View>
                        <View style={styles.DocumentsList}>
                            <View>
                                <Text style={[styles.DocumentsListFont, {fontSize: 17}]}>
                                    Birth Date
                                </Text>
                                <TextInput
                                    style={{color:'grey', alignContent: "flex-end"}}
                                    placeholder="Change organization"
                                    placeholderTextColor='grey'
                                    returnKeyType="next"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={Moment(dt).format('d / MM / YYYY')}
                                    onSubmitEditing={() => this.REGInput1.focus()}
                                    onChangeText={text => this.validations(text, "birthDate")}
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
                                    style={ {color:'grey', alignContent: "flex-end"} }
                                    placeholder="Change phone number"
                                    placeholderTextColor='grey'
                                    returnKeyType="next"
                                    keyboardType="numeric"
                                    maxLength={10}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={text => this.validations(text,"phone")}
                                    onSubmitEditing={() => this.ref1.focus()}
                                    value={this.state.phoneNumber}
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
                                    marginBottom: 8,
                                    paddingTop:10,
                                    marginTop:-25
                                }}
                                pickerStyle={{
                                    marginBottom: -40,
                                    paddingTop:10
                                }}
                                value="91"
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
                                    Job Title
                                </Text>
                                <TextInput
                                    style={{color:'grey',alignContent: "flex-end"}} 
                                    placeholder="Change job title"
                                    placeholderTextColor='grey'
                                    returnKeyType="next"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={text => this.validations(text, "jobTitle")}
                                    onSubmitEditing={() => this.ref1.focus()}
                                    value={this.state.jobTitle}
                                    underlineColorAndroid = "#003d5a"
                                >
                                </TextInput>
                            </View>
                        </View>
                        <View style={styles.DocumentsList}>
                            <View>
                                <Text style={[styles.DocumentsListFont, {fontSize: 17}]}>
                                    Organization
                                </Text>
                                <TextInput
                                    style={ { color:'grey',alignContent: "flex-end"} }
                                    placeholder="Change organization"
                                    placeholderTextColor='grey'
                                    returnKeyType="next"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={text => this.validations(text,"organization")}
                                    onSubmitEditing={() => this.ref1.focus()}
                                    value={this.state.organization}
                                    underlineColorAndroid = "#003d5a"
                                >
                                </TextInput>
                            </View>
                        </View>

                <TouchableOpacity style = { [styles.buttonContainer]} onPress={() => this.putprofile()}>
                        <Text style = { styles.buttonText }>Update Profile</Text>
                </TouchableOpacity>

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
        margin: 7, 
        borderWidth: 2,
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
        fontSize: 13
    },
    buttonContainer: {
        backgroundColor: '#003d5a',
        paddingVertical: 10,
        borderRadius: 5,
        width:130,
        height:30,
        marginLeft:95,
        justifyContent:'center',
        marginTop:15
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        alignItems:'center'  
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
        width:width-90,
        height:150,
        borderWidth:1,
        borderRadius:5,
        margin:5,
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
        shadowRadius:20,
        width:width-80,
        height:height*.5,
        borderColor:'#003d5a',
        borderWidth: 1,
        borderRadius:5,
    },
    modalTI:{
        backgroundColor: 'white',
        paddingVertical: 20,
        margin: 10,
        marginTop:20,
        borderRadius: 5,
        borderWidth:1,
        borderColor:'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalText: {
        textAlign: 'center',
        color: 'black',
    },
      ImageContainer: {
        width: 400,
        height: 800,
        borderColor: '#9B9B9B',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CDDC39',    
      },
      
    floatButton: {
        position: 'absolute',
        width:30,
        height: 30,
        backgroundColor: 'grey',
        borderRadius: 30,
        bottom: 3,
        right: -1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    floatButtonText: {
        color: 'white',
        fontSize: 25    
    },
})