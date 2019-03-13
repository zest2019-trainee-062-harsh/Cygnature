import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions,
     AsyncStorage, } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown'
import { ProgressDialog } from 'react-native-simple-dialogs';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
 
class Documents extends Component {
 

    state = {
        auth: null,
        token: null,
        documents: [],
        pdVisible: true,
    }

    componentWillMount = async() =>{
        let auth = await AsyncStorage.getItem('auth');
        let token = await AsyncStorage.getItem('token');
        this.state.auth = auth;
        this.state.token = token;
        //alert(token)
        //alert(auth)


        return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/documents',{
        method: 'POST',
        headers: {
            'Authorization':this.state.auth,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "documentStatusId": null,
            "currentPage": 0,
            "isNext": true,
            "searchText": "",
            "startDate": "",
            "endDate": "",
            "signatureType": 0,
            "uploadedBy": "",
            "signerName": "",
            "dateDuration": ""
        }),
        }).then((response) => response.json())
        .then((responseJson) => {
            // console.warn(responseJson["data"][0]["documents"])
            this.setState({documents: responseJson["data"][0]["documents"]})
            this.setState({value: 1, pdVisible: false})
            // console.warn(this.state.documents)
        })
        .catch((error) => {
            console.warn(error);
        });
    }

    render() {
        const navigate = this.props.navigation;
        let data = [
            {
                value: 0+" - Awaiting my sign"
            },
            {
                value: 2+" - Completed"
            },
            {
                value: 3+" - Awaiting others"
            },
            {
                value: 6+" - Due soon"
            },
            {
                value: 7+" - Declined"
            }
        ]
        return (
            <View style={styles.mainContainer}>
             <ProgressDialog
                visible={this.state.pdVisible}
                title="Fetching Documents!"
                message="Please wait..."
                activityIndicatorColor="#003d5a"
                activityIndicatorSize="large"
                animationType="slide"
            />
                <Text style={{fontWeight: "bold", fontSize: 25, color: "black"}}> Documents-List </Text>
                <ScrollView>
                    {
                        this.state.documents.map((docs)=>{
                        return(
                            <TouchableOpacity key={docs.Id}
                                onPress={()=>this.props.navigation.navigate("DocumentDetails", {Id: docs.Id, token: this.state.token})}
                            >
                                <View style={styles.DocumentsList}>
                                        <Text style={[styles.DocumentsListFont, {fontSize: 17, fontWeight: "bold"}]}>
                                            {docs.name}{docs.extension}
                                        </Text>
                                        <View style={{flexDirection: "row"}}>
                                            <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                                Completed by {docs.uploadedBy}
                                            </Text>
                                            <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                                Date: {docs.creationTime}
                                            </Text>
                                        </View>
                                    </View>
                                
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
                <TouchableOpacity
                >
                    <Dropdown
                        label="Select the status"
                        data={data}
                        selectedItemColor="#003d5a"
                        rippleCentered={true}
                        itemTextStyle={"helvetica"}
                    >
                    </Dropdown>
                </TouchableOpacity>
            </View>
            )
        }
    }

export default Documents

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
        fontSize: 12
    },
})