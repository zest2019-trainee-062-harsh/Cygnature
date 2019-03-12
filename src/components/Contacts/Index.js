import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import Data from './Data'

export default class Contacts extends Component {
    constructor(props) {
    super(props)
    this.floatClicked = this.floatClicked.bind(this)
}

    state = {
        contactsCount : 0
    }
     
    floatClicked=() => {
        //alert("clicked")
        this.refs.Data.show();
        
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

                    <Data ref={'Data'} parentFlatList={this} />
             </View>
                )
         }
         else {
            return (
                <View>
                   <Text> DATA </Text>
                </View>
                   )
         }
         }
     }

const styles = StyleSheet.create({
floatButton: {
    position: 'absolute',
    width:50,
    height: 50,
    backgroundColor: '#003d5a',
    borderRadius: 30,
    bottom: 35,
    right: 5,
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
},
floatButtonText: {
    color: 'white',
    fontSize: 25    
},
})