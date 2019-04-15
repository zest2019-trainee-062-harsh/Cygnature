import React, { Component } from 'react'
import {StyleSheet, Text, View,AsyncStorage, ActivityIndicator,ScrollView } from 'react-native'

export default class DocumentList extends Component {
    static navigationOptions = {
        title: "Document Verify List"
    }
    constructor(props) {
        super(props)
        this.state.data = this.props.navigation.getParam('data')
    }

    componentWillMount = async() =>{
        this.state.auth = await AsyncStorage.getItem('auth')
    }
    state ={
        data : [],
        loading: true,
        pdVisible: false,
        documentList:[],
    }
    // getRecentDocuments = async() => {
    //     let auth = await AsyncStorage.getItem("auth")
    //     this.setState({auth: auth})
    //     return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/documents',{
    //     method: 'POST',
    //     headers: {
    //         'Authorization':this.state.auth,
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         "documentStatusId": null,
    //         "currentPage": 0,
    //         "isNext": true,
    //         "searchText": "",
    //         "startDate": "",
    //         "endDate": moment().utcOffset("+5:30").format("MM/DD/YYYY"),
    //         "signatureType": 0,
    //         "uploadedBy": "",
    //         "signerName": "",
    //         "dateDuration": ""
    //     }),
    //     }).then((response) => response.json())
    //     .then((responseJson) => {
    //         this.setState({
    //             documents: responseJson["data"][0]["documents"],
    //             loading: false
    //         })
    //         //this.refs.UploadModal.show()
    //         // console.warn(this.state.documents)
    //     })
    //     .catch((error) => {
    //         console.warn(error);
    //     });
    //   }
  render() {
      var navigate =  this.props.navigation;
    return (
        <View style={styles.box2}>
        {this.state.loading ? 
        <View style={{flex: 1,padding:"10%",justifyContent: 'center', alignContent:'center'}}> 
            <ActivityIndicator color="#003d5a" size="large" /> 
        </View> 
        : null}
        <ScrollView>
        {
            this.state.documentList.map((docs)=>{
                return(
                    <TouchableOpacity
                        style={styles.DocumentsList}
                        key={docs.Id}
                        onPress={()=>this.props.navigation.navigate("DocumentDetails", {Id: docs.Id, token: this.state.token})}
                    >
                        <View style={{margin: 2}}>
                            <Text style={[styles.DocumentsListFont, {fontWeight: 'bold'}]}>
                                {docs.name}{docs.extension}
                            </Text>
                            <View style={{flexDirection: "row"}}>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-start"}] }>
                                    {docs.uploadedBy}
                                </Text>
                                <Text style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }>
                                    {docs.creationTime}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            })
        }
        </ScrollView>
        </View>
    )
  }
}
const styles = StyleSheet.create({
    box2 :{
        marginTop: 25,
        margin: 10,
        flex:0.50,
        borderRadius:5,
        borderColor: "#003d5a",
        borderWidth: 2,
        borderWidth: 2,
    },
    DocumentsList:{
        flex: 1,
        borderWidth: 0.5,
        borderColor: "#003d5a",
        borderRadius: 5,
        margin: 5,
        backgroundColor: '#DCDCDC'
    },
    DocumentsListFont:{
        flex: 0.5,
        color: "black"
    },
})
