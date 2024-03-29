import React, {Component} from 'react'
import 
    {View, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView, ImageBackground, AsyncStorage,
    Animated, PanResponder, Image}
from 'react-native'
import ImageZoom from 'react-native-image-pan-zoom';
import { ProgressDialog } from 'react-native-simple-dialogs';

import Swiper from 'react-native-swiper';
import Icon1 from 'react-native-vector-icons/FontAwesome5'
import Icon2 from 'react-native-vector-icons/Ionicons'
import { Dropdown } from 'react-native-material-dropdown'
import DeviceInfo from 'react-native-device-info'
import RNLocation from 'react-native-location';
import { NetworkInfo } from 'react-native-network-info';
import { StackActions, NavigationActions } from 'react-navigation'
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width
var ratio = "0.612903225806452";

class DocumentPlaceHolder extends Component {
  constructor(props) {
    super(props)
    this.state.data = this.props.navigation.getParam('data')
    this.state.pages = this.state.data["pages"]
    this.state.signers = this.props.navigation.getParam('signers')
    this.state.signerIds = this.props.navigation.getParam('signerIds')
    this.state.observerIds = this.props.navigation.getParam('observerIds')
    this.state.id = this.state.data["Id"]
    this.state.description = this.props.navigation.getParam('documentDescription')
    this.state.name = this.props.navigation.getParam('name')
    this.state.fileName = this.props.navigation.getParam('fileName')
    this.state.extension = this.props.navigation.getParam('extension')
    this.state.expiryStartDate = this.props.navigation.getParam('expiryStartDate')
    this.state.expiryEndDate = this.props.navigation.getParam('expiryEndDate')
    this.state.signingDueDate = this.props.navigation.getParam('signingDueDate')
    this.state.reminderBefore = this.props.navigation.getParam('reminderBefore')
    this.state.currentSigner = this.state.signers[0]["value"]
    this.state.totalPage = this.state.data["pageCount"]
    this.state.imageHeight = 1078.0487
    this.state.imageWidth = 760
    if(this.state.observerIds == null || this.state.observerIds.length < 1) {
      this.state.observerIdsNull = true
    }

  }

  componentWillMount= async() => {
    this.deviceInfo()
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
        //console.warn(this._value)
      },
    })
    let auth = await AsyncStorage.getItem("auth")
    this.state.auth = auth
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
    pdVisible: false,
    pdTitle: null,
    signerIds: [],
    observerIds: [],
    observerIdsNull: false,
    data : [],
    currentSigner: [],
    key : 1,
    placeholderBox : [],
    animatedStyle: [],
    height: [],
    width: [],
    annotations:[],
    name: [],
    extension: [],
    fileName: [],
    rLat: [],
    rLon: [],
    ip: [],
    userAgent: [],
    pages: [],
    reminderBefore: null,
    index: 0, 
    expiryStartDate: null,
    expiryEndDate: null,
    signingDueDate: null
  }

  deviceInfo() {
    RNLocation.configure({
      distanceFilter: 100, // Meters
      desiredAccuracy: {
        ios: "best",
        android: "balancedPowerAccuracy"
      },
      // Android only
      androidProvider: "auto",
      maxWaitTime: 5000, // Milliseconds
      // iOS Only
      activityType: "other",
      allowsBackgroundLocationUpdates: false,
      headingFilter: 1, // Degrees
      headingOrientation: "portrait",
      pausesLocationUpdatesAutomatically: false,
      showsBackgroundLocationIndicator: false,
  })

  RNLocation.requestPermission({
    ios: "whenInUse",
    android: {
      detail: "coarse"
    }
  }).then(granted => {
      if (granted) {
        this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
                this.setState({rLon: locations[0]["longitude"], rLat: locations[0]["latitude"] })
        })
      }
      else this.setState({rLon: "-56.062161", rLat: "4.092356" })
    })

    NetworkInfo.getIPV4Address(ipv4 => {
      this.setState({
        ip: ipv4,
        userAgent: DeviceInfo.getUserAgent()
      })
    });
  }

  changeId(value){
    //console.warn(value)
    this.state.currentSigner = value
  }

  addAnnotation(){
    let element= (
      <Animated.View key={this.state.key}
        style={styles.imageContainer}
        {...this.PanResponder.panHandlers}
        style={this.state.animatedStyle}
      >
        <Text>Drag Me</Text>
      </Animated.View>
    )
    let annotation = this.state.annotations;
    console.warn(this.state.annotations)
    if(placeholder.push(element)){
      this.state.key= this.state.key+1
    }
    else{
      alert("Nahi hua bro!")
    }
  }

  checkRenderedPages(pageCount){
    if(this.state.renderCount == 0){
      //console.warn("Calling the API first time.")
      var pageTo = 0;
      var difference = 0;
      if(pageCount + 5 > this.state.totalPage){
          difference = this.state.totalPage - pageCount;
          pageTo = pageCount + difference;
      }
      else{
          pageTo = pageCount + 5;
      }
      this.getNextPages(pageCount, pageTo);
    }
    else{
      if(this.state.renderCount >= (pageCount-1) / 6){
        //console.warn("Won't load the rendered pages again...");
      }
      else{
        var pageTo = 0;
        var difference = 0;
        if(pageCount + 5 > this.state.totalPage){
            difference = this.state.totalPage - pageCount;
            pageTo = pageCount + difference;
        }
        else{
            pageTo = pageCount + 5;
        }
        this.getNextPages(pageCount, pageTo);
      }
    }
  }

  getNextPages(pageCount, pageTo){
    if(pageCount-1 !== this.state.totalPage){
      this.setState({pdVisible: true, pdTitle: "Rendering next pages"})
      return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/next-pages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': this.state.auth
        },
        body: JSON.stringify({
            "Id": this.state.id,
            "pageFrom": pageCount,
            "pageTo": pageTo
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        var pagesNew = responseJson["data"][0]["pages"];
        pagesNew.map((item, index) => {
            this.state.pages.push(pagesNew[index])
        })
        this.setState({index: pageCount-2, renderCount: ((pageCount - 1)/6)})
        this.setState({pdVisible: false})
      })
      .catch((error) => {
          console.warn(error.message)
      });
    }
  }

  create = async() => {
      const realWidth = width/1.4
      const realHeight = height/2
      const xPercentage = ((this._value.x * 100)/realWidth)
      const yPercentage = ((this._value.y * 100)/realHeight)
      const realxPercentage = (xPercentage * this.state.imageWidth)/100
      const realyPercentage = (yPercentage * this.state.imageHeight)/100
      const wPercentage = (100/(width/1.4))*100
      const hPercentage = (100/realHeight)*100
      let auth = await AsyncStorage.getItem("auth")

      
      this.setState({pdVisible: true, pdTitle: "Creating Document !"})
      return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/create',{
      method: 'POST',
      headers: {
          'Authorization':auth,
          'Content-Type': "application/json"
      },
      body: JSON.stringify({
        "processDocumentId": this.state.data["Id"],
        "name": this.state.name,
        "fileName": this.state.fileName,
        "extension": this.state.extension,
        "description": this.state.description,
        "expiryStartDate": this.state.expiryStartDate,
        "expiryEndDate": this.state.expiryEndDate,
        "signingDueDate": this.state.signingDueDate,
        "reminderBefore": this.state.reminderBefore,
        "documentShapeModel": [
          { 
            "x": realxPercentage,
            "xPercentage": xPercentage,
            "y": realyPercentage,
            "yPercentage": yPercentage,
            "w": 50,
            "wPercentage": wPercentage,
            "h": 30,
            "hPercentage": hPercentage,
            "p": 1,
            "ratio": "0.612903225806452",
            "userId": this.state.signerIds[0][0],
            "isAnnotation": true,
            "SignatureType": "ESignature"
          }
          
        ],
        "signingFlowType": 1,
        "signerIds": this.state.signerIds[0],
        "observerIds": this.state.observerIdsNull? [] : this.state.observerIds[0] ,
        "signatures": [
            3
        ],
        "documentLatitude": this.state.rLat,
        "documentLongitude": this.state.rLon,
        "userAgent": this.state.userAgent,
        "userIPAddress": this.state.ip,
        "authenticationTypes": [
            1
        ]
      })
      }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({pdVisible: false})

        if(responseJson["message"]) {
          alert(responseJson["message"])
          const popAction = StackActions.pop({
            n: 2,
          });
          this.props.navigation.dispatch(popAction)    
        }
        else {
          console.warn(responseJson)
          alert(responseJson["error"])
        }
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
      backgroundColor: "rgba(255,255,255,0.7)",
      height: 20,
      width: 100,
      color: "black"
    }
    this.state.animatedStyle = animatedStyle
    return (
      <View style={styles.mainContainer}>
       <ProgressDialog
          visible={this.state.pdVisible}
          title={this.state.pdTitle}
          message="Please wait..."
          activityIndicatorColor="#003d5a"
          activityIndicatorSize="small"
          animationType="fade"
        />
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
                value={this.state.signers[0]["label"]}
                label="Select Signer"
                data={this.state.signers}
                selectedItemColor="#003d5a"
                rippleCentered={true}
                itemTextStyle={"helvetica"}
                containerStyle={{
                  marginLeft:"25%",
                  marginRight:"25%",
                }}  
                textColor='white'
                baseColor='white'
                onChangeText={(value) => {
                  this.changeId(value)
                }}
              />
          </View>
        </View>
        <View style={styles.container2}>
        <Swiper
            showsButtons={true}
            showsPagination={false}
            activeDotColor={'#003d5a'}
            dotColor={'grey'}
            onIndexChanged = {(index) =>{
                if((index + 1)%6 == 0){
                    this.checkRenderedPages(index+2);
                }
            }}
            index={this.state.index}
            bounces={true}
            loop={false}
          >
            {
              this.state.data.pages.map((item, index) => {
                if(index < this.state.totalPage){
                  return(
                    <View
                      key={index}
                      style={{margin:20, justifyContent:'center', alignItems: 'center'}}
                      title={<Text style={{color:'black'}}>{index + 1}/{this.state.totalPage}</Text>}
                    >
                      <ImageZoom
                        cropWidth={width/1.4}
                        cropHeight={height/2}
                        imageWidth={width/1.4}
                        imageHeight={height/2}
                      >
                        <ImageBackground style={styles.imageContainer}
                          source={{uri: `data:image/png;base64,${this.state.pages[index]}`}}
                        >
                          {/* {this.state.annotations.map(() =>{
                            return(
                              <View>
                                {this.state.annotations}
                              </View>
                            )
                          })
                        } */}
                            <Animated.View
                                {...this.PanResponder.panHandlers}
                                style={this.state.animatedStyle}
                            >
                               <View style={{ flexDirection:'row', flex:1}}>            
                                <Image
                                  style={{marginLeft:5, width:20, height:18}}
                                  source={require('../../../img/logo-crop.png')}
                                />
                                <Text style={{marginLeft:5, color:'black', fontWeight: 'bold'}}>Drag ME</Text>
                              </View>
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
          <TouchableOpacity style = { styles.footerbuttonContainer} onPress={() => this.create()}>
            <Text style = { styles.footerbuttonText }>Create</Text>
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