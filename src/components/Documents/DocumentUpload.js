import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput, AsyncStorage} from 'react-native'
import DocumentUpload_SignerModal from './DocumentUpload_SignerModal';
import DocumentUpload_ObserverModal from './DocumentUpload_ObserverModal';

import moment from 'moment';

import DatePicker from 'react-native-datepicker'

import { CheckBox } from 'react-native-elements'
class DocumentUpload extends Component {
    constructor(props) {
        super(props)
        this.state.data = this.props.navigation.getParam('data')
        console.warn(this.state.data)
        this.state.currentDate = (moment().utcOffset("+5:30").format("DD-MM-YYYY"))
    }

    componentDidMount = async() =>{
        this.state.auth = await AsyncStorage.getItem('auth')
    }

    state = {
        auth: null,
        data: [],
        count: 0,
        date :null,
        currentDate: null,
        signerIds: [],
        observerIds: [],
        opacity: 0.5,
        disabled: true,
        signers : [],
        observors: [],
        checked1: false,
        checked2: false,
        enabled: false,
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
                
                setTimeout(() => {
                    this.state.signers.push(data)
                }, 1000);
            })
            .catch((error) => {
                console.warn(error);
            });
        })
        this.state.signerIds = Ids
        console.warn(this.state.signers[0])
        this.check();
    }

    check(){
        if(this.state.signerIds != []){
            this.setState({
                opacity: 1,
                disabled: false,
                enabled: true,
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
        // this.props.navigation.navigate('Test', {
        //     'data' : this.state.data,
        //     'signers': this.state.signers
        // })
    }

    onChangeCheck1() {
        this.setState({ checked2: false})
        this.setState({ checked1: !this.state.checked1})
    }

    onChangeCheck2() {
        this.setState({ checked1: false})
        this.setState({ checked2: !this.state.checked2})
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
                    !this.state.enabled ? 
                    <View>
                        <Text style={styles.textData}>
                            No signers present at this moment.{"\n"}
                            *Select at least one contact.
                        </Text>
                    </View>
                    :
                        <View>
                        <Text style={styles.textData}>
                                {this.state.signers["label"]}
                            </Text>
                        </View>
                    
                }
                <View style={{marginLeft:5}}>
                    <TouchableOpacity style={{backgroundColor: "#003d5a",borderRadius: 5, width:100, justifyContent:'center', alignItems:'center'}} onPress={() => { this.refs.DocumentUpload_SignerModal.show() }}>
                        <Text style={[styles.textData, {color:'white'}]}>Select</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.textTitle}>Observors:</Text>
                {
                    this.state.observors[0] == [] ? 
                    <View>
                        <Text>
                            No signers present at this moment.{"\n"}
                            *Select at least one contact.
                        </Text>
                    </View>
                    :
                    this.state.observors.map((index) => {
                        <View>
                            <Text>
                                {index["label"]}
                            </Text>
                        </View>
                    })
                }

                <View style={{marginLeft:5}}>
                <TouchableOpacity style={{backgroundColor: "#003d5a",borderRadius: 5, width:100, justifyContent:'center', alignItems:'center'}} onPress={() => { this.refs.DocumentUpload_SignerModal.show() }}>
                        <Text style={[styles.textData, {color:'white'}]}>Select</Text>
                    </TouchableOpacity>
                </View>

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
                <View style={{flex:1}}>
                    <Text style={styles.textTitle}>Signature Flow: </Text>
                    <CheckBox
                        title='Sequential'
                        textStyle={{color: 'black', fontWeight: 'normal', fontSize:17}}
                        uncheckedColor="black"
                        checkedColor="#003d5a"
                        size={20}
                        checked={this.state.checked1}
                        containerStyle={{ backgroundColor:'white', borderColor: 'white' }}
                        onPress={() => this.onChangeCheck1()}
                    />
                    <CheckBox
                        title='Parallel'
                        textStyle={{color: 'black', fontWeight: 'normal', fontSize:17}}
                        uncheckedColor="black"
                        checkedColor="#003d5a"
                        size={20}
                        checked={this.state.checked2}
                        containerStyle={{ backgroundColor:'white', borderColor: 'white' }}
                        onPress={() => this.onChangeCheck2()}
                    />
                </View>

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
                    <View style={{ flex: 0.5,  opacity: 1}}>
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
        borderColor:'black',
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
        fontFamily: 'Helvetica',
        fontSize: 17
    },
    buttonContainer: {
        backgroundColor: "#003d5a",
        borderRadius: 5,
        paddingVertical: 10,
        padding: 10,
        marginLeft: "66%",
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
})