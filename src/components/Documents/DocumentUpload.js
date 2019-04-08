import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native'
import { Dimensions } from "react-native"
import DocumentUpload_SignerModal from './DocumentUpload_SignerModal';
import DocumentUpload_ObserverModal from './DocumentUpload_ObserverModal';

import DatePicker from 'react-native-datepicker'

import moment from 'moment';
 
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width

class DocumentUpload extends Component {
    constructor(props) {
        super(props)
        //this.state.data  = this.props.navigation.getParam('data')
    
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        this.state.currentDate = '0'+ date + '-' + '0'+ month + '-' + year
    }

    state = {
        data: [],
        count: 0,
        date :null,
        currentDate: null,
    }

    static navigationOptions = {
        title: "Document Upload"
    }

    addSigner() {
        console.warn("yes")
    }

    render() {

        return(
            <View style={styles.mainContainer}>
                <Text style={styles.textTitle}>File Name: </Text>
                {/* <Text style={styles.textData}>{this.state.data['name']} </Text> */}
                <Text style={styles.textData}>{this.state.currentDate}</Text>

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
                    numberOfLines={3} />

                <Text style={styles.textTitle}>Signers: * </Text>
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
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
                
                <TouchableOpacity style = { styles.buttonContainer} onPress={() => this.props.navigation.navigate('Document_PlaceHolder')}>
                        <Text style = { styles.buttonText }>Add PlaceHolder</Text>
                </TouchableOpacity>
                
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
<<<<<<< HEAD
    imageContainer: {
        borderColor:'#003d5a',
        borderWidth:1,
        width:width/1.4,
        height:height/2,
=======
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
>>>>>>> 2f74a44a8bde6794c7bf2cb83d77baed90f7ea29
    },
    buttonContainer: {
        backgroundColor: '#003d5a',
        paddingVertical: 10,
        margin: 5,
        marginLeft: "66%",
        borderRadius: 5
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
})