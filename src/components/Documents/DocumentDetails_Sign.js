import React, {Component} from 'react'
import 
    {View, StyleSheet, Text, TouchableOpacity, Dimensions, Alert, ImageBackground, AsyncStorage}
from 'react-native'
import ImageZoom from 'react-native-image-pan-zoom';
import { ProgressDialog } from 'react-native-simple-dialogs';
import Swiper from 'react-native-swiper';
import DeviceInfo from 'react-native-device-info'
import RNLocation from 'react-native-location';
import { NetworkInfo } from 'react-native-network-info';
import SignaturePad from 'react-native-signature-pad';
import { StackActions, NavigationActions } from 'react-navigation'
import { CheckBox } from 'react-native-elements'
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width
var ratio = "0.612903225806452";

class DocumentDetails_Sign extends Component {
    constructor(props) {
        super(props)
        this.state.fulldata  = this.props.navigation.getParam('data')
        this.state.data  = this.state.fulldata["documentData"]
        this.state.pages = this.state.data["pages"]
        this.state.totalPage = this.state.data["pageCount"]
        this.state.imageHeight = 1078.0487
        this.state.imageWidth = 760
    }

    componentWillMount = async() => {
        let auth = await AsyncStorage.getItem('auth');
        let userId = await AsyncStorage.getItem('userId');
        this.state.auth = auth;
        this.state.userId = userId;
        this.deviceInfo();
        this.getData();
    }

    static navigationOptions = {
        title: "Document Signing"
    }

    state = {
        auth: null,
        Id: this.props.navigation.state.params.Id,
        count: 0,
        totalPage: 0,
        pdVisible: false,
        pdTitle: "Getting things ready !",
        fulldata : [],
        data : [],
        renderCount: 0,
        pages: [],
        index: 0,
        ip: [],
        userAgent: [],
        rLon: [],
        rLat: [],
        signData: null,
        signDataRemember: false,
        canvasVisible: false,
        padText: null,
    }
    getData() {
        this.setState({pdVisible:true, pdTitle: "Getting things ready !"})
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/user/profile', {
        method: 'GET',
        headers: {
            'Authorization': this.state.auth,
        },
        }).then((response) => response.json())
        .then((responseJson) => {
            this.setState({pdVisible:false})

            if(responseJson['data'][0]['impressions'][0] == null) {
                this.setState({canvasVisible: true})
            } else {
               
                Alert.alert(
                    'Do you want to do new signature ?',
                    'Clicking yes will you need to provide sign',
                    [
                        
                        {
                            text: 'No', onPress: ()=>{
                                this.setState({padText: "This signature will be used", signData: responseJson["data"][0]["impressions"][0]["imageBytes"] })
                            }
                        },
                        {
                            text: 'Yes', onPress: ()=>{
                                this.setState({padText: "Please draw signature below", canvasVisible: true})
                            }
                        },
                    ],
                    {cancelable: false},
                );
            }
        })
        .catch((error) => {
            console.warn(error);
        });

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
        })
    
        RNLocation.requestPermission({
          android: {
            detail: "coarse"
          }
        })
        .then(granted => {
          if (granted) {
            this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
              this.setState({rLon: locations[0]["longitude"], rLat: locations[0]["latitude"]})
            })
          }
        })
    
        NetworkInfo.getIPV4Address(ipv4 => {
          this.setState({
            ip: ipv4,
            userAgent: DeviceInfo.getUserAgent()
          })
        });
      }

    checkRenderedPages(pageCount){
        if(this.state.renderCount == 0){
            console.warn("Calling the API first time.")
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
                console.warn("Won't load the rendered pages again...");
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
            this.setState({pdVisible: true, pdTitle: "Rendering next Pages !"})
            return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/next-pages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.state.auth
                },
                body: JSON.stringify({
                    "Id": this.state.Id,
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
                this.setState(this.state)
                this.setState({pdVisible: false})
            })
            .catch((error) => {
                console.warn(error)
            });
        }
    }

    sign = async() =>{
        this.setState({pdVisible: true, pdTitle: "Finishing Up !"})
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/sign',{
            method: 'POST',
            headers: {
                'Authorization': this.state.auth,
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "documentId": this.state.Id,
                "aspectRatio": 1,
                "isSigner": true,
                "signatureType": "ESignature",
                "documentLatitude":this.state.rLat,
                "documentLongitude": this.state.rLon,
                "userAgent": this.state.userAgent,
                "userIPAddress": this.state.ip,
                "userTimeZoneOffSet": "+05:30",
                "rememberSign": this.state.signDataRemember,
                "signData": this.state.signData
            })
            }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({pdVisible: false})
                if(responseJson["data"] == null) {
                    alert(responseJson["error"])
                } else {
                    alert(responseJson["message"])
                    const popAction = StackActions.pop({
                        n: 1,
                      });
                      this.props.navigation.dispatch(popAction)
                }
            })
            .catch((error) => {
                console.warn(error.message);
            });
    }

    onChangeCheck() {
        this.setState({ signDataRemember: !this.state.signDataRemember})
    }

    render() {  
        var pencolor= 'black'
        const animatedStyle = {
            borderColor: "black",
            borderWidth: 1,
            backgroundColor: "yellow",
            opacity: 0.5,
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
            <Text style={{color:'white', textAlign: 'center', fontSize: 14,}}>{this.state.padText} </Text>
                {this.state.canvasVisible 
                 ?
                    <View style={styles.pad}>
                        <SignaturePad 
                            penColor={pencolor}
                            onError={this._signaturePadError}
                            onChange={this._signaturePadChange} />
                    </View>
                : 
                <ImageBackground style={styles.signContainer} source={{uri: `data:image/png;base64,${this.state.signData}`}}/>
                }   
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
                    this.state.pages.map((item, index) => {
                        var currentPage = index + 1;
                        if(index < this.state.totalPage){
                        return(
                            <View
                                key={index}
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
                                    source={{uri: `data:image/png;base64,${this.state.pages[index]}`}}
                                >
                                    {
                                        this.state.fulldata == [] ?
                                        null:
                                        this.state.fulldata["annotationShapes"].map((data, index) =>{
                                            if(this.state.fulldata["annotationShapes"][index]["p"] == currentPage){
                                                var xCoordinate = (this.state.fulldata["annotationShapes"][index]["xPercentage"] * (width/1.4))/100;
                                                var yCoordinate = (this.state.fulldata["annotationShapes"][index]["yPercentage"] * (height/2))/100;
                                                return(
                                                    <View
                                                        key={index}
                                                        style={[animatedStyle, {
                                                                height: this.state.fulldata["annotationShapes"][index]["h"],
                                                                width: this.state.fulldata["annotationShapes"][index]["w"],
                                                                position: "absolute",
                                                                left: xCoordinate,
                                                                top: yCoordinate
                                                            }
                                                        ]}
                                                    ></View>
                                                )
                                            }
                                            else{
                                                null
                                            }
                                        })
                                    }
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
            {this.state.canvasVisible 
             ?
            <View style={{flex: 0.7}}>
                <CheckBox
                    title='Remember Signature'
                    textStyle={{color: 'black', fontWeight: 'normal', fontSize:17}}
                    uncheckedColor="black"
                    checkedColor="#003d5a"
                    size={20}
                    checked={this.state.signDataRemember}
                    containerStyle={{ backgroundColor:'white', borderColor: 'white' }}
                    onPress={() => this.onChangeCheck()}
                />  
            </View>
             :
            null
            }
            <TouchableOpacity style = { styles.footerbuttonContainer } onPress={() => this.sign()}>
                <Text style = { styles.footerbuttonText }>Sign All</Text>
            </TouchableOpacity>
            </View>
        </View>
        )
    }

    _signaturePadError = (error) => {
       alert(error);
      }
     
      _signaturePadChange = ({base64DataUrl}) => {
        var string = base64DataUrl
        string = string.replace(/^data:image/, "");
        string = string.replace('/', "");
        string = string.replace(/^png;base64,/, "");

        this.setState({signData: string})
        //console.warn(string);
      }
    
     _getSig = () => {
        this.enrollSign()
      }
      _clear = () => {
        this.setState({ canvas: false, signature: null }); 
        setTimeout( () => { this.setState({ canvas: true }); }, 500);
      }

}

export default DocumentDetails_Sign

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
        margin:5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container1_sub2: {
        flex: 0.5,
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
        margin:5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    footerbuttonContainer: {
        backgroundColor: '#003d5a',
        paddingVertical: 10,
        margin: 5,
        flex: 0.3,
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
    annotText: {
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontSize:15,
        alignItems: 'center',
    },
    pad: {
      flex: 1, 
      margin:5,
      borderWidth: 1,
      borderRadius:5,
      borderColor: "grey",
    },
    signContainer: {
        borderWidth:1,
        borderRadius:5,
        flex: 1, 
        margin:5,
        borderColor: "grey",
    },
})