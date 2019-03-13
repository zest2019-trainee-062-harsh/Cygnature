import React, {Component} from 'react'
import {TouchableOpacity, View, Text, Dimensions, TextInput, StyleSheet, AsyncStorage} from 'react-native'
 
import Modal from 'react-native-modalbox'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width

class Data extends Component {
    componentWillMount = async() =>{
        let auth = await AsyncStorage.getItem('auth');
        this.state.auth = auth;
        console.warn(this.state.auth)
    }
    state = {
        name: '',
        email: '',
        mobNu: '',
        jobT: '',
        jobD: '',
        auth: null,
        rMes: null,

    }

    show = () => {
        this.refs.myModal.open()
    }
    add = () => {
        //console.warn("add contact api")
        
        // console.warn(this.state.name)
        // console.warn(this.state.email)
        // console.warn(this.state.mobNu)
        // console.warn(this.state.jobT)
        // console.warn(this.state.jobD)

        return fetch('http://cygnatureapipoc.stagingapplications.com/api/contact/add', {
            method: 'POST',
            headers: {
                'Authorization': this.state.auth,
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
                this.setState({pdVisible: false})
                if(responseJson["message"] == null) {
                    Alert.alert(
                        'Contact Adding Failed!',
                        'Try Again',
                        [
                        {text: 'OK'},
                        ],
                        {cancelable: true},
                    );
                }
                else {
                    this.state.rMes=responseJson["message"]
                    this.refs.myModal.close()
                    Alert.alert(
                        'Contact Added !',
                        [
                        {text: 'OK'},
                        ],
                        {cancelable: true},
                    );
                    //console.warn(this.state.data)
                    //this.props.navigation.navigate('Login',{"message":this.state.rMes})
                }

                console.warn(responseJson["message"])
            })
            .catch((error) => {
                console.warn(error);
            });
        
        
    }
    update=(value, text)=> {
        switch(value) {
            case "name": {
                this.setState({name: text})
                return
            }
            case "email": {
                this.setState({email: text})
                return
            }
            case "mobNu": {
                this.setState({mobNu: text})
                return
            }
            case "jobT": {
                this.setState({jobT: text})
                return
            }
            case "jobD": {
                this.setState({jobD: text})
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
            onClosed={() =>{
                //console.warn("modal closed")
            }}
            >
            <TextInput
                style={ styles.textIn }
                placeholder="Enter Name *"
                onChangeText={text => this.update("name",text)}
                value={this.state.name}
                />
            <TextInput
                style={ styles.textIn }
                placeholder="Enter Email *"
                onChangeText={text => this.update("email",text)}
                value={this.state.email}
                />
            <TextInput
                style={ styles.textIn }
                placeholder="Enter Mobile Number *"
                onChangeText={text => this.update("mobNu",text)}
                value={this.state.mobNu}
                />
            <TextInput
                style={ styles.textIn }
                placeholder="Enter Job Title"
                onChangeText={text => this.update("jobT",text)}
                value={this.state.jobT}
                />
            <TextInput
                style={ styles.textIn }
                placeholder="Enter Job Desc"
                onChangeText={text => this.update("jobD",text)}
                value={this.state.jobD}
                />
           <TouchableOpacity style={ styles.btnSave } onPress={this.add}>
                    <Text style={styles.textSave}>Add Contact</Text>
            </TouchableOpacity>

            </Modal>
                )
         }
     }

export default Data

const styles = StyleSheet.create({
    modal:{
        justifyContent: 'center',
        shadowRadius:10,
        width:width-80,
        height:height/2,
    },
    textIn: {
        height: 40,
        borderBottomColor: 'gray',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        borderBottomWidth: 1,
    },
    btnSave: {
        backgroundColor: '#003d5a',
        marginLeft: "33%",
        marginRight: "33%",
        marginTop: 20,
    },
    textSave: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
})