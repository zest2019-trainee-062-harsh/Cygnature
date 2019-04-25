import React, { Component } from 'react'
import { StyleSheet,Text, View,ScrollView, Dimensions ,TouchableOpacity,Image} from 'react-native'

var height = Dimensions.get('window').height; //full height

export default class DocumentCertificate extends Component {

    constructor(props){
        super(props)
            this.state.data  = this.props.navigation.getParam('data')
    }
    static navigationOptions = {
        title: "Document Certificate"
    }
    state = {
        data: [],
    }
    
  render() {
    return (
      <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Image source={require('../../../img/logo-white.png')} style={{marginLeft:5,marginTop:5}}/>
        <Text style={{marginTop:10,color:"white",fontWeight:"bold",marginLeft:10}}> {this.state.data["documentDetail"]["name"]}</Text>
      </View>
      <ScrollView>             
        <View style={styles.box}>

            <Text style={{fontWeight: "bold", fontSize: 17, color: "black"}}> Document Info </Text>
        
            <View style={styles.DocumentsList}>
                <Text style={ [styles.DocumentsListFont] }>
                    Document Id
                </Text>
                <Text style={ [styles.DocumentsListFont,{color:"grey"}] }>
                    {this.state.data["documentDetail"]["Id"]}
                </Text>
            </View>
            <View style={styles.DocumentsList}>
                <Text style={ [styles.DocumentsListFont] }>
                    Document Status
                </Text>
                <Text style={ [styles.DocumentsListFont,{color:"grey"}] }>
                     Signed
                </Text>
            </View>
        </View> 
        <View style={styles.box}>

            <Text style={{fontWeight: "bold", fontSize: 17, color: "black"}}> Document Owner Info </Text>
        
            <View style={styles.DocumentsList}>
                <Text style={ [styles.DocumentsListFont] }>
                    Name
                </Text>
                <Text style={ [styles.DocumentsListFont,{color:"grey"}] }>
                    {this.state.data["ownerName"]}
                </Text>
            </View>
            <View style={styles.DocumentsList}>
                <Text style={ [styles.DocumentsListFont] }>
                    Email
                </Text>
                <Text style={ [styles.DocumentsListFont,{color:"grey"}] }>
                    {this.state.data["ownerEmail"]}
                </Text>
            </View> 
            <View style={styles.DocumentsList}>
                <Text style={ [styles.DocumentsListFont] }>
                    IP Address
                </Text>
                <Text style={ [styles.DocumentsListFont,{color:"grey"}] }>
                    {this.state.data["ownerIPAddress"]}
                </Text>
            </View>   
            <View style={styles.DocumentsList}>
                <Text style={ [styles.DocumentsListFont] }>
                    Device
                </Text>
                <Text style={ [styles.DocumentsListFont,{color:"grey"}] }>
                    {this.state.data["ownerDevice"]}
                </Text>
            </View>         
        </View>
        <View style={styles.box}>

            <Text style={{fontWeight: "bold", fontSize: 17, color: "black"}}> Timestamping </Text>

            <View style={styles.DocumentsList}>
                <Text style={ [styles.DocumentsListFont] }>
                    Block Id
                </Text>
                <Text style={ [styles.DocumentsListFont,{color:"grey"}] }>
                    {this.state.data["notarization"]["blockId"]}
                </Text>
            </View>
            <View style={styles.DocumentsList}>
                <Text style={ [styles.DocumentsListFont] }>
                    Timestamped On
                </Text>
                <Text style={ [styles.DocumentsListFont,{color:"grey"}] }>
                    {this.state.data["notarization"]["notarizedOn"]}
                </Text>
            </View>
            <View style={styles.DocumentsList}>
                <Text style={ [styles.DocumentsListFont] }>
                    Document Hash
                </Text>
                <Text style={ [styles.DocumentsListFont,{color:"grey"}] }>
                    {this.state.data["documentDetail"]["documentFileHash"]}
                </Text>
            </View> 
            <View style={styles.DocumentsList}>
                <Text style={ [styles.DocumentsListFont] }>
                    Transaction Hash
                </Text>
                <Text style={ [styles.DocumentsListFont,{color:"grey"}] }>
                    {this.state.data["notarization"]["txHash"]}
                </Text>
            </View>   
        </View> 
        <View style={styles.box}>

            <Text style={{fontWeight: "bold", fontSize: 17, color: "black"}}> Signer </Text>
                
            <View style={styles.DocumentsList}>
                <TouchableOpacity disabled style={[styles.rowDataBg,{marginLeft:10}]}>
                    <Text style={styles.rowDataText1}>{this.state.data["signers"][0]["profileShortName"]}</Text>
                </TouchableOpacity>
                <Text style={[styles.DocumentsListFont, {marginLeft:40,fontWeight: "bold"}]}>
                    {this.state.data["signers"][0]["fullName"]}
                </Text>
                    
            </View>

            <View style={styles.DocumentsList}>
                <Text style={ [styles.DocumentsListFont] }>
                    Email
                </Text>
                <Text style={ [styles.DocumentsListFont,{color:"grey"}] }>
                    {this.state.data["signers"][0]["email"]}
                </Text>
            </View>
            <View style={styles.DocumentsList}>
                <Text style={ [styles.DocumentsListFont] }>
                    Signature Provided
                </Text>
                <Text style={ [styles.DocumentsListFont,{color:"grey"}] }>
                     E-Signature
                </Text>
            </View>
        </View> 

        <TouchableOpacity  onPress={()=> this.certificate()}
            style = {styles.buttonContainer}>
                <Text style = { styles.buttonText }>Download</Text>
        </TouchableOpacity>              
                        
      </ScrollView>                  
     </View>
    )}
}
    
const styles = StyleSheet.create({
    mainContainer:{
        height: height*0.87,
        margin: 7,
        borderWidth: 2,
        borderRadius:5,
        borderColor: "#003d5a",
        padding: 10,
        backgroundColor: "white"
    },
    header:{
        height: 100,
        backgroundColor:"#003d5a",
        borderRadius:5,
    },
    DocumentsList:{
        color:"black",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5
    },
    DocumentsListFont:{
        color: "black",
        fontSize: 14
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
    buttonContainer: {
        flex: 0.5,
        backgroundColor: '#003d5a',
        margin: 20,
        height:40,
        justifyContent: 'center',
        borderRadius:10
    },
    buttonText: {
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
})
