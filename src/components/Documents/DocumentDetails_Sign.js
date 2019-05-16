import React, {Component} from 'react'
import 
    {View, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView, ImageBackground, AsyncStorage}
from 'react-native'
import ImageZoom from 'react-native-image-pan-zoom';
import { ProgressDialog } from 'react-native-simple-dialogs';
import Swiper from 'react-native-swiper';
import DeviceInfo from 'react-native-device-info'
import RNLocation from 'react-native-location';
import { NetworkInfo } from 'react-native-network-info';

import { StackActions, NavigationActions } from 'react-navigation'
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
    }

    static navigationOptions = {
        title: "Document Signing"
    }

    state = {
        auth: null,
        Id: this.props.navigation.state.params.Id,
        count: 0,
        totalPage: 0,
        pdVisible: true,
        fulldata : [],
        data : [],
        pdVisible: false,
        renderCount: 0,
        pages: [],
        index: 0,
        ip: [],
        userAgent: [],
        rLon: [],
        rLat: []
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
            this.setState({pdVisible: true})
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
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/user/profile', {
        method: 'GET',
        headers: {
            'Authorization': this.state.auth,
        },
        }).then((response) => response.json())
        .then((responseJson) => {
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
                "documentLatitude": 4.092356,
                "documentLongitude": -56.062161,
                "userAgent": this.state.userAgent,
                "userIPAddress": this.state.ip,
                "userTimeZoneOffSet": "+05:30",
                "rememberSign": false,
                "signData": responseJson["data"][0]["impressions"][0]["imageBytes"]
            })
            }).then((response) => response.json())
            .then((responseJson) => {
                if(responseJson["data"] == null) {
                    alert(responseJson["error"])
                } else {
                    alert(responseJson["message"])
                    this.props.navigation.navigate("DocumentDetails",{Id: this.state.Id})
                }
            })
            .catch((error) => {
                console.warn(error.message);
            });
        })
        .catch((error) => {
            console.warn(error);
        });
    }

    render() {  
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
                title="Rendering next pages"
                message="Please wait..."
                activityIndicatorColor="#003d5a"
                activityIndicatorSize="small"
                animationType="fade"
            />
            <View style={styles.container1}>
                <Text
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignContent: "center"
                    }}
                >
                    {this.state.data["name"]}
                </Text>
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
            <TouchableOpacity style = { styles.footerbuttonContainer} onPress={() => this.sign()}>
                <Text style = { styles.footerbuttonText }>Sign All</Text>
            </TouchableOpacity>
            </View>
        </View>
        )
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
    annotText: {
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontSize:15,
        alignItems: 'center',
    },
})