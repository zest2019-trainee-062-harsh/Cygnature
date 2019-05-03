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

    import { StackActions, NavigationActions } from 'react-navigation'
    var width = Dimensions.get('window').width; //full width
    var height = Dimensions.get('window').height; //full width
    var ratio = "0.612903225806452";

    class DocumentDetails_Sign extends Component {
    constructor(props) {
        super(props)
        this.state.fulldata  = this.props.navigation.getParam('data')
        this.state.id = this.props.navigation.getParam('Id')
        this.state.data  = this.state.fulldata["documentData"]
        this.state.totalPage = this.state.data["pageCount"]
        console.warn(this.state.fulldata["annotationShapes"])
        this.state.annotationShapesData[0]["userId"] = this.state.fulldata["annotationShapes"][0]["Id"]
        this.state.annotationShapesData[0]["userName"] = this.state.fulldata["annotationShapes"][0]["userName"]
        this.state.annotationShapesData[0]["x"] = this.state.fulldata["annotationShapes"][0]["x"]
        this.state.annotationShapesData[0]["y"] = this.state.fulldata["annotationShapes"][0]["y"]
        this.state.annotationShapesData[0]["w"] = this.state.fulldata["annotationShapes"][0]["w"]
        this.state.annotationShapesData[0]["h"] = this.state.fulldata["annotationShapes"][0]["h"]
        this.state.annotationShapesData[0]["xPercentage"] = this.state.fulldata["annotationShapes"][0]["xPercentage"]
        this.state.annotationShapesData[0]["yPercentage"] = this.state.fulldata["annotationShapes"][0]["yPercentage"]
        this.state.annotationShapesData[0]["wPercentage"] = this.state.fulldata["annotationShapes"][0]["wPercentage"]
        this.state.annotationShapesData[0]["hPercentage"] = this.state.fulldata["annotationShapes"][0]["hPercentage"]
        this.state.annotationShapesData[0]["SignatureType"] = this.state.fulldata["annotationShapes"][0]["SignatureType"]
        this.state.imageHeight = 1078.0487
        this.state.imageWidth = 760
    }

    componentDidMount = async() => {
        
        let auth = await AsyncStorage.getItem('auth');
        let userId = await AsyncStorage.getItem('userId');
        this.state.auth = auth;
        this.state.userId = userId;
    }

    componentWillMount(){
        this.Animatedvalue = new Animated.ValueXY();
        this._value = {x: this.state.annotationShapesData[0]["x"], y: this.state.annotationShapesData[0]["y"]}
       
        this.Animatedvalue.addListener((value)=> this._value = value)
        this.Animatedvalue.setValue({x: this._value.x, y: this._value.y})

        this.PanResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => false,
        onPanResponderGrant: (e, gestureState) => {
            this.Animatedvalue.setOffset({
            x: this._value.x,
            y: this._value.y
            })
            this.Animatedvalue.setValue({x: this._value.x, y: this._value.y})
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
        title: "Document Signing"
    }   

    state = {
        auth: null,
        id: null,
        count: 0,
        maxPages: 6,
        totalPage: 0,
        pdVisible: true,
        fulldata : [],
        data : [],
        key : 1,
        placeholderBox : [],
        animatedStyle: [],
        height: [],
        width: [],
        annotations:[],
        annotationShapesData: [
            { 
            x: null,
            xPercentage: null,
            y: null,
            y: null,
            w: null,
            wPercentage:null,
            h: null,
            hPercentage: null,
            p: null,
            userId: null,
            userName: null,
            SignatureType: null
            }
        ]
    }


    sign = async() =>{
        console.warn(this.state.id)
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
                "documentId": this.state.id,
                "aspectRatio": 1,
                "isSigner": true,
                "signatureType": "ESignature",
                "documentLatitude": 4.092356,
                "documentLongitude": -56.062161,
                "userAgent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36",
                "userIPAddress": "61.12.66.6",
                "userTimeZoneOffSet": "+05:30",
                "rememberSign": false,
                "signData": responseJson["data"][0]["impressions"][0]["imageBytes"]
            })
            }).then((response) => response.json())
            .then((responseJson) => {
                // console.warn(responseJson)
                if(responseJson["data"] == null) {
                    alert(responseJson["error"])
                } else {
                    alert(responseJson["message"])
                    this.documentDetails()
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
            transform: this.Animatedvalue.getTranslateTransform(),
            borderColor: "black",
            borderWidth: 1,
            backgroundColor: "yellow",
            opacity: 0.5,
            height: 50,
            width: 100,
            color: "black"
        }
        this.state.animatedStyle = animatedStyle
        return (
        <View style={styles.mainContainer}>
            <View style={styles.container1}>
            
            </View>
            <View style={styles.container2}>
            <Swiper
                showsButtons={true}
                activeDotColor={'#003d5a'}
                dotColor={'grey'}
            >
                <View
                style={{margin:20, justifyContent:'center', alignItems: 'center'}}
                title={<Text>{this.state.count+1}/{this.state.totalPage}</Text>}
                >
                <ImageZoom
                    cropWidth={width/1.4}
                    cropHeight={height/2}
                    imageWidth={width/1.4}
                    imageHeight={height/2}
                >
                    <ImageBackground style={styles.imageContainer}
                    source={{uri: `data:image/png;base64,${this.state.data["pages"][this.state.count]}`}}
                    >
                        <Animated.View
                            style={styles.imageContainer}
                            {...this.PanResponder.panHandlers}
                            style={animatedStyle}
                        >
                        <Text style={styles.annotText} onPress={()=> this.sign()}>Click me to Sign</Text>
                        </Animated.View>
                    </ImageBackground>
                </ImageZoom>
                </View>
                {
                this.state.data.pages.map((item) => {
                    this.state.count = this.state.count + 1
                    if(this.state.count < this.state.totalPage){
                    return(
                        <View
                        style={{margin:20, justifyContent:'center', alignItems: 'center'}}
                        title={<Text>{this.state.count}/{this.state.totalPage}</Text>}
                        >
                        <ImageZoom
                            cropWidth={width/1.4}
                            cropHeight={height/2}
                            imageWidth={width/1.4}
                            imageHeight={height/2}
                        >
                            <ImageBackground style={styles.imageContainer}
                            source={{uri: `data:image/png;base64,${this.state.data["pages"][this.state.count]}`}}
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
                    else{
                    null
                    };
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
    annotText: {
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontSize:15,
        alignItems: 'center',
    },
})