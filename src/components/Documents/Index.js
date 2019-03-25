import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions,
     AsyncStorage, } from 'react-native'
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
        nextButtonOpacity : 1,
        previousButtonOpacity : 0.5,
        documentStatusId: null,
        totalRows: null,
        documentColor: null,
    }

    componentWillMount = async() =>{
        let auth = await AsyncStorage.getItem('auth');
        let token = await AsyncStorage.getItem('token');
        this.state.auth = auth;
        this.state.token = token;
        this.state.totalPages = null;
        this.fetchData()
    }

    fetchData = async() =>{
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
            this.setState({
                documents: responseJson["data"][0]["documents"],
                totalPages: responseJson["data"][0]["totalPages"],
                currentPage: responseJson["data"][0]["currentPage"],
                totalRows: responseJson["data"][0]["totalRows"]
            })
            this.setState({
                value: 1,
                pdVisible: false,
            })
            if(this.state.currentPage == this.state.totalPages){
                this.setState({
                    nextPage: true,
                    nextButtonOpacity: 0.5
                })
            }
            if(this.state.currentPage != 1){
                this.setState({
                    previousPage: false,
                    previousButtonOpacity: 1
                })
            }
        })
        .catch((error) => {
            console.warn(error);
        });
    }

    nextPage(){
        this.setState({pdVisible: true})
        if(this.state.currentPage < this.state.totalPages){
            this.fetchData()
        }
    }

    previousPage() {
        this.setState({pdVisible: true})
        if(this.state.currentPage <= this.state.totalPages){
            let currentPageNo = this.state.currentPage;
            this.setState({currentPage: currentPageNo - 1})
            return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/documents',{
            method: 'POST',
            headers: {
                'Authorization':this.state.auth,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "documentStatusId": this.state.documentStatusId,
                "currentPage": this.state.currentPage - 2,
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
                this.setState({
                    documents: responseJson["data"][0]["documents"],
                    totalPages: responseJson["data"][0]["totalPages"],
                    totalRows: responseJson["data"][0]["totalRows"]
                })
                this.setState({value: 1, pdVisible: false})
                if(this.state.currentPage == 1){
                    this.setState({
                        previousPage: true,
                        previousButtonOpacity: 0.5
                    })
                }        
                if(this.state.currentPage < this.state.totalPages){
                    this.setState({
                        nextPage: false,
                        nextButtonOpacity: 1
                    })
                }
            })
            .catch((error) => {
                console.warn(error);
            });
        }
    }

    onChangeHandler = (value) => {
        this.setState({pdVisible: true})
        this.setState({documentStatusId: value})
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/documents',{
        method: 'POST',
        headers: {
            'Authorization':this.state.auth,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "documentStatusId": this.state.documentStatusId,
            "currentPage": this.state.currentPage - 1,
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
            this.setState({documents: responseJson["data"][0]["documents"],
                totalPages: responseJson["data"][0]["totalPages"],
                totalRows: responseJson["data"][0]["totalRows"]
            })
            this.setState({value: 1, pdVisible: false})
            if(this.state.currentPage == 1){
                this.setState({
                    previousPage: true,
                    previousButtonOpacity: 0.5
                })
            }        
            if(this.state.currentPage < this.state.totalPages){
                this.setState({
                    nextPage: false,
                    nextButtonOpacity: 1
                })
            
            }
        })
        .catch((error) => {
            console.warn(error);
        });
      }

    render() {
        const navigate = this.props.navigation;
        let data = [
            {
                label: "All Documents",
                value: null
            },
            {
                label: "Awaiting my sign",
                value: 0
            },
            {
                label: "Awaiting others",
                value: 3
            },
            {
                label: "Completed",
                value: 2
            },
            {
                label: "Due soon",
                value: 6
            },
            {
                label: "Declined",
                value: 7
            }
        ]
        return(
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
                <Text style={{fontWeight: "bold", fontSize: 10, color: "black"}}>
                    {this.state.currentPage}/{this.state.totalPages}
                </Text>
                {
                    this.state.totalRows != 0 ?
                    <ScrollView>
                        {
                            this.state.documents.map((docs)=>{
                                if(docs.documentStatusForUser == 0){
                                    this.state.documentColor = '#111E6C'
                                }
                                if(docs.documentStatusForUser == 3){
                                    this.state.documentColor = '#FADA5E'
                                }
                                if(docs.documentStatusForUser == 2){
                                    this.state.documentColor = '#98FB98'
                                }
                                if(docs.documentStatusForUser == 6){
                                    this.state.documentColor = '#6593F5'
                                }
                                if(docs.documentStatusForUser == 7){
                                    this.state.documentColor = '#Df2800'
                                }
                            return(
                                <View key={docs.Id}>
                                    <TouchableOpacity
                                        style={{
                                            borderWidth: 0.5,
                                            borderColor: "#003d5a",
                                            borderRadius: 5,
                                            marginBottom: 5,
                                            marginTop: 5,
                                            backgroundColor: this.state.documentColor,
                                        }}
                                        onPress={()=>this.props.navigation.navigate("DocumentDetails", {Id: docs.Id, token: this.state.token})}
                                    >
                                        <View style={[styles.DocumentsList, {flexDirection: "row"}]}>
                                            <View style={{flex: 0.1, paddingRight: 5}}>
                                                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                                                    {docs.extension == ".pdf" ?
                                                        <Icon
                                                            name="file-pdf-o"
                                                            size={30}
                                                        /> : null
                                                    }
                                                    {docs.extension == ".docx" || docs.extension == ".doc" ?
                                                        <Icon
                                                            name="file-word-o"
                                                            size={30}
                                                        /> : null
                                                    }
                                                </View>
                                            </View>
                                            <View style={{flex: 0.9}}>
                                                <Text style={[styles.DocumentsListFont, {fontSize: 17, fontWeight: "bold"}]}>
                                                    {docs.name}
                                                </Text>
                                                <View style={{flexDirection: "row"}}>
                                                    <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                                        Uploaded By:{"\n"}
                                                        Created Time:
                                                    </Text>
                                                    <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                                        {docs.uploadedBy}{"\n"}
                                                        {docs.creationTime}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </ScrollView> :
                    <View style={styles.DocumentsList}>
                        <Text style={{fontSize: 25, fontWeight: "bold"}}>
                            No filtered documents present.
                        </Text>
                    </View>
                }    
                <TouchableOpacity
                    style={{borderColor: "#003d5a", borderWidth: 0.5, marginBottom: 5, marginTop: 5, padding: 10}}
                >
                    <Dropdown
                        label="Select the status"
                        data={data}
                        selectedItemColor="#003d5a"
                        rippleCentered={true}
                        itemTextStyle={"helvetica"}
                        onChangeText = {value => this.onChangeHandler(value)}
                    >
                    </Dropdown>
                </TouchableOpacity>
                {this.state.totalPages > 1 ? 
                    <View style={styles.footerContainer}>
                        <View style={{flex: 0.5, alignItems: "center"}}>
                            <TouchableOpacity style = { [styles.buttonContainer, { opacity: this.state.previousButtonOpacity}] }
                                disabled = {this.state.previousPage}
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
                            <TouchableOpacity style = { [styles.buttonContainer, { opacity: this.state.nextButtonOpacity, alignItems: 'flex-end'}] }
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
        marginLeft: 6,
        borderColor: "#003d5a",
        backgroundColor: '#DCDCDC',
        paddingLeft: 4,
        borderRadius:5,
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