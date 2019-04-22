import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView, Dimensions, Clipboard, ActivityIndicator, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import Icon1 from 'react-native-vector-icons/Ionicons';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
 
class  VerifyDetails extends Component {

    static navigationOptions = {
        title: "Verify Document Detail"
    }
    constructor(props) {
        super(props)
        this.state.data = this.props.navigation.getParam('data')
        this.state.history=  this.state.data["documentHistory"]
        this.state.signers=  this.state.data["signers"]
        this.state.observors=  this.state.data["observors"]     
        if(this.state.data["sequentialFlow"] == true) {
            this.state.sequentialFlow = "Sequential Flow"
        } else this.state.sequentialFlow = "Parallel Flow"   
    }

    state = {
        auth: null,
        data: [],
        history: [],
        signers: [],
        observors: [],
        sequentialFlow: "Undefined",
        id: this.props.navigation.state.params.Id,
        pdTitle: "Getting the info",
    }  

    copyDH = async() => {
        await Clipboard.setString(this.state.data["documentDetail"]["documentFileHash"]);
        alert('Copied to Clipboard!');
    }

    copyTH = async() => {
        await Clipboard.setString(this.state.data["notarization"]["txHash"]);
        alert('Copied to Clipboard!');
    }
    render() {
        var navigate =  this.props.navigation;
        return (
            <View style={styles.mainContainer}>
                {this.state.data != null ? 
                    <ScrollView>
                    <View style={styles.box}>

                <View style = {[{flex: 1, flexDirection:'row'}, ]}>
                    <View style={{flex:0.2, justifyContent: "center", alignItems: "center" , color:'red'}}>
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

                <View style={[{flex:0.8},styles.DocumentsList]}>
                        <Text style={ [styles.DocumentsListFont, {fontSize:17, fontWeight: 'bold'}] }>
                            {this.state.data["documentDetail"]["fileName"]}
                        </Text>
                        <Text style={ [styles.DocumentsListFont, {color: 'grey'}] }>
                        Uploaded By: {this.state.data["documentDetail"]["uploadedBy"]}
                        </Text>
                    </View>
                </View>

                <View style = {[{flex: 1, flexDirection:'row', marginTop:10}, ]}>
                    <View style={styles.DocumentsList}>
                        <Text style={ [styles.DocumentsListFont, { alignContent: "flex-start"}] }>
                            Document Hash
                        </Text>
                        <View style={{flexDirection:'row'}}>
                            <Text selectable = {true} style={ [styles.DocumentsListFont, {flex:0.92,color:'grey', alignContent: "flex-end"}] }>
                                {this.state.data["documentDetail"]["documentFileHash"]}
                            </Text>
                            <TouchableOpacity onPress={()=>this.copyDH()} 
                                style = {{flex: 0.08, backgroundColor:'#003d5a', justifyContent: 'center', alignItems:'center'}}>
                            <Icon
                                name="copy"
                                size={15}
                                color="white"
                            />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                </View>
                <View style={styles.box}>
                        <Text style={{fontWeight: "bold", fontSize: 17, color: "black"}}> History </Text>
                        <View style={styles.DocumentsList}>
                        <ScrollView>
                        {
                            this.state.history.map((history)=>{
                                //console.warn(history)
                                return(
                                <View key={history.Id} style={{flexDirection:'row', flex:1}} >
                                    <Icon1
                                        name="md-information-circle"
                                        style={{padding:10, flex:0.05}}
                                        size={15}
                                        color="black"
                                    />
                                    <Text style={[styles.DocumentsListFont, {flex:0.95}]}>
                                        {history.historyText}
                                    </Text>
                                </View>
                        );
                        })}
                        </ScrollView>
                        </View>
                        </View>
                        <View style={styles.box}>
                        <Text style={{fontWeight: "bold", fontSize: 17, color: "black"}}> Signers </Text>
                        <Text style={{fontSize: 15, color: "grey", marginLeft: 5}}> {this.state.sequentialFlow} </Text>
                        <View style={styles.DocumentsList}>
                        <ScrollView>
                        {
                            this.state.signers.map((signers)=>{

                                return(
                                <View style={{margin:10}} key={signers.userId} >
                                    <TouchableOpacity disabled style={[styles.rowDataBg, {marginLeft:20}]}>
                                        <Text style={styles.rowDataText1}>{signers.profileShortName}</Text>
                                    </TouchableOpacity>
                                    <Text style={[styles.DocumentsListFont, {marginLeft:60}]}>
                                        {signers.fullName}
                                    </Text>
                                </View>
                        );
                        })}
                        </ScrollView>
                        </View>
                        </View>

                        <View style={styles.box}>
                        <Text style={{fontWeight: "bold", fontSize: 17, color: "black"}}> Observers </Text>
                        <View style={styles.DocumentsList}>
                        {this.state.isObservers ?
                        <ScrollView>
                        {
                            this.state.observers.map((observers)=>{
                                
                                return(
                                <View key={observers.userId} >
                                    <TouchableOpacity disabled style={[styles.rowDataBg, {marginLeft:20}]}>
                                        <Text style={styles.rowDataText1}>{observers.profileShortName}</Text>
                                    </TouchableOpacity>
                                    <Text style={[styles.DocumentsListFont, {marginLeft:60}]}>
                                        {observers.fullName}
                                    </Text>
                                </View>
                        );
                        })} 
                        </ScrollView> :
                            <View>
                                <Text style={styles.DocumentsListFont}>
                                    There are no Observers
                                </Text>
                            </View> 
                        }
                        </View>
                        </View>
                        <View style={styles.box}>
                        <Text style={{fontWeight: "bold", fontSize: 17, color: "black"}}> Notarization </Text>

                        <View style = {[{flex: 1, flexDirection:'row', marginTop:10}, ]}>
                        {this.state.data["notarization"]["isNotarized"] ? 
                            <View style={styles.DocumentsList}>
                                <Text style={ [styles.DocumentsListFont, { alignContent: "flex-start"}] }>
                                   Block ID
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {color:'grey', alignContent: "flex-end"}] }>
                                    {this.state.data["notarization"]["blockId"]}
                                </Text>
         
                                <Text style={ [styles.DocumentsListFont, { alignContent: "flex-start"}] }>
                                   Notarized On
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {color:'grey', alignContent: "flex-end"}] }>
                                    {this.state.data["notarization"]["notarizedOn"]}
                                </Text>

                                <Text style={ [styles.DocumentsListFont, { alignContent: "flex-start"}] }>
                                    Transaction Hash
                                </Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text selectable = {true} style={ [styles.DocumentsListFont, {flex:0.92,color:'grey', alignContent: "flex-end"}] }>
                                        {this.state.data["notarization"]["txHash"]}
                                    </Text>
                                    <TouchableOpacity onPress={()=>this.copyDH()} 
                                        style = {{flex: 0.08, backgroundColor:'#003d5a', justifyContent: 'center', alignItems:'center'}}>
                                    <Icon
                                        name="copy"
                                        size={15}
                                        color="white"
                                    />
                                    </TouchableOpacity>
                                </View>
                               
                            </View>:<View style={styles.DocumentsList}>
                                <Text style={styles.DocumentsListFont}>
                                    Document is not Notarized yet
                                </Text>
                            </View> }
 
                        </View>

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
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5
    },
    DocumentsListFont:{
        flex: 0.5,
        color: "black",
        fontSize: 15
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
    rowDataBg: {
        position: 'absolute',
        width:25,
        height: 25,
        backgroundColor: '#003d5a',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowDataText1: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
        borderRadius: 5,
    },
})