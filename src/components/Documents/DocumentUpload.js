import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native'
import { Dimensions } from "react-native"
import DocumentUpload_AddModal from './DocumentUpload_AddModal';
 
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width

class DocumentUpload extends Component {
    constructor(props) {
        super(props)
        this.state.data  = this.props.navigation.getParam('data')
    }

    state = {
        data: [],
        count: 0,
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
                <Text style={styles.textData}>{this.state.data['name']} </Text>

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
                <TouchableOpacity  onPress={() => { this.refs.DocumentUpload_AddModal.show() }}>
                    <Text style={styles.textData}>Select</Text>
                </TouchableOpacity>
                <View>

                </View>
                
                <DocumentUpload_AddModal ref={'DocumentUpload_AddModal'}  parentFlatList={this}/>
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
        fontFamily: 'Helvetica'
    },
})