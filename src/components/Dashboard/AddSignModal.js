import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, AsyncStorage} from 'react-native'
 
import Icon from 'react-native-vector-icons/Ionicons'
import Icon1 from 'react-native-vector-icons/FontAwesome5'
var width = Dimensions.get('window').width
var height = Dimensions.get('window').height

import Modal from 'react-native-modalbox'
class AddSignModal extends Component {
    constructor(props) {
        super(props)
        this.get()
    }
    state = {
        isSignature: true,
        userData: [],
        auth: null
    }
    
    get = async() => {
        let auth = await AsyncStorage.getItem('auth');
        this.setState({auth:auth})
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/user/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': this.state.auth,
        },
        }).then((response) => response.json())
        .then((responseJson) => {
            this.setState({userData: responseJson['data'][0]}) 
            if(this.state.userData['impressions'][0] == null || this.state.userData['impressions'][0] == "" ) {
                setTimeout(()=>{
                    this.setState({isSignature:false})
                },1000)
                
            }
        })
        .catch((error) => {
          console.error(error.message)
        });
    }
    
    show = () => {
        
        this.refs.myModal.open()
    }
    
    close = () => {
        
        this.refs.myModal.close()
    }
     render() {
         return (
                         
            <Modal
                ref={"myModal"}
                style={ styles.modal }
                position= 'center'
                backdrop={true}
                backdropPressToClose={false}
            >
            
            <View style={{ margin:10, flex:1, flexDirection: 'row'}}>
            <View style={{flex:0.5,}}>
                <Text style={{marginLeft:4, fontSize: 18,  color: 'black', fontWeight:'bold'}}>Set Signature</Text>
            </View>
            <View style={{flex:0.5,alignItems:'flex-end'}}>
                <Icon name="md-close" color='black' size={30} onPress={()=>this.close()} />
            </View>
        </View>
           
            <TouchableOpacity style={styles.modalTI} onPress={() =>  this.props.parentFlatList.addSignNavigate(1, this.state.isSignature) }>
                <Icon1 name="pen" color='black' size={25} />
                <Text style={styles.modalText}>Draw</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalTI} onPress={() => this.props.parentFlatList.addSignNavigate(2, this.state.isSignature) }>
                <Icon1 name="camera" color='black' size={25} />
                <Text style={styles.modalText}>Capture</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalTI} onPress={() => this.props.parentFlatList.addSignNavigate(3) }>
                <Icon1 name="font" color='black' size={25} />
                <Text style={styles.modalText}>Type</Text>
            </TouchableOpacity> 
           
            </Modal>
           
                )
         }
     }

export default AddSignModal


const styles = StyleSheet.create({
    modal:{
        shadowRadius:20,
        width:width-80,
        height:'auto',
        borderColor:'#003d5a',
        borderWidth: 1,
        borderRadius:5,
    },
    modalTI:{
        backgroundColor: 'white',
        paddingVertical: 20,
        margin: 10,
        marginTop:20,
        borderRadius: 5,
        borderWidth:1,
        borderColor:'black',
        alignItems: 'center',
        justifyContent: 'center',
        flex:1,
        flexDirection: 'row'
    },
    modalText: {
        textAlign: 'center',
        color: 'black',
        fontSize:16,
        flex:0.90
    },
})