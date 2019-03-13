import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView, Dimensions, AsyncStorage, ActivityIndicator, TouchableOpacity} from 'react-native'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
 
class DocumentDetails extends Component {
    state = {
        auth: null,
        id: this.props.navigation.state.params.Id,
        details: null
    }

    documentDetails = async() => {
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/document-detail/'+this.state.id,{
        method: 'GET',
        headers: {
            'Authorization':this.state.auth,
        }}).then((response) => response.json())
        .then((responseJson) => {
            this.setState({details: responseJson["data"][0]})
            console.warn(this.state.details)
            console.warn(this.state.details["documentDetail"]["name"])
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
                <Text style={{fontWeight: "bold", fontSize: 25, color: "black"}}> Documents-Details
                    </Text>
                {this.state.details != null ? 
                    <ScrollView>
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                    Name
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                {this.state.details["documentDetail"]["name"]}
                                </Text>
                            </View>
                        </View>
                        {/* <Text style={{fontWeight: "bold", fontSize: 22, color: "black"}}> General </Text>
                        <View style={styles.DocumentsList}>
                            <View style={styles.DocumentsList}>
                                <TouchableOpacity style={{marginTop: -height*0.03}}>
                                    <Dropdown
                                        label="Change the date format from here"
                                        data={data}
                                        selectedItemColor="#003d5a"
                                        rippleCentered={true}
                                        itemTextStyle={"helvetica"}
                                    >
                                    </Dropdown>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.DocumentsList}>
                                <Text
                                    style={[styles.DocumentsListFont, {fontSize: 17, color: "#003d5a", textDecorationLine: "underline"}]}
                                    onPress={() => Linking.openURL('https://account.cygnature.io/Terms-Condition')}
                                >
                                    Terms & Conditions
                                </Text>
                            </View>
                            <View style={styles.DocumentsList}>
                                <Text
                                    style={[styles.DocumentsListFont, {fontSize: 17, color: "#003d5a", textDecorationLine: "underline"}]}
                                    onPress={() => Linking.openURL('https://account.cygnature.io/Privacy-Policy')}
                                >
                                    Privacy Policy
                                </Text>
                            </View>
                            <View style={styles.DocumentsList}>
                                <Text
                                    style={[styles.DocumentsListFont, {fontSize: 17, color: "#003d5a", textDecorationLine: "underline"}]}
                                    onPress={() => Linking.openURL('https://www.cygnature.io')}
                                >
                                    About us
                                </Text>
                            </View>
                        </View> */}
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
        fontSize: 12
    },
})