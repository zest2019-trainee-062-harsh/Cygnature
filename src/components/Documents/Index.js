import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions,
     AsyncStorage, } from 'react-native'
import {Button } from 'react-native-elements'
import { Dropdown } from 'react-native-material-dropdown'
import { ProgressDialog } from 'react-native-simple-dialogs';
import Icon from 'react-native-vector-icons/FontAwesome';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
 
class Documents extends Component {

    state = {
        auth: null,
        token: null,
        documents: [],
        pdVisible: true,
        currentPage: 0,
        previousPage: true,
        nextPage: false,
        pagination: null,

    }

    componentWillMount = async() =>{
        let auth = await AsyncStorage.getItem('auth');
        let token = await AsyncStorage.getItem('token');
        this.state.auth = auth;
        this.state.token = token;
        this.state.totalPages = null;
        if(this.state.totalPages == 1){
            this.state.pagination = false
        }
        else{
            this.state.pagination = true
        }
        this.fetchData()
    }

    fetchData = async() =>{
        this.setState({pdVisible: true})
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/documents',{
        method: 'POST',
        headers: {
            'Authorization':this.state.auth,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "documentStatusId": null,
            "currentPage": this.state.currentPage,
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
            this.setState({documents: responseJson["data"][0]["documents"],
                totalPages: responseJson["data"][0]["totalPages"],
                currentPage: responseJson["data"][0]["currentPage"]
            })
            this.setState({value: 1, pdVisible: false})
            console.warn(responseJson)
            console.warn(this.state.totalPages)
            console.warn(this.state.currentPage)
        })
        .catch((error) => {
            console.warn(error);
        });
    }

    nextPage() {
        console.warn("Next Page")
        if(this.state.currentPage < this.state.totalPages){
            let currentPageNo = this.state.currentPage
            currentPageNo = currentPageNo + 1
            // this.state.e
            this.fetchData()
        }
    }

    previousPage() {
        console.warn("Previous Page")
        if(this.state.currentPage < this.state.totalPages){
            this.setState({currentPage: this.state.currentPage - 1})
            this.fetchData()
        }
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
                            <TouchableOpacity 
                                style={{borderWidth: 1, borderColor: "#003d5a", borderRadius: 5, marginBottom: 5, marginTop: 5}}
                                key={docs.Id}
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
                    style={{borderColor: "#003d5a", borderWidth: 0.5, marginBottom: 5, marginTop: 5, padding: 10}}
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

                {this.state.pagination ? 
                    <View style={styles.footerContainer}>
                        <View style={{flex: 0.5, alignItems: "center"}}>
                            <TouchableOpacity style = { styles.buttonContainer }
                                // disabled = {this.state.previousPage}
                                onPress = {() => this.previousPage()}
                            >
                                <Icon
                                    name="arrow-left"
                                    size={15}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 0.5, alignItems: "center"}}>
                            <TouchableOpacity style = { styles.buttonContainer }
                                disabled = {this.state.nextPage}
                                onPress = {() => this.nextPage()}
                            >
                                <Icon
                                    name="arrow-right"
                                    size={15}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                    </View> : null 
                }
                </View>
            )
        }
    }

export default Documents

const styles = StyleSheet.create({
    mainContainer:{
        borderWidth:1,
        borderColor:'black',
        flex:1,
        backgroundColor: 'white',
        margin: 7, borderWidth: 2,
        borderRadius:5,
        borderColor: "#003d5a",
        padding: 10
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
    footerContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    buttonContainer: {
        backgroundColor: "#003d5a",
        borderRadius: 5,
        paddingVertical: 10,
        padding: 10,
        width: 100,
    }
})