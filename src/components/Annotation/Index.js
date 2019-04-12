import React, { Component } from 'react'
import {StyleSheet,View,Text,PanResponder,Animated} from 'react-native'


export default class Index extends Component {
    componentWillMount(){
        this.animatedValue = new Animated.ValueXY();
        this._value = {x: 0 , y: 0};
         this.animatedValue.addListener((value) => this._value = value);
        this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
         
        this.animatedValue.setOffset({
            x: this._value.x,
            y: this._value.y,
        })
        this.animatedValue.setValue({x: 0,y: 0})
      },
      onPanResponderMove: Animated.event([
            null, {dx: this.animatedValue.x, dy: this.animatedValue.y}
      ]),
      
      onPanResponderRelease: (evt, gestureState) => {

       console.warn(this._value.x)
       console.warn(this._value.y)
       
      },
    })
    }
  render() {
      const animatedStyle = {
          transform: this.animatedValue.getTranslateTransform()
      }
    return (   
        <View style={styles.container}>
        <Animated.View style={[styles.box, animatedStyle]} {...this.panResponder.panHandlers}>
            <Text style={styles.text}>Drag me</Text>
        </Animated.View>
        </View>  
    )
}
}

const styles = StyleSheet.create({
    container:{ 
        borderColor:'black',
        flex:1,
        backgroundColor: 'white',
        margin: 7,
        borderColor: "#003d5a",
        padding: 10,
        
    },
    box: {
        borderWidth:1,
        height:100,
        width:100,
        backgroundColor:'black',
        justifyContent:'center'
    },
    text:{
        color:'white',
        textAlign:'center',
    }
})


