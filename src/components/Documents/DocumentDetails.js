import React, {Component} from 'react'
import {View, Text, StyleSheet, Alert, ScrollView, Dimensions, AsyncStorage, ActivityIndicator, TouchableOpacity, Clipboard, PermissionsAndroid} from 'react-native'
import { ProgressDialog } from 'react-native-simple-dialogs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Ionicons';
import fetch_blob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import { NavigationEvents } from 'react-navigation';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
 
class DocumentDetails extends Component {

    static navigationOptions = {
        title: "Document Detail"
    }
    
    state = {
        auth: null,
        userId: null,
        signButtonDisable: true,
        signButtonOpacity: 0.5,
        downloadButtonDisable: true,
        downloadButtonOpacity: 0.5,
        id: this.props.navigation.state.params.Id,
        details: null,
        cancel:null,
        Document:[],
        data: [],
        user:null,
        pdVisible: true,
        pdTitle: "Getting the info",
        history: [],
        signers: [],
        observers: [],
        isObservers: false,
        sequentialFlow: null,
        notarized:[],
    }
    
    requestStoragePermission = async() => {
        try {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the storage');
            this.setState({downloadButtonDisable:false, downloadButtonOpacity: 1.0})      
          } else {
            console.log('Storage permission denied');
            Alert.alert(
                'Allow Permission? ',
                "By denying permission you won't able to download document",
                [
                    {
                        text: 'Yes', onPress: ()=> this.requestStoragePermission()
                    },
                    {
                        text: 'NO', onPress: () => this.setState({downloadButtonDisable:true, downloadButtonOpacity: 0.5})
                    },
                ],
                {cancelable: true},
            )
          }
        } catch (err) {
          console.warn(err);
        }
      }

    decline= async() =>{

        return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/decline',{
            method: 'POST',
            headers: {
                'Authorization':this.state.auth,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                documentId: this.state.id,
                declineReason: "don't want to sign"
            }),
            }).then((response) => response.json())
            .then((responseJson)=>{
<<<<<<< HEAD
               
                    console.warn(responseJson)
    
=======
               alert(responseJson["message"])
               this.documentDetails()
>>>>>>> 29f9655849f9251d98e398a701d22bd6a7052557
                    
            })     
        .catch((error) => {
          alert(JSON.stringify(error));
        });
    
  
    }

    documentDetails = async() => {
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/document-detail/'+this.state.id,{
        method: 'GET',
        headers: {
            'Authorization':this.state.auth,
        }}).then((response) => response.json())
        .then((responseJson) => {
            this.setState({details: responseJson["data"][0], observers: responseJson["data"][0]["observers"], signers: responseJson["data"][0]["signers"], history: responseJson["data"][0]["documentHistory"]})
            //console.warn(responseJson)
            if(responseJson["data"][0]["sequentialFlow"] == true) {
                //console.warn("yes")
                this.setState({sequentialFlow: "Sequential Flow"})
            } else this.setState({sequentialFlow: "Parallel Flow"})
            
            this.state.signers.map((signers)=>{
                    //console.warn(history)
                    const userID  = []
                    userID.push(signers.userId)
                    for (let i=0; i<userID.length;i++) {
                        if(userID[i] == this.state.userId) {
                            //console.warn("yess")
                            this.setState({signButtonDisable: false, signButtonOpacity:1.0});
                            return true;
                        }
                    }   
            })

            if(this.state.details["rejectedByCurrentUser"] || this.state.details["notarization"]["isNotarized"]) {
                
               this.setState({signButtonDisable: true, signButtonOpacity:0.5});
            }

            if(!this.state.observers.length == 0) {
                //console.warn("err")
                this.setState({isObservers:true})
            }
            this.setState({pdVisible: false})
        })
        .catch((error) => {
            console.warn(error);
        });
    }


    download = () => {
        this.setState({pdTitle:"Downloading", pdVisible: true})
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/download',{
        method: 'POST',
        headers: {
            'Authorization':this.state.auth,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            documentId: this.state.id
        }),
        }).then((response) => response.json())
        .then((responseJson) => {
            if(responseJson["data"] == null)
            {
                this.setState({pdVisible: false})
                console.warn(responseJson)
            } else {
            this.setState({data: responseJson["data"][0]["fileBytes"]})
            //console.warn(responseJson["data"][0]["fileBytes"])
            this.setState({pdVisible: false})
            const fs = fetch_blob.fs
            const dirs = fetch_blob.fs.dirs 
            const file_path = dirs.DownloadDir + "/" + this.state.details["documentDetail"]["fileName"]
            
            var image_data = this.state.data
                
            RNFS.writeFile(file_path, image_data, 'base64')
                .then((success) => {
                    alert('Document Saved!');
                })
                .catch((error) => {
                    alert(JSON.stringify(error.message));
            });


            // this.props.navigation.navigate('Test', {'data': this.state.data})
            //this.props.navigation.navigate('Document_Preview',{'data': this.state.data})
        }
        })
        .catch((error) => {
            console.warn(error.message);
        });
    

    }

    preview = async() => {
        this.setState({pdTitle:"Previewing", pdVisible: true})
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/preview/'+this.state.id,{
        method: 'GET',
        headers: {
            'Authorization':this.state.auth,
        }}).then((response) => response.json())
        .then((responseJson) => {
            //console.warn(responseJson)
            if(responseJson["data"] == null)
            {
                this.setState({pdVisible: false})
                alert(responseJson["error"])
            } else {
<<<<<<< HEAD
            this.setState({data: responseJson["data"][0]["documentData"]})
            
            this.setState({pdVisible: false})
           
            this.props.navigation.navigate('Document_Preview',{'data': this.state.data})
        }
=======
                this.setState({data: responseJson["data"][0]["documentData"]})
                this.setState({pdVisible: false})
                this.props.navigation.navigate('Document_Preview',{'data': this.state.data, 'Id': this.state.id})
            }
>>>>>>> 29f9655849f9251d98e398a701d22bd6a7052557
        })
        .catch((error) => {
            console.warn(error.message);
        });
    }  

<<<<<<< HEAD
    certificate = () =>{
        if(this.state.details["notarization"]["isNotarized"] == true)
        {
            return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/certificate/'+this.state.id,{
                method: 'GET',
                headers: {
                    'Authorization':this.state.auth,
                }}).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({data: responseJson["data"][0]})
                    this.props.navigation.navigate('DocumentCertificate',{'data': this.state.data})    
                })
                .catch((error) => {
                    console.warn(error);
                });
        }
        else{
            alert('Document is not yet Notarized');
        }
    }

    sign = async() =>{
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/user/profile', {
=======
    
    signTheDocument(){  
        this.setState({pdTitle:"Previewing", pdVisible: true})
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/sign/'+this.state.id,{
>>>>>>> 29f9655849f9251d98e398a701d22bd6a7052557
        method: 'GET',
        headers: {
            'Authorization':this.state.auth,
        }}).then((response) => response.json())
        .then((responseJson) => {  
            //console.warn(responseJson)
            if(responseJson["data"] == null)
            {
                this.setState({pdVisible: false})
                alert(responseJson["error"])
            } else {
                this.setState({data: responseJson["data"][0]})
                this.setState({pdVisible: false})
                this.props.navigation.navigate('Document_Details_Sign',{'data': this.state.data, 'Id': this.state.id})
            }
            })
        .catch((error) => {
            console.warn(error.message);
        });
    }


    copyDH = async() => {
        await Clipboard.setString(this.state.details["documentDetail"]["documentFileHash"]);
        alert('Copied to Clipboard!');
    }

    copyTH = async() => {
        await Clipboard.setString(this.state.details["notarization"]["txHash"]);
        alert('Copied to Clipboard!');
    }

    componentWillMount = async() =>{
        let auth = await AsyncStorage.getItem('auth');
        let userId = await AsyncStorage.getItem('userId');
        this.state.auth = auth;
        this.state.userId = userId;
        //console.warn(this.state.userId)
        setTimeout( () => { this.requestStoragePermission() }, 500);
        this.documentDetails();
        
    }

    didFocus = async() => {
      this.documentDetails()
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <ProgressDialog
                    visible={this.state.pdVisible}
                    title={this.state.pdTitle}
                    message="Please wait..."
                    activityIndicatorColor="#003d5a"
                    activityIndicatorSize="small"
                    animationType="fade"
                />
                 <NavigationEvents
                    onDidFocus={payload => this.didFocus()}/>
                
                {this.state.details != null ? 
                    <ScrollView>
<<<<<<< HEAD
        
=======
                        
>>>>>>> 29f9655849f9251d98e398a701d22bd6a7052557
                        <View style={styles.box}>

                            <View style = {[{flex: 1, flexDirection:'row'}, ]}>
                                <View style={{flex:0.2, justifyContent: "center", alignItems: "center" , color:'red'}}>
                                    {this.state.details["documentDetail"]["extension"] == ".pdf" ?
                                        <Icon
                                            name="file-pdf-o"
                                            size={30}
                                            color="red"
                                        /> : null
                                    }
                                    {this.state.details["documentDetail"]["extension"] == ".docx" || this.state.details["documentDetail"]["extension"] == ".doc" ?
                                        <Icon
                                            name="file-word-o"
                                            size={30}
                                            color="blue"
                                        /> : null
                                    } 
                                    {this.state.details["documentDetail"]["extension"] == ".pptx" || this.state.details["documentDetail"]["extension"] == ".ppt" ?
                                        <Icon
                                            name="file-powerpoint-o"
                                            size={30}
                                            color="orange"
                                        /> : null
                                    } 
                                    {this.state.details["documentDetail"]["extension"] == ".xlsx" || this.state.details["documentDetail"]["extension"] == ".xls" ?
                                        <Icon
                                            name="file-excel-o"
                                            size={30}
                                            color="green"
                                        /> : null
                                    } 
                                    
                                </View>

                            <View style={[{flex:0.8},styles.DocumentsList]}>
                                    <Text style={ [styles.DocumentsListFont, {fontSize:17, fontWeight: 'bold'}] }>
                                        {this.state.details["documentDetail"]["fileName"]}
                                    </Text>
                                    <Text style={ [styles.DocumentsListFont, {color: 'grey'}] }>
                                    Uploaded By: {this.state.details["documentDetail"]["uploadedBy"]}
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
                                            {this.state.details["documentDetail"]["documentFileHash"]}
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

                        <View style={styles.box}>
                        <Text style={{fontWeight: "bold", fontSize: 17, color: "black"}}> Observers </Text>
                        
                        {this.state.isObservers ?
                        <ScrollView>
                        {
                            this.state.observers.map((observers)=>{
                                
                                return(
                                <View style={{margin:10}} key={observers.userId} >
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
                            <View style={styles.DocumentsList}>
                                <Text style={styles.DocumentsListFont}>
                                    There are no Observers
                                </Text>
                            </View> 
                        }
                        </View>
                        

                        <View style={styles.box}>
                        <Text style={{fontWeight: "bold", fontSize: 17, color: "black"}}> Notarization </Text>

                        <View style = {[{flex: 1, flexDirection:'row', marginTop:10}, ]}>
                        {this.state.details["notarization"]["isNotarized"] ? 
                            <View style={styles.DocumentsList}>
                                <Text style={ [styles.DocumentsListFont, { alignContent: "flex-start"}] }>
                                   Block ID
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {color:'grey', alignContent: "flex-end"}] }>
                                    {this.state.details["notarization"]["blockId"]}
                                </Text>
         
                                <Text style={ [styles.DocumentsListFont, { alignContent: "flex-start"}] }>
                                   Notarized On
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {color:'grey', alignContent: "flex-end"}] }>
                                    {this.state.details["notarization"]["notarizedOn"]}
                                </Text>

                                <Text style={ [styles.DocumentsListFont, { alignContent: "flex-start"}] }>
                                    Transaction Hash
                                </Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text selectable = {true} style={ [styles.DocumentsListFont, {flex:0.92,color:'grey', alignContent: "flex-end"}] }>
                                        {this.state.details["notarization"]["txHash"]}
                                    </Text>
                                    <TouchableOpacity onPress={()=>this.copyTH()} 
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
<<<<<<< HEAD
=======
                        
>>>>>>> 29f9655849f9251d98e398a701d22bd6a7052557
                        <View style={{flex:1, flexDirection:'row', justifyContent: 'center'}}>

                        {this.state.details["documentDetail"]["documentStatus"] == 2 ?
                        <TouchableOpacity  
                            disabled={this.state.downloadButtonDisable}
                            onPress={()=> this.download()}
                            style = {[styles.buttonContainer, {opacity:this.state.downloadButtonOpacity, flex: 0.2, alignItems:'center'}]}>
                                <Icon1
                                    name="md-cloud-download"
                                    size={15}
                                    color="white"
                                />
                        </TouchableOpacity> :  
                        <TouchableOpacity  
                            disabled={this.state.signButtonDisable} 
                            onPress={()=> this.signTheDocument()}
                            style = {[styles.buttonContainer, {opacity: this.state.signButtonOpacity}]}>
                            <Text style = { styles.buttonText }>Sign Now</Text>
                        </TouchableOpacity>}

                        <TouchableOpacity  onPress={()=> this.preview()}
                        style = {styles.buttonContainer}>
                            <Text style = { styles.buttonText }>Preview</Text>
                        </TouchableOpacity> 
                        {
                            this.state.details["rejectedByCurrentUser"] || this.state.details["notarization"]["isNotarized"] ?
                            null
                            :
                            <TouchableOpacity  onPress={()=>this.decline()} 
                            style = {[styles.buttonContainer, {flex: 0.2, alignItems:'center'}]}>
                                <Icon
                                        name="close"
                                        size={15}
                                        color="white"
                                    />
                            </TouchableOpacity>
                        }

                        <TouchableOpacity  onPress={()=> this.certificate()}
                            style = {styles.buttonContainer}>
                            <Text style = {[styles.buttonText,]}>Certificate</Text>
                        </TouchableOpacity> 
                        </View>

                    </ScrollView>


                    : <ActivityIndicator color="white" size="large" />
                }
            </View>
            );
        }
    }

export default DocumentDetails

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
    DocumentsList:{
        flex: 1,
        backgroundColor: '#f5f5f5',
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
    box: { 
        marginTop: 25,
        margin: 10,
        borderRadius:5,
        borderColor: "#003d5a",
        borderWidth: 2,
        borderWidth: 2,
        backgroundColor: '#f5f5f5'
    },
    buttonContainer: {
        flex: 0.5,
        backgroundColor: '#003d5a',
        margin: 20,
        height:40,
        justifyContent: 'center',
    },
    buttonText: {
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
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