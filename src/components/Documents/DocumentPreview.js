import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, ImageBackground, AsyncStorage} from 'react-native'
import { ProgressDialog } from 'react-native-simple-dialogs';
import { Dimensions } from "react-native"
import ImageZoom from 'react-native-image-pan-zoom';
import Swiper from 'react-native-swiper';

import Icon from 'react-native-vector-icons/FontAwesome';
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;


class DocumentPreview extends Component {
    constructor(props) {
    super(props)
        this.state.data  = this.props.navigation.getParam('data')
        this.state.Id  = this.props.navigation.getParam('Id')
        this.state.totalPage = this.state.data["pageCount"]
        this.state.pages = this.state.data["pages"]
        var arr =  this.state.data["name"].split(".")
        var last = arr.pop()
        var first = arr.join(".")
        //console.warn(first +"sssss"+last)
        this.state.fileName = first
        this.state.fileExt = last
    }

    static navigationOptions = {
        title: "Document Preview"
    }

    state = {
        data: [],
        count: 0,
        maxPages: 6,
        totalPage: 0,
        nextButtonOpacity : 1,
        previousButtonOpacity : 0.5,
        prevButton: true,
        nextButton: false,
        auth: [],
        Id: [],
        pdVisible: false,
        renderCount: 0,
        pages: [],
        index: 0,
        fileName: "",
        fileExt: "",
    }

    componentWillMount = async() =>{
        let auth = await AsyncStorage.getItem('auth');
        this.state.auth = auth;
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

    render() {
        return(
            <View style={styles.mainContainer}>
                <ProgressDialog
                    visible={this.state.pdVisible}
                    title="Rendering next pages"
                    message="Please wait..."
                    activityIndicatorColor="#003d5a"
                    activityIndicatorSize="small"
                    animationType="fade"
                />
               <View style={{flex:0.1, flexDirection: 'row', backgroundColor: '#f5f5f5'}}>
                    <View style={{flex:0.1, alignContent:'center', justifyContent: 'center', marginLeft:10 }}>
                        {this.state.fileExt == "pdf" ?
                            <Icon
                                name="file-pdf-o"
                                size={40}
                                color="#003d5a"
                            /> : null
                        }
                        {this.state.fileExt == "docx" || this.state.fileExt == "doc" ?
                            <Icon
                                name="file-word-o"
                                size={40}
                                color="#003d5a"
                            /> : null
                        }
                    </View>
                    <View style={{flex:0.9,alignContent:'center', justifyContent: 'center', marginLeft:30 }}>
                        <Text style={{color: 'black', fontSize: 17, fontWeight: 'bold'}}>{this.state.data["name"]}</Text>
                    </View>
                </View>

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
                >
                {
                    this.state.data.pages.map((key, index) => {
                        if(index < this.state.totalPage){
                        return(
                            <View
                                key={index}
                                style={{
                                    margin: 20,
                                    justifyContent:'center',
                                    alignItems: 'center',
                                    backgroundColor: 'grey'
                                }}
                            >
                                <ImageZoom
                                    cropWidth={width/1.4}
                                    cropHeight={height*0.7}
                                    imageWidth={width/1.4}
                                    imageHeight={height*0.7}
                                >
                                    <ImageBackground
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            borderColor:'black',
                                            borderWidth:1,
                                            marginTop: 10
                                        }}
                                        resizeMode= "stretch"
                                        source={{uri: `data:image/png;base64,${this.state.pages[index]}`}}
                                    >
                                    </ImageBackground>
                                </ImageZoom>
                                <Text style={{margin: 10, fontSize: 17, fontWeight: 'bold', color: 'white'}}>Page: {index+1}/{this.state.totalPage}</Text>
                            </View>
                        )
                        }
                    })
                }
                </Swiper>
            </View>
        )
    }
}

export default DocumentPreview

const styles = StyleSheet.create({
    mainContainer:{
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
    imageContainer: {
        borderColor:'black',
        borderWidth:1,
        width:width/1.4,
        height:height*0.7,
    },
    buttonContainer: {
        backgroundColor: "#003d5a",
        borderRadius: 5,
        paddingVertical: 10,
        padding: 10,
        width: 100,
    },
    footerContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
})