import React, {Component} from 'react'
import {View, StyleSheet, Text, Dimensions, AsyncStorage,TouchableOpacity, SwipeableFlatList} from 'react-native'
import Modal from 'react-native-modalbox'

import Icon from 'react-native-vector-icons/Ionicons'
import { CheckBox } from 'react-native-elements'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width
 
class DocumentUpload_AddModal extends Component {
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
        refreshing:false
    }
     onRefresh = () => {
        this.setState({refreshing: true});
        this.view().then(() => {
          this.setState({refreshing: false});
        });
      }
    
      onChangeCheck() {
        this.setState({ checked: !this.state.checked})
    }
    view = async() => {
        let auth = await AsyncStorage.getItem('auth');
        this.state.auth = auth;
        //this.setState({res:" ", data: " "})
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/contact/get/',{
        method: 'GET',
        headers: {
            'Authorization':this.state.auth
            // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.N9w0jV/v+9PKjqTQVRpre2jTzBser7/a/Thzwn6/3UCGTehr+Gk9tZrbfUo0jndFhKFx2ywj3gA0kjDn9uf/mrfnjcwIru3WHKGL1lhTCxH/Uf7NYBtBbAd5M1f77b2aqFJHSXiQ0miSqKUB2cipfOf88VU+XiCO57FQtQzRFX0BtR5LZHaZQqSMMj8y47n6M86I6CKl/SntvdAyzVMh7uXFWsaYHY/nKmyIunJgewZM3q2ImLEx7ndLwRT1Kpus2er5pnvq19gX43RfAEkl80kK7axwGX2rPYYpoedDBXS35npshScOXwmZhiv36CmefEFHYLgFb83BWVafahApZ5huYSa1DHVNA6rCFJmrEdIZSVy/3U3prOcyiOsRM11DwsXwuJoOVYlwJgvluzUgDz32moOaTde6a1vkrdMaedYDyNNolAGSQ1Pu3+CKxRmp2tRpNY7GaajQVLaie574mFc2BGCwJdrueGAA8DuCPCgN2fpVlMYrufbYI7om3MnSjypSyoFuWg4O+4PG72+Qm5HvUfADtSbX4REh6XWBwyt89NRYf9f/qp/S3aLWZ8XsY5akfYKBECZQ6H6Z3rVRxAW7OgnqlPlAMBSw+DqAi3+28ActC0gqb3KOiDJFb3jIT4OoAMBRAA3hdAmblTr6EwpPmbxXqoCZ2CFL/PQqA/OTuKiBadJ1ZxkxCuFcb2Cl2J1fHnRKKWqv3CY4UMyBVkIFH2zGCh3g5IgaG3hH6IYaM2xrtMNJ2AZRByaG0ki5r99ydraBgmbN6OhEaKYlnG5RqR3tuIpNieQDbe6hFZEpvqk8iOk4pD2/nm2gBbymmt9bQcX1giYgYVUgsOUBytjTawP4g1BeJ0Rt0w0ev/jotRYNpxQaWs5aMGMYfdPW.ooqT_toFub_53Hn22ZdRhSAkcNnJrnwlDag93pWBvlA',
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
                //console.warn(this.state.data)
        })
        .catch((error) => {
            console.warn(error);
        });      
    }

     render() {if( this.state.contactsCount == 0) {
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
        <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
        <Icon name="md-alert" color='black' size={100} />
        <Text style={{ fontSize:25, fontWeight: 'bold'}}> NO Contacts </Text>
        <Text style={{marginLeft:"20%", marginRight:"20%", fontSize:25, fontStyle: 'italic' }}>
         You can add contacts by clicking "+" button at bottom right.
         </Text>
        


        <TouchableOpacity style={styles.floatButton} onPress={this.floatClicked}>
                    <Text style={styles.floatButtonText}>+</Text>
        </TouchableOpacity>

        </View></Modal>
            )
        }
        else {
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
            <View style={{
                borderColor:'#003d5a',
                borderWidth: 2,
                borderRadius:5,
                flex:1,
                backgroundColor: 'white',
                margin: 7,
                padding: 10}
            }>
            <Text style={{margin:10, fontSize:24, fontWeight: 'bold', color: 'black'}}>
                Contact(s)
            </Text>
            <SwipeableFlatList
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
            data={this.state.data}
            keyExtractor={(item, index) => item.Id}
            bounceFirstRowOnMount
            maxSwipeDistance={160}
            renderItem={this._renderItem.bind(this)}
            />

            

            </View></Modal>
            
                )
        }
        }
        _renderItem({ item }) {
        return (
            <View style={styles.row}>
                <View style={styles.rowData}>
                <CheckBox
                        textStyle={{color: 'black'}}
                        uncheckedColor="black"
                        checkedColor="#6eab52"
                        size={15}
                        checked={this.state.checked}
                        containerStyle={{flex:0.5}}
                        onPress={() => this.onChangeCheck()}
                    />
               
                    <Text style={styles.rowDataText2}>{item.name}</Text>
                </View>
            </View>
        )
    }
    }

export default DocumentUpload_AddModal

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
    floatButton: {
        position: 'absolute',
        width:50,
        height: 50,
        backgroundColor: '#003d5a',
        borderRadius: 30,
        bottom: 5,
        right: -1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    floatButtonText: {
        color: 'white',
        fontSize: 25    
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    rowData: {
        flex: 1,
        flexDirection: 'row',
        margin:7,
    },
    rowDataBg: {
        flex:0.5,
        position: 'absolute',
        width:30,
        height: 30,
        backgroundColor: '#003d5a',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowDataText1: {
        flex:0.3,
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        borderRadius: 5,
    },
    rowDataText2: {
        flex:0.3,
        fontSize: 20,
        marginLeft: 50,
        fontWeight: '400',
        color: 'black'
    },
    actionContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    actionButton: {
        padding: 10,
        width:80,
        backgroundColor: '#003d5a',
    },
    actionButtonDest:{
        backgroundColor: '#FF0000',
    
    },
    actionButtonText: {
        textAlign: 'center',
        color: 'white',
    },
    })