import React, {Component} from 'react'
import {TouchableOpacity, View, Text, Dimensions, TextInput,
     StyleSheet, AsyncStorage, } from 'react-native'
 
import Icon from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modalbox'
import { ProgressDialog } from 'react-native-simple-dialogs';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width

class AddModal extends Component {
    componentWillMount = async() =>{
        let auth = await AsyncStorage.getItem('auth');
        this.state.auth = auth;
        //console.warn(this.state.auth)
    }
    state = {
        name: '',
        email: '',
        mobNu: '',
        jobT: '',
        jobD: '',
        auth: null,
        rMes: null,
        pdVisible: false,
        errorName: null,
        errorEmail: null,
        errorJT: null,
        errorJD: null,
        btnDisable: true,
        btnOpacity: 0.5
    }

    show = () => {
        
        this.refs.myModal.open()
    }
    close = () => {
        
        this.refs.myModal.close()
    }
    add = () => {
        this.setState({pdVisible:true})
                    
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/contact/add', {
            method: 'POST',
            headers: {
                'Authorization': this.state.auth,
                //'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.N9w0jV/v+9PKjqTQVRpre2jTzBser7/a/Thzwn6/3UCGTehr+Gk9tZrbfUo0jndFhKFx2ywj3gA0kjDn9uf/mrfnjcwIru3WHKGL1lhTCxH/Uf7NYBtBbAd5M1f77b2aqFJHSXiQ0miSqKUB2cipfOf88VU+XiCO57FQtQzRFX0BtR5LZHaZQqSMMj8y47n6M86I6CKl/SntvdAyzVMh7uXFWsaYHY/nKmyIunJgewZM3q2ImLEx7ndLwRT1Kpus2er5pnvq19gX43RfAEkl80kK7axwGX2rPYYpoedDBXS35npshScOXwmZhiv36CmefEFHYLgFb83BWVafahApZ5huYSa1DHVNA6rCFJmrEdIZSVy/3U3prOcyiOsRM11DwsXwuJoOVYlwJgvluzUgDz32moOaTde6a1vkrdMaedYDyNNolAGSQ1Pu3+CKxRmp2tRpNY7GaajQVLaie574mFc2BGCwJdrueGAA8DuCPCgN2fpVlMYrufbYI7om3MnSjypSyoFuWg4O+4PG72+Qm5HvUfADtSbX4REh6XWBwyt89NRYf9f/qp/S3aLWZ8XsY5akfYKBECZQ6H6Z3rVRxAW7OgnqlPlAMBSw+DqAi3+28ActC0gqb3KOiDJFb3jIT4OoAMBRAA3hdAmblTr6EwpPmbxXqoCZ2CFL/PQqA/OTuKiBadJ1ZxkxCuFcb2Cl2J1fHnRKKWqv3CY4UMyBVkIFH2zGCh3g5IgaG3hH6IYaM2xrtMNJ2AZRByaG0ki5r99ydraBgmbN6OhEaKYlnG5RqR3tuIpNieQDbe6hFZEpvqk8iOk4pD2/nm2gBbymmt9bQcX1giYgYVUgsOUBytjTawP4g1BeJ0Rt0w0ev/jotRYNpxQaWs5aMGMYfdPW.ooqT_toFub_53Hn22ZdRhSAkcNnJrnwlDag93pWBvlA',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
             
                name: this.state.name,
                email: this.state.email,
                countryId: "91",
                mobileNumber: this.state.mobNu
            
            }),
            }).then((response) => response.json())
            .then((responseJson) => {
                if(responseJson["errors"]) {
                    this.setState({
                        name: '',
                        email: '',
                        mobNu: '',
                        jobT: '',
                        jobD: '',
                        pdVisible:false})
                    console.warn(responseJson["errors"])

                    if(alert(responseJson["errors"]["Contact"])){
                        alert(responseJson["errors"]["Contact"])
                    }
                }
                if(responseJson == null) {
                   alert("Try Again")
                }
                if(responseJson["message"]) {
                    this.refs.myModal.close()
                    this.setState({
                        name: '',
                        email: '',
                        mobNu: '',
                        jobT: '',
                        jobD: '',
                        pdVisible:false})
                    this.props.parentFlatList.onRefresh()
                    
                }

                //console.warn(responseJson["message"])
            })
            .catch((error) => {
                console.warn(error);
            });
        
        
    }
    update=(value, text)=> {
        switch(value) {
            case "name": {
                
                let reg = /^([a-zA-z\s]{0,32})$/ ;
            
                if(reg.test(text) === false)
                {
                   this.setState({errorName: "Only alphabets allows", btnDisable:true, btnOpacity:0.5})
                }
                else {
                    this.setState({errorName:null, name: text, btnDisable:false, btnOpacity: 1.0})
                }
                break
                return
            }
            case "email": {
                let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        
                if(reg.test(text) === false)
                {
                    this.setState({errorEmail: "Invalid Email", btnDisable:true, btnOpacity:0.5})
                } else {
                    this.setState({errorEmail:null, email: text, btnDisable:false, btnOpacity: 1.0})
                }
                break
                return
            }
            case "mobNu": {
                this.setState({mobNu: text})
                return
            }
            case "jobT": {
                let reg = /^([a-zA-z\s]{0,32})$/ ;
            
                if(reg.test(text) === false)
                {
                   this.setState({errorJT: "Only alphabets allows"})
                }
                else {
                    this.setState({errorJT:null, jobT: text})
                }
                break
                return
            }
            case "jobD": {
                let reg = /^([a-zA-z\s]{0,32})$/ ;
            
                if(reg.test(text) === false)
                {
                   this.setState({errorJD: "Only alphabets allows"})
                }
                else {
                    this.setState({errorJD:null, jobD: text})
                }
                break
                return
            }
        }
    }
     render() {
         return (
            
            <Modal 
            ref={"myModal"}
            style={ styles.modal }
            position= 'center'
            backdrop={true}
            backdropPressToClose={false}
            swipeToClose={false}
            >
            <ProgressDialog
            visible={this.state.pdVisible}
            title="Adding Contact!"
            message="Please wait..."
            activityIndicatorColor="#003d5a"
            activityIndicatorSize="large"
            animationType="slide"
            /> 
        <View style={{ margin:10, flex:1, flexDirection: 'row'}}>
            <View style={{flex:0.5,}}>
                <Text style={{marginLeft:4, fontSize: 18,  color: 'black', fontWeight:'bold'}}>Add Contact</Text>
            </View>
            <View style={{flex:0.5,alignItems:'flex-end'}}>
                <Icon name="md-close" color='black' size={30} onPress={()=>this.close()} />
            </View>
        </View>
            <TextInput
                style={ styles.textIn }
                placeholder="Enter Name *"
                placeholderTextColor='grey'
                returnKeyType="next"
                keyboardType="name-phone-pad"
                autoCapitalize="none"
                autoCorrect={false}
                onSubmitEditing={() => this.ref1.focus()}
                onChangeText={text => this.update("name",text)}
                />
                {this.state.errorName==null || this.state.errorName==" " ?
                null:
                <Text style = { styles.errorText }>{this.state.errorName}</Text>
                }
            <TextInput
                style={ styles.textIn }
                placeholder="Enter Email *"
                placeholderTextColor='grey'
                returnKeyType="next"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onSubmitEditing={() => this.ref2.focus()}
                ref={(input) => this.ref1 = input}
                onChangeText={text => this.update("email",text)}
                />
                {this.state.errorEmail==null || this.state.errorEmail==" " ?
                null:
                <Text style = { styles.errorText }>{this.state.errorEmail}</Text>
                }
            <TextInput
                style={ styles.textIn }
                placeholder="Enter Mobile Number *"
                underlineColor= "green"
                maxLength={10}
                placeholderTextColor='grey'
                returnKeyType="next"
                keyboardType="number-pad"
                autoCapitalize="none"
                autoCorrect={false}
                onSubmitEditing={() => this.ref3.focus()}
                ref={(input) => this.ref2 = input}
                onChangeText={text => this.update("mobNu",text)}
                />
            <TextInput
                style={ styles.textIn }
                placeholder="Enter Job Title"
                placeholderTextColor='grey'
                returnKeyType="next"
                keyboardType="name-phone-pad"
                autoCapitalize="none"
                autoCorrect={false}
                onSubmitEditing={() => this.ref4.focus()}
                ref={(input) => this.ref3 = input}
                onChangeText={text => this.update("jobT",text)}
                />
                {this.state.errorJT==null || this.state.errorJT==" " ?
                null:
                <Text style = { styles.errorText }>{this.state.errorJT}</Text>
                }
            <TextInput
                style={ styles.textIn }
                placeholder="Enter Job Desc"
                placeholderTextColor='grey'
                returnKeyType="done"
                keyboardType="name-phone-pad"
                autoCapitalize="none"
                autoCorrect={false}
                ref={(input) => this.ref4 = input}
                onChangeText={text => this.update("jobD",text)}
                />
                {this.state.errorJD==null || this.state.errorJD==" " ?
                null:
                <Text style = { styles.errorText }>{this.state.errorJD}</Text>
                }
            <TouchableOpacity 
                disabled={this.state.btnDisable}
                style={ [styles.btnSave, {opacity: this.state.btnOpacity}] } 
                onPress={this.add}>
                    <Text style={styles.textSave}>Add Contact</Text>
            </TouchableOpacity>

            </Modal>
                )
         }
     }

export default AddModal

const styles = StyleSheet.create({
    modal:{
        justifyContent: 'center',
        shadowRadius:20,
        width:width-80,
        height:'auto',
        borderColor:'#003d5a',
        borderWidth: 1,
        borderRadius:5,
    },
    textIn: {
        height: 40,
        borderBottomColor: '#003d5a',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        borderBottomWidth: 1,
    },
    btnSave: {
        backgroundColor: '#003d5a',
        marginLeft: "33%",
        marginRight: "33%",
        height:40,
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
    },
    textSave: {
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
    errorText: {
        color: '#ff0000',
        marginLeft:30,
        fontSize: 12,
    },
})