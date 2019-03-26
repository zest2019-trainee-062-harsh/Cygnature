import React, {Component} from 'react'
import {View, Text} from 'react-native'


class DocumentPreview extends Component {
    constructor(props) {
    super(props)
    this.state.data  = this.props.navigation.getParam('data')
    //console.warn(this.state.data[0])
    }
    static navigationOptions = {
        title: "Document preview"
    }

    state = {
        data: [],
    }

     render() {
         return (
             <View>
                <Text>{this.state.data["name"]}</Text>
             </View>
                )
         }
     }

export default DocumentPreview