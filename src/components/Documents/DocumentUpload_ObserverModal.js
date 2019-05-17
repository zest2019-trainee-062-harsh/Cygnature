import React, {Component} from 'react'
import {View, StyleSheet, Text, Dimensions, AsyncStorage,TouchableOpacity, FlatList} from 'react-native'
import Modal from 'react-native-modalbox'

import Icon from 'react-native-vector-icons/Ionicons'

import AddModal from '../Contacts/AddModal.js'
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width
 
class DocumentUpload_SignerModal extends Component {
    constructor(props) {    
        super(props)
        this.view()
    }
        
    show = () => {
        this.refs.myModalNew.open()
        this.onRefresh()
    }

    state = {
        auth: null,
        checked: false,
        contactsCount : 0,
        res:[],
        data:[],
        contactIds: [],
        refreshing:false,
        observersIds: [],
        observersIdsWithName: []
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


    addObservers(Id, name, userId){
        let ID = Id
        let uid = userId
        this.state.contactIds.push(ID)
        this.state.observersIds.push(uid)
        let filteredArray = this.state.data.filter(item => item.Id !== Id)
        this.setState({data: filteredArray});
    }

    sendObservers(){
        this.refs.myModalNew.close();
        this.props.parentFlatList.addObservers(this.state.contactIds, this.state.observersIds);
        this.state.observersIds = []
    }

    floatClicked=() => {
        this.refs.AddModal.show()
    }
    
    close = () => {
        this.refs.myModalNew.close()
    }

    render() {
        if( this.state.contactsCount == 0) {
            return (
                <Modal
                    ref={"myModalNew"}
                    style={ styles.modal }
                    position= 'center'
                    backdrop={true}
                    backdropPressToClose={false}
                    swipeToClose={false}
                >
                    <View style={{ margin:10, flex:.1, flexDirection: 'row'}}>
                    <View style={{flex:0.5,}}>
                        <Text style={{marginLeft:4, fontSize: 18,  color: 'black', fontWeight:'bold'}}>Observer(s)</Text>
                    </View>
                    <View style={{flex:0.5,alignItems:'flex-end'}}>
                        <Icon name="md-close" color='black' size={30} onPress={()=>this.close()} />
                    </View>
                </View>
                <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
                        <Icon name="md-alert" color='black' size={100} />
                        <Text style={{ fontSize:17, fontWeight: 'bold'}}> NO Contacts </Text>
                        <Text style={{marginLeft:"20%", marginRight:"20%", fontSize:17, fontStyle: 'italic' }}>
                            You can add contacts by clicking "+" button at bottom right.
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.floatButton} onPress={this.floatClicked}>
                        <Text style={styles.floatButtonText}>+</Text>
                    </TouchableOpacity>
                    <AddModal ref={'AddModal'} parentFlatList={this} />
                
                </Modal>
            )
        }
        else {
            return (
                <Modal
                    ref={"myModalNew"}
                    style={ styles.modal }
                    position= 'center'
                    backdrop={true}
                    backdropPressToClose={false}
                    swipeToClose={false}
                >
                     <View style={{ margin:10, flex:.1, flexDirection: 'row'}}>
                        <View style={{flex:0.5,}}>
                            <Text style={{marginLeft:4, fontSize: 18,  color: 'black', fontWeight:'bold'}}>Observer(s)</Text>
                        </View>
                        <View style={{flex:0.5,alignItems:'flex-end'}}>
                            <Icon name="md-close" color='black' size={30} onPress={()=>this.close()} />
                        </View>
                    </View>
                    <FlatList
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                        data={this.state.data}
                        keyExtractor={(item, index) => item.Id}
                        renderItem={this._renderItem.bind(this)}
                    />
                    <TouchableOpacity style={ styles.btnSave }
                        onPress={() =>
                            this.sendObservers()
                        }
                        >
                        <Text style={styles.textSave}>Select Observers</Text>
                    </TouchableOpacity>
                </Modal>
            )
        }
    }

    _renderItem({ item }) {
        return (
            <View style={styles.row}>
                <TouchableOpacity onPress={() => this.addObservers(item.Id, item.name, item.userId)}>
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
        marginLeft:20,
        fontSize: 15,
        color: 'black'
    },
    btnSave: {
        backgroundColor: '#003d5a',
        marginLeft: "33%",
        marginRight: "33%",
        height:40,
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
    },
    textSave: {
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
    floatButton: {
        position: 'absolute',
        width:50,
        height: 50,
        backgroundColor: '#003d5a',
        borderRadius: 30,
        bottom: 20,
        right: 6,
        alignItems: 'center',
        justifyContent: 'center',
        margin: -5
    },
    floatButtonText: {
        color: 'white',
        fontSize: 25,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',   
    },
})