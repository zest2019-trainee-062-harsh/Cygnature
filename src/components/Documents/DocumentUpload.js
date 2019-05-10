import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput, AsyncStorage} from 'react-native'
import DocumentUpload_SignerModal from './DocumentUpload_SignerModal';
import DocumentUpload_ObserverModal from './DocumentUpload_ObserverModal';

import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import DatePicker from 'react-native-datepicker'

import { CheckBox } from 'react-native-elements'
class DocumentUpload extends Component {
    constructor(props) {
        super(props)
        this.state.data = this.props.navigation.getParam('data')
        var arr =  this.state.data["name"].split(".")
        var last = arr.pop()
        var first = arr.join(".")
        //console.warn(first +"sssss"+last)
        this.state.fileName = first
        this.state.fileExt = last
        this.state.currentDate = (moment().utcOffset("+5:30").format("DD-MM-YYYY"))
    }

    componentDidMount = async() =>{
        this.state.auth = await AsyncStorage.getItem('auth')
    }

    state = {
        auth: null,
        data: [],
        count: 0,
        fileName: "",
        fileExt: "",
        documentDescription: "",
        date :null,
        currentDate: null,
        signerIds: [],
        observerIds: [],
        opacity: 0.5,
        disabled: true,
        signers : [],
        observers: [],
        checked1: false,
        checked2: false,
        signerViewEnabled: false,
        signerButtonDisabled: false,
        observerViewEnabled: false,
        observerButtonDisabled: false,
    }

    static navigationOptions = {
        title: "Document Upload"
    }
    
    check(){
        if(this.state.signerIds != []){
            this.setState({
                opacity: 1,
                disabled: false,
                signerViewEnabled: true,
            })
        }

        if(this.state.observerIds != []){
            this.setState({
                opacity: 1,
                disabled: false,
                observerViewEnabled: true,
            })
        }
    }


    addSigners(Ids) {
        this.state.signerIds = Ids
        Ids.map((item) => {
            return fetch('http://cygnatureapipoc.stagingapplications.com/api/contact/get-contact-by-id/'+item,{
            method: 'GET',
            headers: {
                'Authorization': this.state.auth
            }}).then((response) => response.json())
            .then((responseJson) => {
                //console.warn(responseJson)
                let data = JSON.parse('{ "label": "'+responseJson["data"][0]["name"]+'","shortName": "'+responseJson["data"][0]["shortName"]+'", "value": "'+responseJson["data"][0]["Id"]+'"}');
                this.state.signers.push(data)
                
                //console.warn(this.state.signers)
                this.setState({signerViewEnabled:true, signerButtonDisabled: true})
            })
            .catch((error) => {
                console.warn(error.message);
            });
        })
        this.check();
    }

    addObservers(Ids) {
        this.state.observerIds = Ids
        Ids.map((item) => {
            return fetch('http://cygnatureapipoc.stagingapplications.com/api/contact/get-contact-by-id/'+item,{
            method: 'GET',
            headers: {
                'Authorization': this.state.auth
            }}).then((response) => response.json())
            .then((responseJson) => {
                //console.warn(responseJson)
                let data = JSON.parse('{ "label": "'+responseJson["data"][0]["name"]+'","shortName": "'+responseJson["data"][0]["shortName"]+'", "value": "'+responseJson["data"][0]["Id"]+'"}');
                this.state.observers.push(data)
                
                //console.warn(this.state.observers)
                this.setState({observerViewEnabled:true, observerButtonDisabled: true})
            })
            .catch((error) => {
                console.warn(error.message);
            });
        })
        this.check();
    }

    assignData(){
            this.props.navigation.navigate('Document_PlaceHolder', {
                'data' : this.state.data,
                'signers': this.state.signers,
                'documentDescription': this.state.documentDescription,
                'expiryStartDate': this.state.currentDate,
                'expiryEndDate': this.state.date,
                'fileExtension' : this.state.fileExt,
                'fileName': this.state.fileName,
            })
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
                <View style={{flex:1, flexDirection: 'row'}}>
                    <View style={{flex:0.1, alignContent:'center', justifyContent: 'center' }}>
                        {this.state.fileExt == "pdf" ?
                            <Icon
                                name="file-pdf-o"
                                size={40}
                                color="#003d5a"
                            /> : null
                        }
                        {this.state.fileExt == "docx" || this.state.fileExt == "doc" ?
                            <Icon
                                name="file-word-o"
                                size={40}
                                color="#003d5a"
                            /> : null
                        }
                    </View>
                    <View style={{flex:0.9,alignContent:'center', justifyContent: 'center' }}>
                        <TextInput 
                            placeholderTextColor='black'
                            keyboardType="name-phone-pad"
                            placeholder = "Enter file name"
                            returnKeyType="done"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.boxTINew} 
                            value={this.state.fileName}
                            onChangeText={ (text) => {
                                            this.setState({fileName:text})
                                        }}
                        />
                    </View>
                </View>

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
                    onChangeText={ (text) => {
                        this.setState({documentDescription: text})
                    }}
                />

                <Text style={styles.textTitle}>Signers: * </Text>
                {
                    !this.state.signerViewEnabled ? 
                    <View>
                        <Text style={styles.textData}>
                            No signers present at this moment.{"\n"}
                            *Select at least one contact.
                        </Text>
                    </View>
                    :
                    this.state.signers.map((_data, index, _array) => {
                        return(
                                <View style={{margin:10,marginBottom:20}} key={this.state.signers[index]["value"]} >
                                    <TouchableOpacity disabled style={[styles.rowDataBg, {marginLeft:15}]}>
                                        <Text style={styles.rowDataText1}>{this.state.signers[index]["shortName"]}</Text>
                                    </TouchableOpacity>
                                    <View style={{marginTop: 7}}>
                                        <Text style={[styles.rowDataText2, {marginLeft:60}]}>
                                            {this.state.signers[index]["label"]}
                                        </Text>
                                    </View>
                                </View>
                        )
                    })
                }
                <View style={{marginLeft:5}}>
                {this.state.signerButtonDisabled ? null :
                    <TouchableOpacity
                        style={{backgroundColor: "#003d5a",borderRadius: 5, width:'auto', justifyContent:'center', alignItems:'center'}}
                        onPress={() => { this.refs.DocumentUpload_SignerModal.show() }}
                    >
                        <Text style={[styles.textData, {color:'white'}]}>Add Signers</Text>
                    </TouchableOpacity>
                }
                </View>


                <Text style={styles.textTitle}>Observers:</Text>
                {
                    !this.state.observerViewEnabled ? 
                        null
                    :
                    this.state.observers.map((_data, index, _array) => {
                        return(
                                <View style={{margin:10,marginBottom:20}} key={this.state.observers[index]["value"]} >
                                    <TouchableOpacity disabled style={[styles.rowDataBg, {marginLeft:15}]}>
                                        <Text style={styles.rowDataText1}>{this.state.observers[index]["shortName"]}</Text>
                                    </TouchableOpacity>
                                    <View style={{marginTop: 7}}>
                                        <Text style={[styles.rowDataText2, {marginLeft:60}]}>
                                            {this.state.observers[index]["label"]}
                                        </Text>
                                    </View>
                                </View>
                        )
                    })
                }

                <View style={{marginLeft:5}}>
                {this.state.observerButtonDisabled ? null :
                    <TouchableOpacity 
                        style={{backgroundColor: "#003d5a",borderRadius: 5, width:'auto', justifyContent:'center', alignItems:'center'}}
                        onPress={() => { this.refs.DocumentUpload_ObserverModal.show() }}
                    >
                            <Text style={[styles.textData, {color:'white'}]}>Add Observors</Text>
                    </TouchableOpacity>
                }
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
                            onPress={() => this.assignData()}
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
    rowDataBg: {
        position: 'absolute',
        width:35,
        height: 35,
        backgroundColor: '#003d5a',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowDataText1: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
        borderRadius: 5,
    },
    rowDataText2: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
    },
    boxTI: {
        margin: 5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        fontFamily: 'Helvetica',
        fontSize: 17
    },
    boxTINew: {
        borderBottomWidth: 1,
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