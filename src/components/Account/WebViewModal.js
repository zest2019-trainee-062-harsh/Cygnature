import React, {Component} from 'react'
import {View, Text, StyleSheet, Dimensions, ActivityIndicator} from 'react-native'

import {WebView} from 'react-native-webview'
import Icon from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modalbox'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width

class WebViewModal extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        url : 'https://www.google.com'
    }

    show = (value) => {
        this.setState({url:value})
        this.refs.myModal.open()
    }
    close = () => {
        
        this.refs.myModal.close()
    }

    renderLoadingView() {
        return (
            <ActivityIndicator
               color = '#003d5a'
               size = "large"
               style={{ position: "absolute", top: height / 2, left: width / 2 }}
               hidesWhenStopped={true} 
            />
        );
    }
    

     render() {
         return (      
        <Modal 
            ref={"myModal"}
            style={ styles.modal }
            position= 'center'
            backdrop={true}
            backdropPressToClose={false}
            swipeToClose={false}>
            
            <View style={{flex:10}}>

                <View style={{flexDirection: 'row',}}>
                    <View style={{marginRight:20, flex:1,alignItems:'flex-end'}}>
                        <Icon name="md-close" color='black' size={50} onPress={()=>this.close()} />
                    </View>
                </View>
                
                <WebView
                    style={{flex: 9}}
                    renderLoading={this.renderLoadingView}
                    source={{uri: this.state.url}}
                    startInLoadingState={true}
                    scalesPageToFit={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}/>

            </View>
        </Modal>
                )
         }
     }

export default WebViewModal

const styles = StyleSheet.create({
    modal:{
        justifyContent: 'center',
        shadowRadius:20,
        width:width,
        height:height-100,
        borderColor:'#003d5a',
        borderWidth: 1,
        borderRadius:5
    },

})