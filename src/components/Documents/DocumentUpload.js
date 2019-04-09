import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput, AsyncStorage} from 'react-native'
import DocumentUpload_SignerModal from './DocumentUpload_SignerModal';
import DocumentUpload_ObserverModal from './DocumentUpload_ObserverModal';

import moment from 'moment';

import DatePicker from 'react-native-datepicker'
import { checkPermission } from 'react-native-location';

class DocumentUpload extends Component {
    constructor(props) {
        super(props)
        this.state.data = this.props.navigation.getParam('data')
        this.state.currentDate = (moment().utcOffset("+5:30").format("DD-MM-YYYY"))
        this.view()
    }

    state = {
        auth: null,
        data: [],
        count: 0,
        date :null,
        currentDate: null,
        signerIds: [],
        signerIdsWithNames: [],
        observerIds: [],
        observerIdsWithNames: [],
        opacity: 0.5,
        disabled: true,
        contacts: [],
        res: []
    }

    static navigationOptions = {
        title: "Document Upload"
    }

    view = async() => {
        let auth = await AsyncStorage.getItem('auth');
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/contact/get/',{
        method: 'GET',
        headers: {
            'Authorization':auth
        }}).then((response) => response.json())
        .then((responseJson) => { 
            this.state.res.map((y) => {
                this.state.contacts.pop(y)
                })
            this.setState({res: responseJson["data"]})
            //console.warn(this.state.data)
            this.state.res.map((y) => {
                this.state.contacts.push(y)
            })
        })
        .catch((error) => {
            console.warn(error);
        });      
    }

    addSigners(Ids) {
        console.warn(this.state.contacts)
        this.state.signerIds = Ids
        this.check();
        console.warn(this.state.signerIds)
    }

    check(){
        if(this.state.signerIds != []){
            this.setState({
                opacity: 1,
                disabled: false
            })
        }
    }

    addObservers(Ids, Names) {
        this.state.observerIds = Ids
        this.state.observerIdsWithNames = Names
    }

    assignSigners(){
        this.props.navigation.navigate('Document_PlaceHolder', {
            'data' : this.state.data,
            'signerIds': this.state.signerIds
        })
    }

    render() {
        return(
            <View style={styles.mainContainer}>
                <Text style={styles.textTitle}>File Name: </Text>
                <Text style={styles.textData}>{this.state.data["name"]}</Text>

                <Text style={styles.textTitle}>Description: </Text>
                <TextInput 
                    textAlignVertical='top'
                    placeholderTextColor='black'
                    keyboardType="name-phone-pad"
                    placeholder = "Enter file description"
                    returnKeyType="done"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.boxTI} 
                    multiline={true} 
                    numberOfLines={3}
                />

                <Text style={styles.textTitle}>Signers: * </Text>
                {
                    this.state.signerIdsWithNames !== null ? 
                    <View>
                        <Text>
                            No signers present at this moment.{"\n"}
                            *Select at least one contact.
                        </Text>
                    </View>
                    :
                    this.state.signerIdsWithNames.map((key) => {
                        <View>
                            <Text>
                                {this.state.signerIdsWithNames[key]}
                            </Text>
                        </View>
                    })
                }
                <TouchableOpacity  onPress={() => { this.refs.DocumentUpload_SignerModal.show() }}>
                    <Text style={styles.textData}>Select</Text>
                </TouchableOpacity>
                
                <Text style={styles.textTitle}>Observers: </Text>
                <TouchableOpacity  onPress={() => { this.refs.DocumentUpload_ObserverModal.show() }}>
                    <Text style={styles.textData}>Select</Text>
                </TouchableOpacity>
                
                <Text style={styles.textTitle}>Due Date: </Text>
                <DatePicker
                    style={{width: 200}}
                    date={this.state.date}
                    mode="date"
                    placeholder="Select Date"
                    format="DD-MM-YYYY"
                    minDate={this.state.currentDate}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                />

                {
                    this.state.signerIds != [] ? 
                    <View
                        style={{ flex: 0.5, justifyContent: "center", alignItems: "center", 
                        opacity: this.state.opacity }}
                    >
                        <TouchableOpacity
                            style = { styles.buttonContainer}
                            onPress={() => this.assignSigners()}
                            disabled = {this.state.disabled}
                        >
                            <Text style = { styles.buttonText }>Assign the signers</Text>
                        </TouchableOpacity>
                    </View>
                    : 
                    <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center", opacity: 1}}>
                        <TouchableOpacity
                            style = { styles.buttonContainer}
                            onPress={() => this.props.navigation.navigate('Document_PlaceHolder')}
                            disabled = {this.state.disabled}
                        >
                            <Text style = { styles.buttonText }>Assign the signers</Text>
                        </TouchableOpacity>
                    </View>
                }

                <DocumentUpload_SignerModal ref={'DocumentUpload_SignerModal'}  parentFlatList={this}/>
                
                <DocumentUpload_ObserverModal ref={'DocumentUpload_ObserverModal'}  parentFlatList={this}/>
            </View>
        )
    }
}

export default DocumentUpload

const styles = StyleSheet.create({
    mainContainer:{
        borderWidth:1,
        borderColor:'#003d5a',
        flex:1,
        backgroundColor: 'white',
        margin: 7, 
        borderWidth: 2,
        borderRadius:5,
        borderColor: "#003d5a",
        padding: 10
    },
    textTitle: {
        color: 'black',
        fontSize: 17,
        fontWeight: 'bold',
    },
    textData: {
        color: 'black',
        fontSize: 17,
        margin:5
    },
    boxTI: {
        margin: 5,
        fontSize: 12,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        fontFamily: 'Helvetica'
    },
    buttonContainer: {
        backgroundColor: "#003d5a",
        borderRadius: 5,
        paddingVertical: 10,
        padding: 10,
        margin: 10,
        width: 100,
        justifyContent: "center",
        alignContent: "center"
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
})