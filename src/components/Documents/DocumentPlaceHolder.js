import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView, Image, AsyncStorage} from 'react-native'
 
import Icon1 from 'react-native-vector-icons/FontAwesome5'
import Icon2 from 'react-native-vector-icons/Ionicons'
import { Dropdown } from 'react-native-material-dropdown'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width
class DocumentPlaceHolder extends Component {
    constructor(props) {
        super(props)
        
    }
    static navigationOptions = {
        title: "Document Placeholder"
    }

    componentWillMount() {
        this.preview()
    }
    state = {
        data: null,
        auth: null,
        id: "d97e27c7-f382-4f20-aa05-a099c73e97b5", 
        count: 0,
        maxPages: 6,
        totalPage: 0,
        pdVisible: true
    }

    preview = async() => {
        console.log(":sad")
        let auth = await AsyncStorage.getItem('auth');
        this.setState({auth:auth})
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
            console.warn(responseJson["data"][0]["documentData"])
            this.setState({pdVisible: false})
            //this.props.navigation.navigate('Document_PlaceHolder',{'data': this.state.data})
        }
        })
        .catch((error) => {
            console.warn(error.message);
        });
    }

     render() { 
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
         return (
             <View style={styles.mainContainer}>

                <View style={styles.container1}>

                    <View style={styles.container1_sub1}>

                     
                    <TouchableOpacity style = { styles.buttonContainer} onPress={() => this.props.navigation.navigate('Document_PlaceHolder')}>
                        <Icon1 name="pen" style={styles.buttonIcon} >
                        <Text style = { styles.buttonText }>Draw / Set</Text>
                        </Icon1>
                    </TouchableOpacity>

                    <TouchableOpacity style = { styles.buttonContainer} onPress={() => this.props.navigation.navigate('Document_PlaceHolder')}>
                        <Icon2 name="md-move" style={styles.buttonIcon} >
                        <Text style = { styles.buttonText }>Move</Text>
                        </Icon2>
                    </TouchableOpacity>

                    <TouchableOpacity style = { styles.buttonContainer} onPress={() => this.props.navigation.navigate('Document_PlaceHolder')}>
                        <Icon2 name="md-remove-circle" style={styles.buttonIcon} >
                        <Text style = { styles.buttonText }>Clear</Text>
                        </Icon2>
                    </TouchableOpacity>


                    </View>

                    <View style={styles.container1_sub2}>
                        <Dropdown
                        label="Select signer"
                        data={data}
                        selectedItemColor="#003d5a"
                        rippleCentered={true}
                        itemTextStyle={"helvetica"}
                        containerStyle={{
                            marginLeft:"25%",
                            marginRight:"25%"
                        }}
                        //onChangeText = {value => this.onChangeHandler(value)}
                        />

                    </View>

                </View>

                <View style={styles.container2}>

            {this.state.pdVisible?
            <View><Text>NODATA</Text></View>:
                <ScrollView>
                    <View style={{margin:20, justifyContent:'center', alignItems: 'center'}}>
                        <Image style={styles.imageContainer} source={{uri: `data:image/png;base64,${this.state.data["pages"][this.state.count]}`}}/>
                        <Text>Page: {this.state.count+1}/{this.state.totalPage}</Text>
                    </View>
                    {
                        this.state.data.pages.map(() => {
                            this.state.count = this.state.count+1
                            const image = this.state.data["pages"][this.state.count]
                            if(this.state.count < this.state.maxPages){
                                return(
                                    <View style={{margin:20, justifyContent:'center', alignItems: 'center'}} key={this.state.count}>
                                        <Image style={styles.imageContainer} source={{uri: `data:image/png;base64,${image}`}}/>
                                        <Text>Page: {this.state.count+1}/{this.state.totalPage}</Text>
                                    </View>
                                );
                            }
                            else{
                                null
                            };
                        })
                    }
                </ScrollView>
            }

                </View>

                <View style={styles.container3}>

                <TouchableOpacity style = { styles.footerbuttonContainer} onPress={() => this.props.navigation.navigate('Document_Review')}>
                        <Text style = { styles.footerbuttonText }>Review & Create</Text>
                </TouchableOpacity>
            
                </View>
                
             </View>
                )
         }
     }

export default DocumentPlaceHolder


const styles = StyleSheet.create({
    mainContainer: {
        borderWidth:1,
        flex:1,
        backgroundColor: 'white',
        margin: 7, 
        borderWidth: 2,
        borderRadius:5,
        borderColor: "#003d5a",
        padding: 10
    },
    container1: {
        flex: 0.25,
        backgroundColor: 'grey',
        margin:5,
        borderWidth: 1,
        borderRadius:5,
        borderColor: "#003d5a",
    },
    
    container1_sub1: {
        flex: 0.5,
        flexDirection: 'row',
        //backgroundColor: 'yellow',
        margin:5,
        alignItems: 'center',
        justifyContent: 'center',
    },
     container1_sub2: {
        flex: 0.5,
        //backgroundColor: 'green',
        margin:5,
        justifyContent: 'center',
    },
    container2: {
        flex: 0.65,
        backgroundColor: 'grey',
        margin:5,
        borderWidth: 1,
        borderRadius:5,
        borderColor: "#003d5a",
    },
    buttonContainer: {
        backgroundColor: 'white',
        height: 50,
        width: 120,
        margin: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: 'grey',
        fontSize:14,
        alignItems: 'center',
    },
    buttonIcon: {
        fontSize: 20,
        color: 'black',
        margin:5,
    },
    container3: {
        flex: 0.1,
        //backgroundColor: 'yellow',
        margin:5,
    },
    footerbuttonContainer: {
        backgroundColor: '#003d5a',
        paddingVertical: 10,
        margin: 5,
        marginLeft: "66%",
        borderRadius: 5
    },
    footerbuttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
    imageContainer: {
        borderColor:'black',
        borderWidth:1,
        width:width/1.4,
        height:height/2,
    },
})