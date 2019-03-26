import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native'
import { Dimensions } from "react-native"

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width


class DocumentPreview extends Component {
    constructor(props) {
    super(props)
        this.state.data  = this.props.navigation.getParam('data')
        console.warn(this.state.data)
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
    }

    render() {
        return(
            <View style={styles.mainContainer}>
                <Text>{this.state.data["name"]}</Text>
                <Text>No. of pages: {this.state.data["pageCount"]}</Text>
                <Text>pageFrom {this.state.data["pageFrom"]}</Text>
                <Text>pageTo {this.state.data["pageTo"]}</Text>

                <Text>
                    *Note: Only 6 pages can be viewed after uploading the document.
                    The whole document can be viewed after you create the document.
                </Text>

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