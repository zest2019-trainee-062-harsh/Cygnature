import React, {Component} from 'react'
import {View, Text, Image,TouchableOpacity, StyleSheet} from 'react-native'
import { Dimensions } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
 
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width

class DocumentUpload extends Component {
    constructor(props) {
        super(props)
        this.state.data  = this.props.navigation.getParam('data')
        this.state.totalPage = this.state.data["pageCount"]
    }
    state = {
        data: [],
        count: 0,
        totalPage: 0,
        nextButtonOpacity : 1,
        previousButtonOpacity : 1,
        prevButton: false,
        nextButton: false,
    }

    static navigationOptions = {
        title: "Document Upload"
    }

    nextPage() {
        this.setState({count:this.state.count+1})
        console.warn("C"+this.state.count)
        console.warn(this.state.totalPage)

        if(this.state.count == this.state.totalPage) {
            console.warn("Reached EOF")
            this.setState({nextButtonOpacity: 0.5, nextButton : false}) 
        }
    }
    prevPage() {
        this.setState({count:this.state.count-1})
        if(this.state.count == this.state.totalPage-1) {
            this.setState({previousButtonOpacity: 0.5 ,prevButton: true}) 
        }
    }

     render() {
        const base64Icon = this.state.data["pages"][this.state.count]
         return (
             <View style={styles.mainContainer}>
                <Text>Id {this.state.data["Id"]}</Text>
                <Text>name {this.state.data["name"]}</Text>
                <Text>pageCount {this.state.data["pageCount"]}</Text>
                <Text>pageFrom {this.state.data["pageFrom"]}</Text>
                <Text>pageTo {this.state.data["pageTo"]}</Text>
                
                            <View style={{margin:20, justifyContent:'center', alignItems: 'center'}}>
                <Image style={styles.imageContainer} source={{uri: `data:image/png;base64,${base64Icon}`}}/> 
                </View>
                {this.state.data["pageCount"] > 1 ? 
                    <View style={styles.footerContainer}>
                        <View style={{flex: 0.5, alignItems: "center"}}>
                            <TouchableOpacity style = { [styles.buttonContainer, { opacity: this.state.previousButtonOpacity}] }
                                disabled = {this.state.prevButton}
                                onPress = {() => this.prevPage()}
                            >
                                <Icon
                                    name="arrow-left"
                                    size={15}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 0.5, alignItems: "center"}}>
                            <TouchableOpacity style = { [styles.buttonContainer, { opacity: this.state.nextButtonOpacity, alignItems: 'flex-end'}] }
                                disabled = {this.state.nextButton}
                                onPress = {() => this.nextPage()}
                            >
                                <Icon
                                    name="arrow-right"
                                    size={15}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                    </View> : null
                }
             </View>
                )
         }
     }

export default DocumentUpload

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