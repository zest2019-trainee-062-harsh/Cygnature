import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView, Dimensions, AsyncStorage, ActivityIndicator, TouchableOpacity} from 'react-native'
import { ProgressDialog } from 'react-native-simple-dialogs';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
 
class DocumentDetails extends Component {

    static navigationOptions = {
        title: "Document details"
    }

    state = {
        auth: null,
        id: this.props.navigation.state.params.Id,
        details: null,
        pdVisible: true,
    }

    documentDetails = async() => {
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/document-detail/'+this.state.id,{
        method: 'GET',
        headers: {
            'Authorization':this.state.auth,
        }}).then((response) => response.json())
        .then((responseJson) => {
            this.setState({details: responseJson["data"][0]})
            this.setState({pdVisible: false})
        })
        .catch((error) => {
            console.warn(error);
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
                    title="Getting the info"
                    message="Please wait..."
                    activityIndicatorColor="#003d5a"
                    activityIndicatorSize="small"
                    animationType="fade"
                />
                {this.state.details != null ? 
                    <ScrollView>
                        <Text style={{fontWeight: "bold", fontSize: 25, color: "black"}}> Documents-Details </Text>
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                    File Name
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    {this.state.details["documentDetail"]["fileName"]}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
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
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                    Uploaded By
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    {this.state.details["documentDetail"]["uploadedBy"]}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                    Hash
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    {this.state.details["documentDetail"]["documentFileHash"]}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                    Status
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    {this.state.details["documentDetail"]["documentStatus"]}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                    Created at
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    {this.state.details["documentDetail"]["creationTime"]}
                                </Text>
                            </View>
                        </View>
                        <Text style={{fontWeight: "bold", fontSize: 25, color: "black"}}> Document-History </Text>
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text>
                                    {this.state.details["documentHistory"][0]["fullName"]}: 
                                    {this.state.details["documentHistory"][0]["historyText"]}
                                </Text>
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
                        <Text style={{fontWeight: "bold", fontSize: 25, color: "black"}}> Signers </Text>
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
                        <Text style={{fontWeight: "bold", fontSize: 25, color: "black"}}> Observers </Text>
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
        fontSize: 17
    },
})