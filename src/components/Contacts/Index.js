import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity,TouchableHighlight, SwipeableFlatList} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import AddModal from './AddModal'
import UpdateModal from './UpdateModal'

export default class Contacts extends Component {
    constructor(props) {
    super(props)
    this.floatClicked = this.floatClicked.bind(this)
    }


    componentWillMount() {
        //console.warn("yes") 
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/contact/get/',{
        method: 'GET',
        headers: {
            'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.N9w0jV/v+9PKjqTQVRpre2jTzBser7/a/Thzwn6/3UCGTehr+Gk9tZrbfUo0jndFhKFx2ywj3gA0kjDn9uf/mrfnjcwIru3WHKGL1lhTCxH/Uf7NYBtBbAd5M1f77b2aqFJHSXiQ0miSqKUB2cipfOf88VU+XiCO57FQtQzRFX0BtR5LZHaZQqSMMj8y47n6M86I6CKl/SntvdAyzVMh7uXFWsaYHY/nKmyIunJgewZM3q2ImLEx7ndLwRT1Kpus2er5pnvq19gX43RfAEkl80kK7axwGX2rPYYpoedDBXS35npshScOXwmZhiv36CmefEFHYLgFb83BWVafahApZ5huYSa1DHVNA6rCFJmrEdIZSVy/3U3prOcyiOsRM11DwsXwuJoOVYlwJgvluzUgDz32moOaTde6a1vkrdMaedYDyNNolAGSQ1Pu3+CKxRmp2tRpNY7GaajQVLaie574mFc2BGCwJdrueGAA8DuCPCgN2fpVlMYrufbYI7om3MnSjypSyoFuWg4O+4PG72+Qm5HvUfADtSbX4REh6XWBwyt89NRYf9f/qp/S3aLWZ8XsY5akfYKBECZQ6H6Z3rVRxAW7OgnqlPlAMBSw+DqAi3+28ActC0gqb3KOiDJFb3jIT4OoAMBRAA3hdAmblTr6EwpPmbxXqoCZ2CFL/PQqA/OTuKiBadJ1ZxkxCuFcb2Cl2J1fHnRKKWqv3CY4UMyBVkIFH2zGCh3g5IgaG3hH6IYaM2xrtMNJ2AZRByaG0ki5r99ydraBgmbN6OhEaKYlnOrlzSW3E9wqPmMJOk6iDHlzHKgJWz66r3TnF5nVaK03AXa+QX66LskJo9NSx6yQXORSgtB9Wb8abfwJBnUXVUX94u8l7fJWBCOXKXxRnjSR.R0Nv9ckczXd4B1UWyxoVOAfJjC91z4duwB7NOU4S3Gw'
        }}).then((response) => response.json())
        .then((responseJson) => {
            //this.setState({details: responseJson["data"][0]})
            //console.warn(responseJson["data"])
            this.setState({data: responseJson["data"], contactsCount: 1})
            console.warn(this.state.data)
            this.state.data.map((y) => {
                this.state.name.push(y.name)
                })
        })
        .catch((error) => {
            console.warn(error);
        });        

    }

    state = {
        contactsCount : 0,
        data:[],
        name:[]
    }
     
    floatClicked=() => {
        //alert("clicked")+
        this.refs.AddModal.show();
        
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
                <View style={{borderWidth:1, borderColor:'black', flex:1, backgroundColor: 'white', margin: 20}}>
                <Text style={{marginLeft:10, fontSize:24, fontWeight: 'bold', color: 'black'}}>
                    Contact(s)
                </Text>
                <SwipeableFlatList
                data={this.state.name}
                keyExtractor={(item, index) => index.toString()}
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
                        <Text style={styles.rowDataText}>Name: {item}</Text>
                    </View>
                </View>
            )
        }
        _renderQuickActions({item}) {
            return (
                <View style={styles.actionContainer}>
                    <TouchableHighlight
                    style={styles.actionButton}
                    onPress={() => { this.refs.UpdateModal.show() }}>
                        <Text style={styles.actionButtonText}>Edit</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                     style={[styles.actionButton, styles.actionButtonDest]}
                    onPress={() => { console.warn("pressed 2")}}>
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