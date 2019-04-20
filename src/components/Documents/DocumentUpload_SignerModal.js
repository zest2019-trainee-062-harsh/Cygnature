import React, {Component} from 'react'
import {View, StyleSheet, Text, Dimensions, AsyncStorage,TouchableOpacity, FlatList} from 'react-native'
import Modal from 'react-native-modalbox'

import Icon from 'react-native-vector-icons/Ionicons'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width
 
class DocumentUpload_SignerModal extends Component {
    constructor(props) {    
        super(props)
        this.view()
    }
        
    show = () => {
        this.refs.myModal.open()
    }

    state = {
        auth: null,
        checked: false,
        contactsCount : 0,
        res:[],
        data:[],
        contactId: null,
        refreshing:false,
        signerIds: [],
        signerIdsWithName: []
    }

    onRefresh = () => {
        this.setState({refreshing: true});
        this.view().then(() => {
            this.setState({refreshing: false});
        });
    }
    
    onChangeCheck= () => {
        this.setState({ checked: !this.state.checked})
        console.warn(this.state.checked)
    }

    view = async() => {
        let auth = await AsyncStorage.getItem('auth');
        this.state.auth = auth;
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/contact/get/',{
        method: 'GET',
        headers: {
            'Authorization':this.state.auth
        }}).then((response) => response.json())
        .then((responseJson) => { 
            this.state.res.map((y) => {
                this.state.data.pop(y)
                })
            this.setState({res: responseJson["data"], contactsCount: 1})
            //console.warn(this.state.data)
            this.state.res.map((y) => {
                this.state.data.push(y)
                })
                if(this.state.data.length < 1) {
                    this.setState({ contactsCount: 0})
                }
        })
        .catch((error) => {
            console.warn(error);
        });      
    }

    addSigners(Id){
        let ID = Id
        this.state.signerIds.push(ID)
        let filteredArray = this.state.data.filter(item => item.Id !== Id)
        this.setState({data: filteredArray});
    }

    sendSigners(){
        this.refs.myModal.close();
        this.props.parentFlatList.addSigners(this.state.signerIds);
        this.state.signerIds = []
    }

    render() {
        if( this.state.contactsCount == 0) {
            return (
                <Modal
                    ref={"myModal"}
                    style={ styles.modal }
                    position= 'center'
                    backdrop={true}
                >
                    <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
                        <Icon name="md-alert" color='black' size={100} />
                        <Text style={{ fontSize:17, fontWeight: 'bold'}}> NO Contacts </Text>
                        <Text style={{marginLeft:"20%", marginRight:"20%", fontSize:17, fontStyle: 'italic' }}>
                            You can add contacts by clicking "+" button at bottom right.
                        </Text>
                    </View>
                </Modal>
            )
        }
        else {
            return (
                <Modal
                    ref={"myModal"}
                    style={ styles.modal }
                    position= 'center'
                    backdrop={true}
                >
                    <Text style={{margin:10, fontSize:17, color: 'black'}}>
                        Contact(s)
                    </Text>
                    <FlatList
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                        data={this.state.data}
                        keyExtractor={(item, index) => item.Id}
                        bounceFirstRowOnMount
                        maxSwipeDistance={160}
                        renderItem={this._renderItem.bind(this)}
                    />
                    <TouchableOpacity style={ styles.btnSave }
                        onPress={() =>
                            this.sendSigners()
                        }
                        >
                        <Text style={styles.textSave}>Select Signers</Text>
                    </TouchableOpacity>
                </Modal>
            )
        }
    }

    _renderItem({ item }) {
        return (
            <View style={styles.row}>
                <TouchableOpacity onPress={() => this.addSigners(item.Id, item.name)}>
                    <Text style={styles.rowDataText1}>{item.name}</Text>
                    <Text style={styles.rowDataText2}>{item.email}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default DocumentUpload_SignerModal

const styles = StyleSheet.create({
    modal:{
        justifyContent: 'center',
        shadowRadius:20,
        width:width-80,
        height:height*.5,
        borderColor:'#003d5a',
        borderWidth: 1,
        borderRadius:5,
    },
    row: {
        margin:5,  
        borderColor:'#003d5a',
        borderWidth: 1,
        borderRadius:5,
    },
    rowDataText1: {
        marginLeft: 20,
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black'
    },
    rowDataText2: {
        marginLeft:25,
        fontSize: 15,
        color: 'black'
    },
    btnSave: {
        backgroundColor: '#003d5a',
        marginLeft: "25%",
        marginRight: "25%",
        height:40,
        marginTop: 20,
        padding: 20,
        justifyContent: 'center',
        borderRadius: 5
    },
    textSave: {
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
})