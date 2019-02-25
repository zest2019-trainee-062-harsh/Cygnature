import React, {Component} from 'react'
import {View, StyleSheet,Text, TouchableOpacity} from 'react-native'
 
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width

class Dashboard extends Component {
     render() {
         return (
             <View style={{flex:1}}>
                <View style={styles.mainContainer}>
                    
                    <View style={styles.box1}>
                        <View style={styles.boxHalf}>
                            <Text style={styles.box1Text}>
                                0 {"\n"}{"\n"} Need to Sign
                            </Text>
                        </View>
                        <View style={styles.boxHalf}>
                        <Text style={styles.box1Text}>
                                0 {"\n"}{"\n"} Waiting for Others
                            </Text>
                        </View>
                    </View>

                    <View style={styles.box2}>
                        <Text style={styles.box2Text1}>Recent Documents</Text>
                        <Text>Scroll view here</Text>
                    </View>
                
                    <View style={styles.box3}>
                        <Text style={styles.box3Text1}>Quick Actions</Text>
                        <TouchableOpacity style={{ backgroundColor: 'rgba(52, 52, 52, 0.0)'}}>
                            <Text style={styles.box3Text2}>Add/Edit Signature</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: 'rgba(52, 52, 52, 0.0)'}}>
                            <Text style={styles.box3Text2}>Add Profile Picture</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: 'rgba(52, 52, 52, 0.0)'}}>
                            <Text style={styles.box3Text2}>View Contacts</Text>
                        </TouchableOpacity>
                    </View>
                
                </View>
             </View>
                )
         }
     }

export default Dashboard



const styles = StyleSheet.create({
   mainContainer: {
       width: width,
       height: height,
   },
   box1: {
       margin:10,
       marginTop:70,
    flexDirection: 'row',
    flex:0.35, 
   },
   boxHalf: {
    width: '50%', 
    backgroundColor: '#003d5a', 
    borderRightColor: 'white', 
    borderRightWidth: 2,
    justifyContent: 'center'
   },
   box1Text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'monospace',
    fontWeight: 'bold',
   },
   box2 :{
    marginTop: 20,
    margin: 10,
    flex:0.30, 
    borderColor: 'black',
    borderWidth: 2,
   },
   box2Text1: {
       marginLeft:10,
       fontSize:18,
       color: 'black',
       fontWeight: 'bold'
   },
   box3 :{
    marginTop: 20,
    margin: 10,
    flex:0.30, 
    borderColor: 'black',
    borderWidth: 2,
   },
   box3Text1: {
       marginLeft:10,
       fontSize:18,
       color: 'black',
       fontWeight: 'bold'
   },
   box3Text2: {
       marginLeft:15,
       margin:10,
       fontSize:16,
       color: '#0000EE',
   },


})