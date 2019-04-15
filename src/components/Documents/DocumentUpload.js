import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput, AsyncStorage} from 'react-native'
import DocumentUpload_SignerModal from './DocumentUpload_SignerModal';
import DocumentUpload_ObserverModal from './DocumentUpload_ObserverModal';
import { CheckBox } from 'react-native-elements'

import moment from 'moment';

import DatePicker from 'react-native-datepicker'

class DocumentUpload extends Component {
    constructor(props) {
        super(props)
        this.state.data = this.props.navigation.getParam('data')
        this.state.currentDate = (moment().utcOffset("+5:30").format("DD-MM-YYYY"))
    }

    componentDidMount = async() =>{
        this.state.auth = await AsyncStorage.getItem('auth')
    }

    state = {
        checked1: false,
        checked2: false,
        auth: null,
        data: [],
        count: 0,
        date :null,
        currentDate: null,
        signerIds: [],
        observerIds: [],
        opacity: 0.5,
        disabled: true,
        signers : []
    }

    static navigationOptions = {
        title: "Document Upload"
    }

    addSigners(Ids) {
        Ids.map((item) => {
            return fetch('http://cygnatureapipoc.stagingapplications.com/api/contact/get-contact-by-id/'+item,{
            method: 'GET',
            headers: {
                'Authorization': this.state.auth
            }}).then((response) => response.json())
            .then((responseJson) => {
                let data = JSON.parse('{ "label": "'+responseJson["data"][0]["name"]+'", "value": "'+responseJson["data"][0]["Id"]+'"}');
                this.state.signers.push(data)
            })
            .catch((error) => {
                console.warn(error);
            });
        })
        this.state.signerIds = Ids
        this.check();
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
            'signers': this.state.signers
        })
    }
    onChangeCheck1() {
        this.setState({ checked1: !this.state.checked1, checked2:false})
    }
    onChangeCheck2() {
        this.setState({ checked2: !this.state.checked2, checked1:false})
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
                   
                    this.state.signers.map(() => {
                        <View>
                            <Text>
                                {this.state.signers}
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
                <CheckBox
                        title='Remember Me'
                        textStyle={{color: 'black'}}
                        uncheckedColor="black"
                        checkedColor="#6eab52"
                        size={20}
                        checked={this.state.checked1}
                        onPress={() => this.onChangeCheck1()}
                    /> 
                     <CheckBox
                    title='Remember Me'
                    textStyle={{color: 'black'}}
                    uncheckedColor="black"
                    checkedColor="#6eab52"
                    size={20}
                    checked={this.state.checked2}
                    onPress={() => this.onChangeCheck2()}
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
                            <Text style = { styles.buttonText }>Add Placeholder</Text>
                        </TouchableOpacity>
                    </View>
                    : 
                    <View style={{ flex: 0.5, opacity: 1}}>
                        <TouchableOpacity
                            style = { styles.buttonContainer}
                            disabled = {this.state.disabled}
                        >
                            <Text style = { styles.buttonText }>Add Placeholder</Text>
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
        marginLeft: "66%",
        borderRadius: 5,
        paddingVertical: 10,
        padding: 10,
        margin: 10,
        width: 100,
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
})