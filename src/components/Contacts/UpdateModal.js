import React, {Component} from 'react'
import {TouchableOpacity, View, Text, Dimensions, TextInput,
     StyleSheet, AsyncStorage, } from 'react-native'
 
import Modal from 'react-native-modalbox'
import { ProgressDialog } from 'react-native-simple-dialogs';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width

class UpdateModal extends Component {
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
        pdVisible: true,
        res:[],
        res1: null,
        status: false,
        contactId: null,
        
    }

    show = (text) => {
        

        return fetch('http://cygnatureapipoc.stagingapplications.com/api/contact/get-contact-by-id/'+(text),{
        method: 'GET',
        headers: {
            'Authorization':this.state.auth
            // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.N9w0jV/v+9PKjqTQVRpre2jTzBser7/a/Thzwn6/3UCGTehr+Gk9tZrbfUo0jndFhKFx2ywj3gA0kjDn9uf/mrfnjcwIru3WHKGL1lhTCxH/Uf7NYBtBbAd5M1f77b2aqFJHSXiQ0miSqKUB2cipfOf88VU+XiCO57FQtQzRFX0BtR5LZHaZQqSMMj8y47n6M86I6CKl/SntvdAyzVMh7uXFWsaYHY/nKmyIunJgewZM3q2ImLEx7ndLwRT1Kpus2er5pnvq19gX43RfAEkl80kK7axwGX2rPYYpoedDBXS35npshScOXwmZhiv36CmefEFHYLgFb83BWVafahApZ5huYSa1DHVNA6rCFJmrEdIZSVy/3U3prOcyiOsRM11DwsXwuJoOVYlwJgvluzUgDz32moOaTde6a1vkrdMaedYDyNNolAGSQ1Pu3+CKxRmp2tRpNY7GaajQVLaie574mFc2BGCwJdrueGAA8DuCPCgN2fpVlMYrufbYI7om3MnSjypSyoFuWg4O+4PG72+Qm5HvUfADtSbX4REh6XWBwyt89NRYf9f/qp/S3aLWZ8XsY5akfYKBECZQ6H6Z3rVRxAW7OgnqlPlAMBSw+DqAi3+28ActC0gqb3KOiDJFb3jIT4OoAMBRAA3hdAmblTr6EwpPmbxXqoCZ2CFL/PQqA/OTuKiBadJ1ZxkxCuFcb2Cl2J1fHnRKKWqv3CY4UMyBVkIFH2zGCh3g5IgaG3hH6IYaM2xrtMNJ2AZRByaG0ki5r99ydraBgmbN6OhEaKYlnG5RqR3tuIpNieQDbe6hFZEpvqk8iOk4pD2/nm2gBbymmt9bQcX1giYgYVUgsOUBytjTawP4g1BeJ0Rt0w0ev/jotRYNpxQaWs5aMGMYfdPW.ooqT_toFub_53Hn22ZdRhSAkcNnJrnwlDag93pWBvlA',
        }}).then((response) => response.json())
        .then((responseJson) => {
            this.setState({res: responseJson["data"], res1: responseJson["data"][0]["name"],status:true})
            //console.warn(this.state.res)
            this.refs.myModal.open()
            this.setState({contactId: text})
            //console.warn(this.state.contactId)
        
        })
        .catch((error) => {
            console.warn(error);
        });      
        //console.warn(text)

        
    }
    add = () => {
        //console.warn("add contact api")
        
        // console.warn(this.state.name)
        // console.warn(this.state.email)
        // console.warn(this.state.mobNu)
        // console.warn(this.state.jobT)
        // console.warn(this.state.jobD)

        return fetch('http://cygnatureapipoc.stagingapplications.com/api/contact/update/'+(this.state.contactId), {
            method: 'PUT',
            headers: {
                //'Authorization': this.state.auth,
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.N9w0jV/v+9PKjqTQVRpre2jTzBser7/a/Thzwn6/3UCGTehr+Gk9tZrbfUo0jndFhKFx2ywj3gA0kjDn9uf/mrfnjcwIru3WHKGL1lhTCxH/Uf7NYBtBbAd5M1f77b2aqFJHSXiQ0miSqKUB2cipfOf88VU+XiCO57FQtQzRFX0BtR5LZHaZQqSMMj8y47n6M86I6CKl/SntvdAyzVMh7uXFWsaYHY/nKmyIunJgewZM3q2ImLEx7ndLwRT1Kpus2er5pnvq19gX43RfAEkl80kK7axwGX2rPYYpoedDBXS35npshScOXwmZhiv36CmefEFHYLgFb83BWVafahApZ5huYSa1DHVNA6rCFJmrEdIZSVy/3U3prOcyiOsRM11DwsXwuJoOVYlwJgvluzUgDz32moOaTde6a1vkrdMaedYDyNNolAGSQ1Pu3+CKxRmp2tRpNY7GaajQVLaie574mFc2BGCwJdrueGAA8DuCPCgN2fpVlMYrufbYI7om3MnSjypSyoFuWg4O+4PG72+Qm5HvUfADtSbX4REh6XWBwyt89NRYf9f/qp/S3aLWZ8XsY5akfYKBECZQ6H6Z3rVRxAW7OgnqlPlAMBSw+DqAi3+28ActC0gqb3KOiDJFb3jIT4OoAMBRAA3hdAmblTr6EwpPmbxXqoCZ2CFL/PQqA/OTuKiBadJ1ZxkxCuFcb2Cl2J1fHnRKKWqv3CY4UMyBVkIFH2zGCh3g5IgaG3hH6IYaM2xrtMNJ2AZRByaG0ki5r99ydraBgmbN6OhEaKYlnG5RqR3tuIpNieQDbe6hFZEpvqk8iOk4pD2/nm2gBbymmt9bQcX1giYgYVUgsOUBytjTawP4g1BeJ0Rt0w0ev/jotRYNpxQaWs5aMGMYfdPW.ooqT_toFub_53Hn22ZdRhSAkcNnJrnwlDag93pWBvlA',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.contactId,
                name: this.state.res1,
                email: this.state.res[0]["email"],
                countryId: "91",
                mobileNumber: this.state.res[0]["mobileNumber"]
            
            }),
            }).then((response) => response.json())
            .then((responseJson) => {
                
                console.warn(responseJson["message"])
            })
            .catch((error) => {
                console.warn(error);
            });
        
        
    }
    update=(text)=> {
        this.setState({res1: text})
        
        // switch(value) {
        //     case "name": {
        //         this.setState({res[0]: text})
        //         return
        //     }
        //     case "email": {
        //         this.setState({email: text})
        //         return
        //     }
        //     case "mobNu": {
        //         this.setState({mobNu: text})
        //         return
        //     }
        //     case "jobT": {
        //         this.setState({jobT: text})
        //         return
        //     }
        //     case "jobD": {
        //         this.setState({jobD: text})
        //         return
        //     }
        // }
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
          
            <Text style={{marginLeft:14, fontSize: 16,  color: 'black', fontWeight:'bold'}}>Update Contact</Text>
         
            {this.state.status ?
         
         <TextInput
                style={ styles.textIn }
                placeholder="Enter Name *"
                placeholderTextColor='grey'
                returnKeyType="next"
                keyboardType="name-phone-pad"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => this.update(text)}
                onSubmitEditing={() => this.ref1.focus()}
                value={this.state.res1}
                />: null}

             {this.state.status ?
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
                value={this.state.res[0]["email"]}
                />: null}

            {this.state.status ?
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
                value={this.state.res[0]["mobileNumber"]}
                />
                : null}

                
            {this.state.status ?
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
                value={this.state.res[0]["jobTitle"]}
                /> : null}

            {this.state.status ?
            <TextInput
                style={ styles.textIn }
                placeholder="Enter Job Desc"
                placeholderTextColor='grey'
                returnKeyType="done"
                keyboardType="name-phone-pad"
                autoCapitalize="none"
                autoCorrect={false}
                ref={(input) => this.ref4 = input}
                value={this.state.res[0]["jobDescription"]}
                /> : null}


           <TouchableOpacity style={ styles.btnSave } onPress={this.add}>
                    <Text style={styles.textSave}>Update Contact</Text>
            </TouchableOpacity>
            
            </Modal>
                )
         }
     }

export default UpdateModal

const styles = StyleSheet.create({
    modal:{
        justifyContent: 'center',
        shadowRadius:10,
        width:width-80,
        height:height/2,
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
        marginTop: 20,
    },
    textSave: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
})