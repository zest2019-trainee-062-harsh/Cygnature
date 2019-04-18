import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView, Dimensions, AsyncStorage, ActivityIndicator, TouchableOpacity} from 'react-native'
import { ProgressDialog } from 'react-native-simple-dialogs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Ionicons';
import fetch_blob from 'react-native-fetch-blob';
import RNFS from 'react-native-fs';

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
        id: this.props.navigation.state.params.Id,
        details: null,
        data: [],
        pdVisible: true,
        pdTitle: "Getting the info",
        history: [],
        signers: [],
        observers: [],
        isObservers: false,
        sequentialFlow: null,
    }

    documentDetails = async() => {
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/document-detail/'+this.state.id,{
        method: 'GET',
        headers: {
            'Authorization':this.state.auth,
        }}).then((response) => response.json())
        .then((responseJson) => {
            this.setState({details: responseJson["data"][0], observers: responseJson["data"][0]["observers"], signers: responseJson["data"][0]["signers"], history: responseJson["data"][0]["documentHistory"]})
            console.warn(responseJson["data"][0])

            if(responseJson["data"][0]["sequentialFlow"] == true) {
                //console.warn("yes")
                this.setState({sequentialFlow: "Sequential Signature"})
            } else this.setState({sequentialFlow: "Parallel Signature"})
            
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
            //console.warn(dirs.DocumentDir)  /data/user/0/com.bigjpg/files
            //console.warn(dirs.CacheDir)     /data/user/0/com.bigjpg/cache
            //console.warn(dirs.DCIMDir)      /storage/emulated/0/DCIM
            //console.lowarng(dirs.DownloadDir)  /storage/emulated/0/Download
            //console.warn(dirs.PictureDir)   /storage/emulated/0/Pictures
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
            if(responseJson["data"] == null)
            {
                this.setState({pdVisible: false})
                console.warn(responseJson)
            } else {
            this.setState({data: responseJson["data"][0]["documentData"]})
            //console.warn(responseJson["data"][0]["documentData"])
            this.setState({pdVisible: false})
            // this.props.navigation.navigate('Test', {'data': this.state.data})
            this.props.navigation.navigate('Document_Preview',{'data': this.state.data})
        }
        })
        .catch((error) => {
            console.warn(error.message);
        });
    }  
      signTheDocument(){
        Alert.alert(
            'Alert!',
            'Make sure to view the document before signing the document.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {text: 'OK', onPress: () => this.sign()},
            ],
            {cancelable: false},
        );
    }

    sign = async() =>{
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/user/profile', {
        method: 'GET',
        headers: {
            'Authorization': this.state.auth,
        },
        }).then((response) => response.json())
        .then((responseJson) => {
            return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/sign',{
            method: 'POST',
            headers: {
                'Authorization': this.state.auth,
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "documentId": this.state.id,
                "aspectRatio": 1,
                "isSigner": true,
                "signatureType": "ESignature",
                "documentLatitude": 4.092356,
                "documentLongitude": -56.062161,
                "userAgent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36",
                "userIPAddress": "61.12.66.6",
                "userTimeZoneOffSet": "+05:30",
                "rememberSign": false,
                "signData": responseJson["data"][0]["impressions"][0]["imageBytes"]
            })
            }).then((response) => response.json())
            .then((responseJson) => {
                // console.warn(responseJson)
                alert(responseJson["message"])
            })
            .catch((error) => {
                console.warn(error.message);
            });
        })
        .catch((error) => {
            console.warn(error);
        });
    }

    componentWillMount = async() =>{
        let auth = await AsyncStorage.getItem('auth');
        let userId = await AsyncStorage.getItem('userId');
        this.state.auth = auth;
        this.state.userId = userId;
        console.warn(this.state.userId)
        this.documentDetails();
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
                {this.state.details != null ? 
                    <ScrollView>
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {fontWeight:'bold', alignContent: "flex-start"}] }>
                                    File Name
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    {this.state.details["documentDetail"]["fileName"]}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {fontWeight:'bold', alignContent: "flex-start"}] }>
                                    Activation Status
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    {
                                        this.state.details["documentDetail"]["isActive"] ? <Text>Yes</Text>
                                        : <Text>NO</Text>
                                    }
                                </Text>
                            </View>
                        </View>
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {fontWeight:'bold', alignContent: "flex-start"}] }>
                                    Uploaded By
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    {this.state.details["documentDetail"]["uploadedBy"]}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {fontWeight:'bold', alignContent: "flex-start"}] }>
                                    Document Hash
                                </Text>
                                <Text selectable = {true} style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    {this.state.details["documentDetail"]["documentFileHash"]}
                                </Text>
                            </View>
                        </View>
                        {this.state.details["notarization"]["txHash"] ?
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {fontWeight:'bold', alignContent: "flex-start"}] }>
                                    Transaction Hash
                                </Text>
                                <Text selectable = {true} style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    {this.state.details["notarization"]["txHash"]}
                                </Text>
                            </View>
                        </View> : null}
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {fontWeight:'bold', alignContent: "flex-start"}] }>
                                    Status
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    {this.state.details["documentDetail"]["documentStatus"]}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {fontWeight:'bold', alignContent: "flex-start"}] }>
                                    Created at
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    {this.state.details["documentDetail"]["creationTime"]}
                                </Text>
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
                                <View key={history.Id} >
                                    <Text style={styles.DocumentsListFont}>
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
                        <Text style={{fontSize: 15, color: "black", marginLeft: 5}}> {this.state.sequentialFlow} </Text>
                        <View style={styles.DocumentsList}>
                        <ScrollView>
                        {
                            this.state.signers.map((signers)=>{
                                //console.warn(history)
                                // const userID  = []
                                // userID.push(signers.userId)
                                // for (let i=0; i<userID.length;i++) {
                                //     if(userID[i] == this.state.userId) {
                                //         //console.warn("yess")
                                //         this.setState({signButtonDisable: true});
                                //         return true;
                                //     }
                                // }
                                
                                
                                return(
                                <View key={signers.userId} >
                                    <Text style={styles.DocumentsListFont}>
                                        {signers.userId}
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
                                //console.warn(history)
                                return(
                                <View key={observers.userId} >
                                    <Text style={styles.DocumentsListFont}>
                                        {observers.userId}
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

                        {/* <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                    Signed by current user?
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    {this.state.details["signedByCurrentUser"]}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                    Signed by all users?
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    {
                                        this.state.details["signedByAll"] ? <Text>Yes</Text>
                                        : <Text>NO</Text>
                                    }
                                </Text>
                            </View>
                        </View>  */}
                        {/* <Text style={{fontWeight: "bold", fontSize: 17, color: "black"}}> Signers </Text>
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                    User Email
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    {this.state.details["signers"][0]["email"]}
                                </Text>
                            </View>
                        </View> */}
                        {/* <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                    User Name
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    {this.state.details["signers"][0]["fullName"]}
                                </Text>
                            </View>
                        </View> */}
                        {/* <Text style={{fontWeight: "bold", fontSize: 17, color: "black"}}> Observers </Text>
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                    Observers
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    {this.state.details["observers"]}
                                </Text>
                            </View>
                        </View> */}
                        {/* <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                    Rejected?
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    {this.state.details["rejectedByCurrentUser"] ? <Text>Yes</Text>
                                    : <Text>No</Text>}
                                </Text>
                            </View>
                        </View> */}
                        <View style={{flex:1, flexDirection:'row'}}>

                        {this.state.details["documentDetail"]["documentStatus"] == 2 ?
                        <TouchableOpacity  onPress={()=> this.download()}
                        style = {[styles.buttonContainer, {flex: 0.2, alignItems:'center'}]}>
                            <Icon1
                                    name="md-cloud-download"
                                    size={15}
                                    color="white"
                                />
                        </TouchableOpacity> :  
                        <TouchableOpacity  
                        disabled={this.state.signButtonDisable} 
                        onPress={()=> this.sign()}
                        style = {[styles.buttonContainer, {opacity: this.state.signButtonOpacity}]}>
                            <Text style = { styles.buttonText }>Sign Now</Text>
                        </TouchableOpacity>}

                        <TouchableOpacity  onPress={()=> this.preview()}
                        style = {styles.buttonContainer}>
                            <Text style = { styles.buttonText }>Preview</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity  
                        style = {[styles.buttonContainer, {flex: 0.2, alignItems:'center'}]}>
                            <Icon
                                    name="close"
                                    size={15}
                                    color="white"
                                />
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
    box: { 
        marginTop: 25,
        margin: 10,
        borderRadius:5,
        borderColor: "#003d5a",
        borderWidth: 2,
        borderWidth: 2,
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
})