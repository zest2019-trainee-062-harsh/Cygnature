import React, {Component} from 'react'
import {View, Text, StyleSheet, Alert, 
    TouchableOpacity,TouchableHighlight, SwipeableFlatList, AsyncStorage, KeyboardAvoidingView} from 'react-native'
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'
import AddModal from './AddModal'
import UpdateModal from './UpdateModal'
import { NavigationEvents } from 'react-navigation';

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
        refreshing:false,
        searchText: ""
    }


    // componentDidMount() {
    //       this.view()
    //       this.onRefresh()
    // }

    
    didFocus = async() => {
        let auth = await AsyncStorage.getItem('auth');
        this.state.auth = auth;

        this.view()
        this.onRefresh()
        this.refs.AddModal.close()
        //this.refs.UpdateModal.close()
        // setTimeout(() => {
        //     this.onRefresh()
        // }, 1000);
    }

    floatClicked=() => {
        //alert("clicked")
        this.refs.AddModal.show()
    
        
    }

    onRefresh = () => {
        this.setState({refreshing: true});
        this.view().then(() => {
          this.setState({refreshing: false});
        });
      }
    

    view = () => {

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
            this.onRefresh()
        })
        .catch((error) => {
            console.warn(error);
        });        
    }

    search (text) {
        
        this.setState({searchText:text, refreshing: true})
        if(this.state.searchText == "" || this.state.searchText.length == 0) {
            
            this.view()
        } else {
        const newData = this.state.data.filter(function(item) {
            //applying filter for the inserted text in search bar
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            data: newData,
            refreshing:false
          });
        }
    }
    render() {
    if( this.state.contactsCount == 0) {
        return (
        <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
        <Icon name="md-alert" color='black' size={100} />
        <Text style={{ fontSize:25, fontWeight: 'bold'}}> NO Contacts </Text>
        <Text style={{marginLeft:"20%", marginRight:"20%", fontSize:25, fontStyle: 'italic' }}>
         You can add contacts by clicking "+" button at bottom right.
        </Text>
        <NavigationEvents
                onDidFocus={payload => this.didFocus()}/>


        <TouchableOpacity style={styles.floatButton} onPress={this.floatClicked}>
                    <Text style={styles.floatButtonText}>+</Text>
        </TouchableOpacity>

            <AddModal ref={'AddModal'} parentFlatList={this} />
        </View>
            )
        }
        else {
        return (
            <KeyboardAvoidingView behavior='padding'  style={{
                borderColor:'#003d5a',
                borderWidth: 2,
                borderRadius:5,
                flex:1,
                backgroundColor: 'white',
                margin: 7,
                padding: 10}
            }>
            <NavigationEvents
                onDidFocus={payload => this.didFocus()}/>
            <View style={{flex:0.1, flexDirection:'row', justifyContent:'center', alignItems: 'center'}}>
                <Text style={{flex:0.3, margin:10, fontSize:22, fontWeight: 'bold', color: 'black'}}>
                    Contact(s)
                </Text>
                <SearchBar
                    placeholder="Search Here..."
                    platform="android"
                    containerStyle={{flex:0.7, borderRadius:30, backgroundColor: 'rgba(255,255,255,1.0)'}}
                    onChangeText={ (text) =>this.search(text)}
                    value={this.state.searchText}
                    onClear = { () => this.view() }
                    onCancel = { () => this.view() }
                    onKeyPress={({ nativeEvent }) => {
                        nativeEvent.key === 'Backspace' ? console.warn("D") : null
                    }}
                />
            </View>
            <SwipeableFlatList
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
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
            </KeyboardAvoidingView>
            
                )
        }
        }
        _renderItem({ item }) {
        return (
            <View style={styles.row}>
                <View style={styles.rowData}>
                    <TouchableOpacity disabled style={styles.rowDataBg}>
                            <Text style={styles.rowDataText1}>{item.shortName}</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection:'column', flex: 1, marginTop:5}}>
                        <Text style={styles.rowDataText2}>{item.name}</Text>
                        <Text style={[styles.rowDataText2, {color:'grey', fontSize:12}]}>{item.email}</Text>
                    </View>
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
                onPress={() =>  
                    Alert.alert(
                        'Are you sure? ',
                        'By clicking YES will delete this contact ',
                        [
                            {
                                text: 'No'
                            },
                            {
                                text: 'Yes', onPress: ()=> this.delete(item.Id)
                            },
                            
                        ],
                        {cancelable: true},
                    )
                //this.delete(item.Id) 

                }>
                    <Text style={styles.actionButtonText}>Delete</Text>
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
    bottom: 20,
    right: 6,
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
    position: 'absolute',
    width:40,
    height: 40,
    backgroundColor: '#003d5a',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5
},
rowDataText1: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    borderRadius: 5,
},
rowDataText2: {
    flex:0.5,
    fontSize: 15,
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