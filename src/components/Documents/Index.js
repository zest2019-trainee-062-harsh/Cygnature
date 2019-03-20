import React, {Component} from 'react'
<<<<<<< HEAD
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions,
     AsyncStorage, } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown'
import { ProgressDialog } from 'react-native-simple-dialogs';
=======
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, ActivityIndicator} from 'react-native'
import { Dropdown } from 'react-native-material-dropdown'
>>>>>>> 0bf098e3e702bdf53e34658a3135294bd4c75bda

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
 
class Documents extends Component {
<<<<<<< HEAD
 

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
=======
    state = {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.N9w0jV/v+9PKjqTQVRpre5/Ha2KWFihjEaW03y0EGTvRIgfchfLIHPulTAOxGN2Na6c9WioV+CsEiqjebqZecbEwqHRSEoUU8TAXe2BgP0e0hOU2ytun+HGCVesWIT7fk2UnGUw1TSaca8E8myNmELqHJeIxTGg/MJ3mOIK9odO+lledsDEs6siP13RxEubPt8qBl0JCPR91fkwhw/GeIkrDe4NtNiSCRBgL8rzKHPhYU79kuB2ezwhfa2N8R7FtHsUngvCYSXhwBDI46JnfrOCOvGeWwEc88WWXnmdaBQH+YSbaCAfeNSSDovbZ2GExNlLZ1jru0kQYBMF/GqvhvobpR3M2nzDQfMvbxjdJFNnB4k01FfsFbbextkn5jC677qidQExX0AmA4VMmWKoh1pZP5W81KYrKUaHjawwboUQyHqLsORub5aMq4FtJZ69KwGine8wR/XqdWRS9l8OBigDNROIRjz5E5W7sR6lpwq5SmX/EGmbJs16SFWs9hSfL9z+AtFWLrBLCna311jeLVzqdHvjK8j9qf+BLADWCEOyGf+sDfXQ6DooEWsQaN2GmW67kqgAMAl6yTgTuiBaPneWO3B0fVkiqo2p4affLRLuA+zLp/aAJDy+WH/O2YxH7gzuDUQK7RSkhhuT2kbCG4uDRx6xk401z7JmxSCebuY/h+UsnI7eDvK1+BaBQrAhqx9/eZ+h3QI7wbV/z0HXFNKLAXjpb5r+l56gCR21yz1glRYWPQNe9IdUbp6CNvukc9jDL9d/2U2GJ5XaN1+9qoCcrNnCLsrUgjDKVZWptE4QDRP/KV6EeI2rIbUPQ8+4UpFtz3Ejtx1pB7zgjrvcljFRa3uvTlo7oG/5cb8L5yClFN/4A0HLwUxJb/Hf9Uo1UNd8moz4OAj6wlJj1m0Pw8A==.TCVZUS8GENc_fQYfkT7YlhR0DJIkn-qj-JaCkw6Nk8I",
        documents: [],
        value: null
    }

    componentWillMount(){
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/documents',{
        method: 'POST',
        headers: {
            'Authorization':'Bearer '+this.state.token,
>>>>>>> 0bf098e3e702bdf53e34658a3135294bd4c75bda
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
<<<<<<< HEAD
            this.setState({value: 1, pdVisible: false})
=======
            this.setState({value: 1})
>>>>>>> 0bf098e3e702bdf53e34658a3135294bd4c75bda
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
<<<<<<< HEAD
             <ProgressDialog
                visible={this.state.pdVisible}
                title="Fetching Documents!"
                message="Please wait..."
                activityIndicatorColor="#003d5a"
                activityIndicatorSize="large"
                animationType="slide"
            />
=======
>>>>>>> 0bf098e3e702bdf53e34658a3135294bd4c75bda
                <Text style={{fontWeight: "bold", fontSize: 25, color: "black"}}> Documents-List </Text>
                <ScrollView>
                    {
                        this.state.documents.map((docs)=>{
                        return(
                            <TouchableOpacity key={docs.Id}
                                onPress={()=>this.props.navigation.navigate("DocumentDetails", {Id: docs.Id, token: this.state.token})}
                            >
<<<<<<< HEAD
                                <View style={styles.DocumentsList}>
=======
                                {
                                    this.state.value == null ? <ActivityIndicator color="blue" size="large" /> :
                                    <View style={styles.DocumentsList}
                                    >
>>>>>>> 0bf098e3e702bdf53e34658a3135294bd4c75bda
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
<<<<<<< HEAD
                                
=======
                                }
>>>>>>> 0bf098e3e702bdf53e34658a3135294bd4c75bda
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
<<<<<<< HEAD
        borderWidth:1,
        borderColor:'black',
        flex:1,
        backgroundColor: 'white',
        margin: 7, borderWidth: 2,
        borderRadius:5,
        borderColor: "#003d5a",
        padding: 10
=======
        height: height*0.85,
        margin: 7,
        borderWidth: 2,
        borderRadius:5,
        borderColor: "#003d5a",
        padding: 10,
        backgroundColor: "white"
>>>>>>> 0bf098e3e702bdf53e34658a3135294bd4c75bda
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