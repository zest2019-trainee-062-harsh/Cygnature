import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView, Dimensions, AsyncStorage, ActivityIndicator, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
 
class  VerifyDetails extends Component {

    static navigationOptions = {
        title: "Verify Document Detail"
    }
    constructor(props) {
        super(props)
        this.state.data = this.props.navigation.getParam('data')
        console.warn(this.state.data)
        
    }

    state = {
        auth: null,
        data: [],
        id: this.props.navigation.state.params.Id,
        pdTitle: "Getting the info",
    }  

    render() {
        var navigate =  this.props.navigation;
        return (
            <View style={styles.mainContainer}>
                {this.state.data != null ? 
                    <ScrollView>
                    <View style = {{borderWidth:1, borderColor:"#003d5a", padding:5}}>
                        <View style={{flex: 1, justifyContent: "center", alignItems: "center" , color:'red'}}>
                            {this.state.data["documentDetail"]["extension"] == ".pdf" ?
                                <Icon
                                    name="file-pdf-o"
                                    size={30}
                                    color="red"
                                /> : null
                            }
                            {this.state.data["documentDetail"]["extension"] == ".docx" || this.state.data["documentDetail"]["extension"] == ".doc" ?
                                <Icon
                                    name="file-word-o"
                                    size={30}
                                    color="red"
                                /> : null
                            }
                        </View>
                        <View style={styles.DocumentsList}>
                            <Text style={ [styles.DocumentsListFont, {alignContent: "center",textAlign:'center',color:'black'}] }>
                                {this.state.data["documentDetail"]["fileName"]}
                            </Text>
                        </View>

                    </View>

                    <Text style={styles.head}>Notorization Details</Text>

                    <View style={{borderWidth:1, borderColor:"#003d5a", padding:5,marginTop:10,marginBottom:10}}>
                    <Text style={{fontSize:16,color: "black",}}>Block Id</Text>
                      
                        {this.state.data["notarization"]["blockId"] != null ?
                            <Text style={styles.DocumentsListFont}> {this.state.data["notarization"]["blockId"]} </Text> : 
                            <Text style={styles.DocumentsListFont}> This document is yet not signed by all users </Text>     
                        }
                    
                    <Text style={{fontSize:15,color: "black",}}>Notarized On</Text>

                        {this.state.data["notarization"]["blockId"] != null ?
                            <Text style={styles.DocumentsListFont}> {this.state.data["notarization"]["notarizedOn"]} </Text> : 
                            <Text style={styles.DocumentsListFont}> This document is yet not notarized </Text>     
                        }
                    
                    <Text style={{fontSize:15,color: "black",}}>Document Hash</Text>
                    <Text style={styles.DocumentsListFont}> {this.state.data["documentDetail"]["documentFileHash"]} </Text>
                    </View>

                    <Text style={styles.head}>Signers</Text>

                    <View style={{borderWidth:1, borderColor:"#003d5a", padding:5,marginTop:10,marginBottom:10}}>
                        <Text style={styles.DocumentsListFont}> {this.state.data["signers"][0]["fullName"]} </Text> 
                    </View>

                    <Text style={styles.head}>Observers</Text>

                    <View style={{borderWidth:1, borderColor:"#003d5a", padding:5,marginTop:10,marginBottom:10}}>
                        {this.state.data["notarization"]["blockId"] != null ?
                            <Text style={styles.DocumentsListFont}> {this.state.data["observers"]} </Text> : 
                            <Text style={styles.DocumentsListFont}> There are no observers </Text>     
                        } 
                    </View>

                    <Text style={styles.head}>Document History</Text>

                    <View style={{borderWidth:1, borderColor:"black", padding:5,marginTop:10,marginBottom:10}}>
                        <Text style={styles.DocumentsListFont}> {this.state.data["documentHistory"][0]["historyText"]} </Text> 
                    </View>
                        
                       
                    </ScrollView>


                    : <ActivityIndicator color="white" size="large" />
                }
            </View>    
            );
        }
    }

export default VerifyDetails

const styles = StyleSheet.create({
    mainContainer:{
        height: height*0.85,
        margin: 7,
        borderWidth: 2,
        borderRadius:5,
        borderColor: "#003d5a",
        padding: 10,
        backgroundColor: "white"
    },
    DocumentsList:{
        flex: 1,
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 5,
    },
    DocumentsListFont:{
        flex: 0.5,
        fontSize: 12,
        marginTop:10,
        marginBottom:10,
    },
    head:{
        fontWeight:'bold',
        fontSize:16,
        marginTop:10,
        color:'#003d5a'
    },
    box: { 
        marginTop: 25,
        margin: 10,
        borderRadius:5,
        borderColor: "#003d5a",
        borderWidth: 2,
        borderWidth: 2,
    },
})