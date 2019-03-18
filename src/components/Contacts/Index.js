import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity,TouchableHighlight, SwipeableFlatList, AsyncStorage} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import AddModal from './AddModal'
import UpdateModal from './UpdateModal'

export default class Contacts extends Component {
    constructor(props) {
    super(props)
    this.floatClicked = this.floatClicked.bind(this)
    }
    state = {
        auth: null,
        contactsCount : 0,
        res:[],
        data:[],
        contactId: null,
    }


    componentWillMount() {
          this.view()

    }

     
    floatClicked=() => {
        //alert("clicked")+
        this.refs.AddModal.show();
        
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
            //this.setState({details: responseJson["data"][0]})
            //console.warn(responseJson["data"])
            
           this.state.res.map((y) => {
                this.state.data.pop(y)
                })
            this.setState({res: responseJson["data"], contactsCount: 1})
            //console.warn(this.state.data)
            this.state.res.map((y) => {
                this.state.data.push(y)
                })
                //console.warn(this.state.data)
        })
        .catch((error) => {
            console.warn(error);
        });      
    }

    delete=(text) => {
        //console.warn(text)

        //this.setState({contactId: text})
        //console.warn(this.state.contactId)
        //DELETE API

        return fetch('http://cygnatureapipoc.stagingapplications.com/api/contact/delete/'+(text),{
        method: 'DELETE',
        headers: {
            'Authorization':this.state.auth
            // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.N9w0jV/v+9PKjqTQVRpre2jTzBser7/a/Thzwn6/3UCGTehr+Gk9tZrbfUo0jndFhKFx2ywj3gA0kjDn9uf/mrfnjcwIru3WHKGL1lhTCxH/Uf7NYBtBbAd5M1f77b2aqFJHSXiQ0miSqKUB2cipfOf88VU+XiCO57FQtQzRFX0BtR5LZHaZQqSMMj8y47n6M86I6CKl/SntvdAyzVMh7uXFWsaYHY/nKmyIunJgewZM3q2ImLEx7ndLwRT1Kpus2er5pnvq19gX43RfAEkl80kK7axwGX2rPYYpoedDBXS35npshScOXwmZhiv36CmefEFHYLgFb83BWVafahApZ5huYSa1DHVNA6rCFJmrEdIZSVy/3U3prOcyiOsRM11DwsXwuJoOVYlwJgvluzUgDz32moOaTde6a1vkrdMaedYDyNNolAGSQ1Pu3+CKxRmp2tRpNY7GaajQVLaie574mFc2BGCwJdrueGAA8DuCPCgN2fpVlMYrufbYI7om3MnSjypSyoFuWg4O+4PG72+Qm5HvUfADtSbX4REh6XWBwyt89NRYf9f/qp/S3aLWZ8XsY5akfYKBECZQ6H6Z3rVRxAW7OgnqlPlAMBSw+DqAi3+28ActC0gqb3KOiDJFb3jIT4OoAMBRAA3hdAmblTr6EwpPmbxXqoCZ2CFL/PQqA/OTuKiBadJ1ZxkxCuFcb2Cl2J1fHnRKKWqv3CY4UMyBVkIFH2zGCh3g5IgaG3hH6IYaM2xrtMNJ2AZRByaG0ki5r99ydraBgmbN6OhEaKYlnG5RqR3tuIpNieQDbe6hFZEpvqk8iOk4pD2/nm2gBbymmt9bQcX1giYgYVUgsOUBytjTawP4g1BeJ0Rt0w0ev/jotRYNpxQaWs5aMGMYfdPW.ooqT_toFub_53Hn22ZdRhSAkcNnJrnwlDag93pWBvlA',
        }}).then((response) => response.json())
        .then((responseJson) => {
            ///console.warn('yes')
            this.view()
            //this.setState({details: responseJson["data"][0]})
            //console.warn(responseJson["data"])
            // this.setState({res: responseJson["data"], contactsCount: 1})
            // //console.warn(this.state.data)
            // this.state.res.map((y) => {
            //     this.state.data.push(y)
            //     })
                //console.warn(this.state.data)
        })
        .catch((error) => {
            console.warn(error);
        });        
    }

    render() {
    if( this.state.contactsCount == 0) {
        return (
        <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
        <Text style={{margin:10, fontWeight: 'bold'}}> NO Contacts </Text>
        <Icon name="md-alert" color='black' size={100} />


        <TouchableOpacity style={styles.floatButton} onPress={this.floatClicked}>
                    <Text style={styles.floatButtonText}>+</Text>
        </TouchableOpacity>

            <AddModal ref={'AddModal'} parentFlatList={this} />
        </View>
            )
        }
        else {
        return (
            <View style={{
                borderWidth:1,
                borderColor:'black',
                flex:1,
                backgroundColor: 'white',
                margin: 7, borderWidth: 2,
                borderRadius:5,
                borderColor: "#003d5a",
                padding: 10}
            }>
            <Text style={{marginLeft:10, fontSize:24, fontWeight: 'bold', color: 'black'}}>
                Contact(s)
            </Text>
            <SwipeableFlatList
            data={this.state.data}
            keyExtractor={(item, index) => item.Id}
            bounceFirstRowOnMount
            maxSwipeDistance={160}
            renderItem={this._renderItem.bind(this)}
            renderQuickActions={this._renderQuickActions.bind(this)}
            />

            <TouchableOpacity style={styles.floatButton} onPress={this.floatClicked}>
                        <Text style={styles.floatButtonText}>+</Text>
            </TouchableOpacity>

                <AddModal ref={'AddModal'} parentFlatList={this} />
                <UpdateModal ref={'UpdateModal'} parentFlatList={this} />
            </View>
            
                )
        }
        }
        _renderItem({ item }) {
        return (
            <View style={styles.row}>
                <View style={styles.rowData}>
                    <Text style={styles.rowDataText}>Name: {item.name}</Text>
                </View>
            </View>
        )
    }
    _renderQuickActions({item}) {
        return (
            <View style={styles.actionContainer}>
                <TouchableHighlight
                style={styles.actionButton}
                onPress={() => { this.refs.UpdateModal.show(item.Id) }}>
                    <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={[styles.actionButton, styles.actionButtonDest]}
                onPress={() =>  this.delete(item.Id) }>
                    <Text>Delete</Text>
                </TouchableHighlight>
            </View>
        )
    }
    }

     
const styles = StyleSheet.create({
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
    flex: 1
},
rowDataText: {
    fontSize: 20,
    marginLeft: 30,
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
    backgroundColor: '#999999'
},
actionButtonDest:{
    backgroundColor: '#FF0000'

},
actionButtonText: {
    textAlign: 'center'
},
})