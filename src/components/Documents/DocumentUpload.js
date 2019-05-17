import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput, AsyncStorage, ScrollView} from 'react-native'
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
        expiryStartDate :null,
        expiryEndDate :null,
        signingDueDate :null,
        currentDate: null,
        reminderBefore: 1,
        contactIds: [],
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


    addSigners(CIds, SIds) {
        this.state.contactIds.push(CIds)
        this.state.signerIds.push(SIds)
        CIds.map((item) => {
            return fetch('http://cygnatureapipoc.stagingapplications.com/api/contact/get-contact-by-id/'+item,{
            method: 'GET',
            headers: {
                'Authorization': this.state.auth
            }}).then((response) => response.json())
            .then((responseJson) => {
                //console.warn(responseJson)
                let data = JSON.parse('{ "label": "'+responseJson["data"][0]["name"]+'","shortName": "'+responseJson["data"][0]["shortName"]+'", "value": "'+responseJson["data"][0]["Id"]+'"}');
                this.state.signers.push(data)
                
                this.setState({signerViewEnabled:true, signerButtonDisabled: true})
            })
            .catch((error) => {
                console.warn(error.message);
            });
        })
        this.check();
    }

    addObservers(CIds, OIds) {
        this.state.observerIds.push(OIds)
        CIds.map((item) => {
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
                'signerIds': this.state.signerIds,
                'observerIds': this.state.observerIds,
                'documentDescription': this.state.documentDescription,
                'expiryStartDate': this.state.expiryStartDate,
                'expiryEndDate': this.state.expiryEndDate,
                'signingDueDate': this.state.signingDueDate,
                'reminderBefore': this.state.reminderBefore,
                'extension' : "."+this.state.fileExt,
                'fileName':this.state.fileName,
                'name' : this.state.fileName,
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
                <Text style={styles.textTitle}>File Name: <Text style={{color:'red'}}> * </Text> </Text>
                <View style={{flex:0.3, flexDirection: 'row', margin:5}}>
                    <View style={{flex:0.1, alignContent:'center', justifyContent: 'center' }}>
                        {this.state.fileExt == "pdf" ?
                            <Icon
                                name="file-pdf-o"
                                size={40}
                                color="red"
                            /> : null
                        }
                        {this.state.fileExt == "docx" || this.state.fileExt == "doc" ?
                            <Icon
                                name="file-word-o"
                                size={40}
                                color="blue"
                            /> : null
                        }
                        {this.state.fileExt == "pptx" || this.state.fileExt == "ppt" ?
                            <Icon
                                name="file-powerpoint-o"
                                size={40}
                                color="orange"
                            /> : null
                        }
                        {this.state.fileExt == "xlsx" || this.state.fileExt == "xls" ?
                            <Icon
                                name="file-excel-o"
                                size={40}
                                color="green"
                            /> : null
                        }
                    </View>
                    <View style={{flex:0.85,alignContent:'center', justifyContent: 'center', marginLeft: 20 }}>
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

                <Text style={styles.textTitle}>Signers: <Text style={{color:'red'}}> * </Text> </Text>
                <View style={{maxHeight:"50%"}}>
                <ScrollView horizontal={true}>
                {
                    !this.state.signerViewEnabled ? 
                        null
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
                </ScrollView>
                </View>
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
                <View style={{maxHeight:"50%"}}>
                <ScrollView horizontal={true}>
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
                </ScrollView>
                </View>
                <View style={{marginLeft:5}}>
                {this.state.observerButtonDisabled ? null :
                    <TouchableOpacity 
                        style={{backgroundColor: "#003d5a",borderRadius: 5, width:'auto', justifyContent:'center', alignItems:'center'}}
                        onPress={() => { this.refs.DocumentUpload_ObserverModal.show() }}
                    >
                            <Text style={[styles.textData, {color:'white'}]}>Add Observers</Text>
                    </TouchableOpacity>
                }
                </View>
                <View style={{flex:0.5 ,flexDirection: 'row'}}>
                    <View style={{flex: 0.5}}>
                        <Text style={styles.textTitle}>Expiry Start Date: <Text style={{color:'red'}}> * </Text> </Text>
                        <DatePicker
                            style={{width: 150}}
                            date={this.state.expiryStartDate}
                            mode="date"
                            placeholder="Select Date"
                            format="YYYY-MM-DD"
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
                            onDateChange={(date) => {this.setState({expiryStartDate: date})}}
                        />
                    </View>
                    <View style={{flex: 0.5}}>
                        <Text style={styles.textTitle}>Expiry End Date: <Text style={{color:'red'}}> * </Text> </Text>
                        <DatePicker
                            style={{width: 150}}
                            date={this.state.expiryEndDate}
                            mode="date"
                            placeholder="Select Date"
                            format="YYYY-MM-DD"
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
                            onDateChange={(date) => {this.setState({expiryEndDate: date})}}
                        />
                    </View>
                </View>

                <View style={{flex:0.5 ,flexDirection: 'row'}}>
                    <View style={{flex: 0.5}}>
                        <Text style={styles.textTitle}>Signing Due Date: <Text style={{color:'red'}}> * </Text> </Text>
                        <DatePicker
                            style={{width: 150}}
                            date={this.state.signingDueDate}
                            mode="date"
                            placeholder="Select Date"
                            format="YYYY-MM-DD"
                            minDate={this.state.expiryStartDate}
                            maxDate={this.state.expiryEndDate}
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
                            onDateChange={(date) => {this.setState({signingDueDate: date})}}
                        />
                    </View>
                    <View style={{flex: 0.5}}>
                        <Text style={styles.textTitle}>Reminder Before: <Text style={{color:'red'}}> * </Text> </Text>
                        <View style={{alignItems:'center', justifyContent:'center'}}>
                            <TextInput 
                                placeholderTextColor='black'
                                placeholder='-'
                                keyboardType="number-pad"
                                returnKeyType="done"
                                autoCapitalize="none"
                                maxLength={1}
                                autoCorrect={false}
                                style={[styles.boxTINew, {width:50, textAlign: 'center'}]} 
                                onChangeText={ (text) => {
                                                this.setState({reminderBefore:text})
                                            }}
                            />
                        </View>
                    </View>
                </View>

                <View style={{flex:1}}>
                    <Text style={styles.textTitle}>Signature Flow: <Text style={{color:'red'}}> * </Text> </Text>
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