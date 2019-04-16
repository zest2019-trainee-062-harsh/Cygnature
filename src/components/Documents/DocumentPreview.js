import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native'
import { Dimensions } from "react-native"
import ImageZoom from 'react-native-image-pan-zoom';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width


class DocumentPreview extends Component {
    constructor(props) {
    super(props)
        this.state.data  = this.props.navigation.getParam('data')
        this.state.totalPage = this.state.data["pageCount"]
    }

    static navigationOptions = {
        title: "Document Preview"
    }

    componentWillMount(){
        this.getImageSize()
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
    }

    getImageSize(){
        const image = "data:image/png;base64,"+this.state.data["pages"][0]
        // console.warn(image)
        let imageHeight=null; let imageWidth=null
        Image.getSize(image, (height, width) => {
            imageHeight = height
            imageWidth = width
            console.warn(imageHeight/imageWidth)
            console.warn(imageWidth+" "+imageHeight)
        })
    }

    render() {
        return(
            <View style={styles.mainContainer}>
                <Text>{this.state.data["name"]}</Text>
                <Text>No. of pages: {this.state.totalPage}</Text>
                <Text>pageFrom {this.state.data["pageFrom"]}</Text>
                <Text>pageTo {this.state.data["pageTo"]}</Text>

                <Text>
                    *Note: Only 6 pages can be viewed after uploading the document.
                    The whole document can be viewed after you create the document.
                </Text>

                <ScrollView>
                    <View style={{margin:20, justifyContent:'center', alignItems: 'center'}}>
                    <ImageZoom
                        style={styles.imageContainer}
                        cropWidth={width/1.4}
                        cropHeight={height/2}
                        imageWidth={width/1.4}
                        imageHeight={height/2}
                    >
                        <Image 
                            style={styles.imageContainer}
                            source={{uri: `data:image/png;base64,${this.state.data["pages"][this.state.count]}`}}
                        />
                    </ImageZoom>
                        <Text>Page: {this.state.count+1}/{this.state.totalPage}</Text>
                    </View>
                    {
                        this.state.data.pages.map(() => {
                            this.state.count = this.state.count+1
                            if(this.state.count < this.state.data["pageCount"]){
                                return(
                                    <View style={{margin:20, justifyContent:'center', alignItems: 'center'}} key={this.state.count}>
                                        <ImageZoom
                                            style={styles.imageContainer}
                                            cropWidth={width/1.4}
                                            cropHeight={height/2}
                                            imageWidth={width/1.4}
                                            imageHeight={height/2}
                                        >
                                            <Image 
                                                style={styles.imageContainer}
                                                source={{uri: `data:image/png;base64,${this.state.data["pages"][this.state.count]}`}}
                                            />
                                        </ImageZoom>
                                        <Text>Page: {this.state.count+1}/{this.state.totalPage}</Text>
                                    </View>
                                );
                            }
                            else{
                                null
                            }
                        })
                    }
                </ScrollView>
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
        height:height/2,
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