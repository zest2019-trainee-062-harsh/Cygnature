import React, {Component} from 'react'
import {View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, AsyncStorage, Switch, TextInput, Image, ImageBackground} from 'react-native'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
import Modal from 'react-native-modalbox'
class Profile extends Component {
    constructor(props) {
        super(props)

        this.state.userData  = this.props.navigation.getParam('userData')
    }
    state = {
        signature: null,
        visible: false,
        userData: []
    }
    componentWillMount() {
        //console.warn(this.state.userData)
        this.setState({signature: this.state.userData['impressions'][0]['imageBytes']}) 
        this.setState({visible:true})
    }
 
    static navigationOptions = {
        title: "Edit Profile"
    }

    showModal = () => {
        this.refs.myModal.open()
    }

    render() {
        return(
            <View style={styles.mainContainer}>
            
            <Modal
            ref={"myModal"}
            style={ styles.modal }
            position= 'center'
            backdrop={true}
            onClosed={() =>{
                //console.warn("modal closed")
            }}
            >
            
            <Text style={{marginLeft:14,  fontSize: 18,  color: 'black', fontWeight:'bold'}}>Set Signature</Text>

           
            <TouchableOpacity style={styles.modalTI} onPress={() => this.props.navigation.navigate('Canvas')}>
                <Text style={styles.modalText}>Draw</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalTI} onPress={() => this.props.navigation.navigate('Image')}>
                <Text style={styles.modalText}>Capture</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalTI} onPress={() => this.sendtoCanvas()}>
                <Text style={styles.modalText}>Type</Text>
            </TouchableOpacity> 
            
           
            </Modal>

                <ScrollView>
                    <Text style={{fontWeight: "bold", fontSize: 20, color: "black"}}> Signature</Text>
                    <View style={styles.DocumentsList}>
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                            {this.state.visible?
                                <ImageBackground style={styles.signContainer} source={{uri: `data:image/png;base64,${this.state.signature}`}}>
                                    <TouchableOpacity style={styles.floatButton} onPress={this.showModal}>
                                        <Text style={styles.floatButtonText}>+</Text>
                                    </TouchableOpacity>
                                </ImageBackground>
                            :null}
                            </View>
                          
                        </View>
                    </View>


                    <Text style={{fontWeight: "bold", fontSize: 25, color: "black"}}> Profile </Text>
                    <View style={styles.DocumentsList}>
                        <View style={styles.DocumentsList}>
                            <View>
                                <Text style={[styles.DocumentsListFont, {fontSize: 17}]}>
                                    Email
                                </Text>
                                <TextInput
                                    style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }
                                    placeholder="Change email"
                                    placeholderTextColor='grey'
                                    returnKeyType="next"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColorAndroid = "#003d5a"
                                >
                                </TextInput>
                            </View>
                        </View>
                        <View style={styles.DocumentsList}>
                            <View>
                                <Text style={[styles.DocumentsListFont, {fontSize: 17}]}>
                                    Mobile Number
                                </Text>
                                <TextInput
                                    style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }
                                    placeholder="Change phone number"
                                    placeholderTextColor='grey'
                                    returnKeyType="next"
                                    keyboardType="numeric"
                                    maxLength={10}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColorAndroid = "#003d5a"
                                >
                                </TextInput>
                            </View>
                        </View>
                        <View style={styles.DocumentsList}>
                            <View>
                                <Text style={[styles.DocumentsListFont, {fontSize: 17}]}>
                                    City
                                </Text>
                                <TextInput
                                    style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }
                                    placeholder="Change city"
                                    placeholderTextColor='grey'
                                    returnKeyType="next"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColorAndroid = "#003d5a"
                                >
                                </TextInput>
                            </View>
                        </View>
                        <View style={styles.DocumentsList}>
                            <View>
                                <Text style={[styles.DocumentsListFont, {fontSize: 17}]}>
                                    Country
                                </Text>
                                <TextInput
                                    style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }
                                    placeholder="Change email"
                                    placeholderTextColor='grey'
                                    returnKeyType="next"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColorAndroid = "#003d5a"
                                >
                                </TextInput>
                            </View>
                        </View>
                    </View>

                </ScrollView>
                
               
            </View>
        )
    }
}

export default Profile

const styles = StyleSheet.create({
    mainContainer:{
        borderWidth:1,
        flex:1,
        backgroundColor: 'white',
        margin: 7, 
        borderWidth: 2,
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
    buttonContainer: {
        backgroundColor: '#003d5a',
        paddingVertical: 10,
        margin: 5,
        borderRadius: 5
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
    signContainer: {
        width:width-90,
        height:150,
        borderWidth:1,
        borderRadius:5,
        margin:5,
        borderColor: "#003d5a",
    },
    boxadd:{
        backgroundColor: '#003d5a',
        paddingVertical: 10,
        margin: 5,
        borderRadius: 5,
    },
    box3Text2: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
    modal:{
        shadowRadius:20,
        width:width-80,
        height:height*.5,
        borderColor:'#003d5a',
        borderWidth: 1,
        borderRadius:5,
    },
    modalTI:{
        backgroundColor: 'white',
        paddingVertical: 20,
        margin: 10,
        marginTop:20,
        borderRadius: 5,
        borderWidth:1,
        borderColor:'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalText: {
        textAlign: 'center',
        color: 'black',
    },
      ImageContainer: {
        width: 400,
        height: 800,
        borderColor: '#9B9B9B',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CDDC39',    
      },
      
    floatButton: {
        position: 'absolute',
        width:30,
        height: 30,
        backgroundColor: 'grey',
        borderRadius: 30,
        bottom: 3,
        right: -1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    floatButtonText: {
        color: 'white',
        fontSize: 25    
    },
})