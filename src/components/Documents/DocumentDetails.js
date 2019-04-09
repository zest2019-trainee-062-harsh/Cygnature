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
        id: this.props.navigation.state.params.Id,
        details: null,
        data: [],
        pdVisible: true,
        pdTitle: "Getting the info",
    }

    documentDetails = async() => {
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/document-detail/'+this.state.id,{
        method: 'GET',
        headers: {
            'Authorization':this.state.auth,
        }}).then((response) => response.json())
        .then((responseJson) => {
            this.setState({details: responseJson["data"][0]})
            //console.warn(responseJson["data"][0])
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
            const file_path = dirs.DCIMDir + "/" + this.state.details["documentDetail"]["fileName"]
    //         console.warn(dirs.DocumentDir) // /data/user/0/com.bigjpg/files
    //   console.warn(dirs.CacheDir)    // /data/user/0/com.bigjpg/cache
    //   console.warn(dirs.DCIMDir)     // /storage/emulated/0/DCIM
    //   console.lowarng(dirs.DownloadDir) // /storage/emulated/0/Download
    //   console.warn(dirs.PictureDir)  // /storage/emulated/0/Pictures
    var image_data = this.state.data
    console.warn("Files Saved")
    RNFS.writeFile(file_path, image_data, 'base64')
    .catch((error) => {
      alert(JSON.stringify(error));
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

    componentWillMount = async() =>{
        let auth = await AsyncStorage.getItem('auth');
        this.state.auth = auth;
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
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    {this.state.details["documentDetail"]["documentFileHash"]}
                                </Text>
                            </View>
                        </View>
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
                            <View style={{flexDirection: "row"}}>
                                <Text>
                                    {this.state.details["documentHistory"][0]["fullName"]}: 
                                    {this.state.details["documentHistory"][0]["historyText"]}
                                </Text>
                            </View>
                        </View>
                        </View>

                        <View style={styles.DocumentsList}>
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
                                        this.state.details["signedByCurrentUser"] ? <Text>Yes</Text>
                                        : <Text>NO</Text>
                                    }
                                </Text>
                            </View>
                        </View> 
                        <Text style={{fontWeight: "bold", fontSize: 17, color: "black"}}> Signers </Text>
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                    User Email
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    {this.state.details["signers"][0]["email"]}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                    User Name
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    {this.state.details["signers"][0]["fullName"]}
                                </Text>
                            </View>
                        </View>
                        <Text style={{fontWeight: "bold", fontSize: 17, color: "black"}}> Observers </Text>
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                    Observers
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    {this.state.details["observers"]}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                    Rejected?
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    {this.state.details["rejectedByCurrentUser"] ? <Text>Yes</Text>
                                    : <Text>No</Text>}
                                </Text>
                            </View>
                        </View>
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
                        style = {styles.buttonContainer}>
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