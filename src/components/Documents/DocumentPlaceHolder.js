import React, {Component} from 'react'
import 
    {View, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView, ImageBackground, AsyncStorage,
    Animated, PanResponder, Image}
from 'react-native'
import ImageZoom from 'react-native-image-pan-zoom';

import Swiper from 'react-native-swiper';
import Icon1 from 'react-native-vector-icons/FontAwesome5'
import Icon2 from 'react-native-vector-icons/Ionicons'
import { Dropdown } from 'react-native-material-dropdown'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width

class Test extends Component {
  constructor(props) {
    super(props)
    this.state.data = this.props.navigation.getParam('data')
    this.state.signers = this.props.navigation.getParam('signers')
    this.state.totalPage = this.state.data["pageCount"]
    this.state.imageHeight = 1078.0487
    this.state.imageWidth = 760
  }

  componentWillMount(){
    this.Animatedvalue = new Animated.ValueXY();
    this._value = {x: 0, y: 0}
    this.Animatedvalue.addListener((value)=> this._value = value)
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        this.Animatedvalue.setOffset({
          x: this._value.x,
          y: this._value.y
        })
        this.Animatedvalue.setValue({x: 0, y:0})
      },
      onPanResponderMove: Animated.event([
        null, {dx : this.Animatedvalue.x , dy : this.Animatedvalue.y}
      ]),
      onPanResponderRelease: (e, gestureState) =>{
        console.warn(this._value)
      },
    })
  }

  static navigationOptions = {
    title: "Document Placeholder"
  }

  state = {
    auth: null,
    id: null, 
    count: 0,
    maxPages: 6,
    totalPage: 0,
    pdVisible: true,
    signerIds: [],
    data : [],
    currentSigner: [],
    key : 1,
    placeholderBox : [],
    animatedStyle: [],
    height: [],
    width: [],
    annotations:[]
  }

  changeId(value){
    this.state.currentSigner = value
  }

  addAnnotation(){
    let element= (
      <Animated.View key={this.state.key}
        style={{
          transform: this.Animatedvalue.getTranslateTransform(),
          borderColor: "black",
          borderWidth: 1,
          backgroundColor: "white",
          opacity: 0.5,
          height: 20,
          width: 100,
          color: "black"
        }}
        {...this.PanResponder.panHandlers}
        // style={this.state.animatedStyle}
      >
        <Text>Drag Me</Text>
      </Animated.View>
    )
    if(this.state.annotations.push(element)){
      this.state.key= this.state.key+1
    }
    else{
      alert("Nahi hua bro!")
    }
  }

  review = async() => {
      const realWidth = width/1.4
      const realHeight = height/2
      const xPercentage = ((this._value.x * 100)/realWidth)
      const yPercentage = ((this._value.y * 100)/realHeight)
      const realxPercentage = (xPercentage * this.state.imageWidth)/100
      const realyPercentage = (yPercentage * this.state.imageHeight)/100
      const wPercentage = (100/(width/1.4))*100
      const hPercentage = (100/realHeight)*100
      let auth = await AsyncStorage.getItem("auth")
      return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/create',{
      method: 'POST',
      headers: {
          'Authorization':auth,
          'Content-Type': "application/json"
      },
      body: JSON.stringify({
        "processDocumentId": this.state.data["Id"],
        "name": "Sample Cygnature Document",
        "fileName": "Sample Document",
        "extension": ".pdf",
        "description": "This is test description",
        "expiryStartDate": "2018-11-19 11:42:59.803",
        "expiryEndDate": "2018-11-19 11:42:59.803",
        "signingDueDate": "2018-11-19 11:42:59.803",
        "reminderBefore": 3,
        "documentShapeModel": [
          { 
            "x": realxPercentage,
            "xPercentage": xPercentage,
            "y": realyPercentage,
            "yPercentage": yPercentage,
            "w": 100,
            "wPercentage": wPercentage,
            "h": 100,
            "hPercentage": hPercentage,
            "p": 1,
            "ratio": "0.612903225806452",
            "userId": "E1255565-0444-462F-8EC3-F47A74D4D45E",
            "isAnnotation": true,
            "SignatureType": "ESignature"
          }
        ],
        "signingFlowType": 1,
        "signerIds": [
          "E1255565-0444-462F-8EC3-F47A74D4D45E"
        ],
        "observerIds": [],
        "signatures": [
            3
        ],
        "documentLatitude": 4.092356,
        "documentLongitude": -56.062161,
        "userAgent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36",
        "userIPAddress": "61.12.66.6",
        "authenticationTypes": [
            1
        ]
      })
      }).then((response) => response.json())
      .then((responseJson) => {
          alert(responseJson["message"])
          this.props.navigation.navigate("DocumentDetails", {"Id": responseJson["data"][0]["documentId"]})
      })
      .catch((error) => {
          console.warn(error.message)
      });
  }

  render() {  
    const animatedStyle = {
      transform: this.Animatedvalue.getTranslateTransform(),
      borderColor: "black",
      borderWidth: 1,
      backgroundColor: "white",
      opacity: 0.5,
      height: 20,
      width: 100,
      color: "black"
    }
    this.state.animatedStyle = animatedStyle
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container1}>
          <View style={styles.container1_sub1}>
            <TouchableOpacity style = { styles.buttonContainer} onPress={() => this.addAnnotation()}>
              <Icon1 name="pen" style={styles.buttonIcon} >
                <Text style = { styles.buttonText }>Set</Text>
              </Icon1>
            </TouchableOpacity>
            <TouchableOpacity style = { styles.buttonContainer} onPress={() => this.removeAnnotation()}>
              <Icon2 name="md-remove-circle" style={styles.buttonIcon} >
                <Text style = { styles.buttonText }>Clear</Text>
              </Icon2>
            </TouchableOpacity>
          </View>
          <View style={styles.container1_sub2}>
              <Dropdown
                label="Select signer"
                data={this.state.signers}
                selectedItemColor="#003d5a"
                rippleCentered={true}
                itemTextStyle={"helvetica"}
                containerStyle={{
                  marginLeft:"25%",
                  marginRight:"25%"
                }}
                onChangeText={(value) => {
                  this.changeId(value)
                }}
              />
          </View>
        </View>
        <View style={styles.container2}>
          <Swiper
            showsButtons={true}
            activeDotColor={'#003d5a'}
            dotColor={'grey'}
          >
            {
              this.state.data.pages.map((item, index) => {
                if(index < this.state.totalPage){
                  return(
                    <View
                      style={{margin:20, justifyContent:'center', alignItems: 'center'}}
                      title={<Text>{index + 1}/{this.state.totalPage}</Text>}
                    >
                      <ImageZoom
                        cropWidth={width/1.4}
                        cropHeight={height/2}
                        imageWidth={width/1.4}
                        imageHeight={height/2}
                      >
                        <ImageBackground style={styles.imageContainer}
                          source={{uri: `data:image/png;base64,${this.state.data["pages"][index]}`}}
                        >
                       
                            <Animated.View
                                {...this.PanResponder.panHandlers}
                                style={this.state.animatedStyle}
                            >
                              <Text>Drag Me</Text>
                            </Animated.View>
                        </ImageBackground>
                      </ImageZoom>
                    </View>
                  )
                }
              })
            }
          </Swiper>
        </View>
        <View style={styles.container3}>
          <TouchableOpacity style = { styles.footerbuttonContainer} onPress={() => this.review()}>
            <Text style = { styles.footerbuttonText }>Review & Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default Test


const styles = StyleSheet.create({
  mainContainer: {
    borderWidth:1,
    borderColor:'black',
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
    // justifyContent: "center",
    // alignItems: "center"
  },
  buttonContainer: {
    backgroundColor: 'white',
    height: 50,
    width: 120,
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.45
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
    width: '100%',
    height:'100%'
  },
})