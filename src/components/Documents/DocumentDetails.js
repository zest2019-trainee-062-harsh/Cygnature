import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
 
class DocumentDetails extends Component {
    state = {
        token: this.props.navigation.state.params.token,
        id: this.props.navigation.state.params.Id,
        details: []
    }

    componentWillMount(){
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/document-detail/'+this.state.id,{
        method: 'GET',
        headers: {
            'Authorization':'Bearer '+this.state.token,
        }}).then((response) => response.json())
        .then((responseJson) => {
            this.setState({details: responseJson["data"][0]})
            console.warn(this.state.details["documentDetail"]["name"])
        })
        .catch((error) => {
            console.warn(error);
        });
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Text style={{fontWeight: "bold", fontSize: 25, color: "black"}}> Documents-Details {this.state.id}}
                    </Text>
                {this.state.details == null ? 
                    <ScrollView>
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                    Name
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                    : <Text>Not Available</Text>
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