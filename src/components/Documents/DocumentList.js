import React, { Component } from 'react'
import {StyleSheet, Text, View,AsyncStorage,ScrollView,
    TouchableOpacity, } from 'react-native'
import { ProgressDialog } from 'react-native-simple-dialogs';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class DocumentList extends Component {
    static navigationOptions = {
        title: "Document Verify List"
    }
    constructor(props) {
        super(props)
        this.state.data = this.props.navigation.getParam('data')
        console.warn(this.state.data)
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
    verifydetail = (id) => {
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/verify/document-detail/'+id,{
        method: 'GET',
        headers: {
            'Authorization': this.state.auth
        }}).then((response) => response.json())
        .then((responseJson) => {
             this.props.navigation.navigate('VerifyDetails',{'data':responseJson["data"][0]})
        })
        .catch((error) => {
            console.warn(error);
        });
    }
   
  render() {
      var navigate =  this.props.navigation;
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
        
           {this.state.totalRows != 0 ?
            <ScrollView>
                {
                    this.state.data.map((docs)=>{
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
                                onPress={()=>this.verifydetail(docs.Id)}
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
                                                Time of Creation:
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
          
        
        </View>
    )
}
}
        
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
