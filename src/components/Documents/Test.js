import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Animated,
  PanResponder,
} from 'react-native';

import Icon1 from 'react-native-vector-icons/FontAwesome5'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Swiper from 'react-native-swiper';
import ImageZoom from 'react-native-image-pan-zoom';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width

export default class Test extends Component {
  constructor(props){
    super(props);
    this.addMore = this.addMore.bind(this);
  }

  static navigationOptions = {
    header: null
  }

  addMore(){
    this.state.key = this.state.key + 1
    this.renderAnnotations()
  }

  addAnnotation(){
    let element= (
      <Animated.View key={this.state.key}
        style={styles.imageContainer}
        {...this.PanResponder.panHandlers}
        style={this.state.animatedStyle}
      >
        <Text>Drag Me</Text>
      </Animated.View>
    )
    this.state.annotations.push(element)
    this.state.key=this.state.key+1
    return this.state.annotations
  }

  renderAnnotations(){
    const elements = []
    for(let i = 0; i <this.state.key; i++){
      elements.push(
        <Animated.View key={i}
          style={styles.imageContainer}
          {...this.PanResponder.panHandlers}
          style={this.state.animatedStyle}
        >
          <Text>Drag Me</Text>
        </Animated.View>
      );
    }
    return elements;
  }

  componentWillMount(){
    // console.warn(this.state.signers)
    this.Animatedvalue = new Animated.ValueXY();
    this._value = {x: 0, y: 0}
    this.Animatedvalue.addListener((value)=> this._value = value)
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        this.Animatedvalue.setOffset({
          x: this._value.x,
          y: this._value.y
        })
        this.Animatedvalue.setValue({x: 0, y:0})
      },
      onPanResponderMove: Animated.event([
        null, {dx : this.Animatedvalue.x , dy : this.Animatedvalue.y}
      ]),
      onPanResponderRelease: (e, gestureState) =>{
        console.warn(this._value)
      },
    })
  }

  state = {
    auth: null,
    id: null, 
    count: 0,
    maxPages: 6,
    totalPage: 0,
    pdVisible: true,
    signerIds: [],
    data : [],
    currentSigner: [],
    key : 1,
    placeholderBox : [],
    animatedStyle: [],
    height: [],
    width: [],
    annotations:[]
  }

  render(){
    const animatedStyle = {
      transform: this.Animatedvalue.getTranslateTransform(),
      borderColor: "black",
      borderWidth: 1,
      backgroundColor: "white",
      opacity: 0.5,
      height: 20,
      width: 100,
      color: "black"
    }
    this.state.animatedStyle = animatedStyle
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container1}>
          <View style={styles.container1_sub1}>
            <TouchableOpacity style = { styles.buttonContainer} onPress={() => this.addMore()}>
              <Icon1 name="pen" style={styles.buttonIcon} >
                <Text style = { styles.buttonText }>Set</Text>
              </Icon1>
            </TouchableOpacity>
            <TouchableOpacity style = { styles.buttonContainer} onPress={() => this.removeAnnotation()}>
              <Icon2 name="md-remove-circle" style={styles.buttonIcon} >
                <Text style = { styles.buttonText }>Clear</Text>
              </Icon2>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container2}>
          <Swiper
            showsButtons={true}
            activeDotColor={'#003d5a'}
            dotColor={'grey'}
          >
            <View
              style={{margin:20, justifyContent:'center', alignItems: 'center'}}
            >
              <ImageZoom
                cropWidth={width/1.4}
                cropHeight={height/2}
                imageWidth={width/1.4}
                imageHeight={height/2}
              >
                <ImageBackground style={styles.imageContainer}
                  source={{uri: 'https://placeimg.com/640/640/nature'}}
                >
                  {this.renderAnnotations()}
                </ImageBackground>
              </ImageZoom>
            </View>
            <View
              style={{margin:20, justifyContent:'center', alignItems: 'center'}}
            >
              <ImageZoom
                cropWidth={width/1.4}
                cropHeight={height/2}
                imageWidth={width/1.4}
                imageHeight={height/2}
              >
                <ImageBackground style={styles.imageContainer}
                  source={{uri: 'https://placeimg.com/640/640/beer'}}
                >
                  {
                    this.state.annotations.map((item, key) => {
                    if((key) == this.state.key)
                      return(
                        this.state.annotations["element"]
                      )
                    })
                  }
                    <Animated.View
                        style={styles.imageContainer}
                        {...this.PanResponder.panHandlers}
                        style={animatedStyle}
                    >
                      <Text>Drag Me</Text>
                    </Animated.View>
                </ImageBackground>
              </ImageZoom>
            </View>
          </Swiper>
        </View>
        <View style={styles.container3}>
          <TouchableOpacity style = { styles.footerbuttonContainer} onPress={() => this.review()}>
            <Text style = { styles.footerbuttonText }>Review & Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
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
    width:width/1.4,
    height:height/2,
  },
})

// import React, { Component } from 'react';
// import {
//   Platform, 
//   Text,
//   Image,
//   View, 
//   TextInput, 
//   TouchableOpacity, 
//   ScrollView 
// } from 'react-native';

// class Test extends Component {
//   constructor() {
//     super();
//     this.state = {
//       count: 1,
//     };
//     this.addMore = this.addMore.bind(this);
//   }

//   addMore() {
//     this.setState({
//       count: ++this.state.count,
//     })
//   }

//   renderAddress() {
//     const elements = [];
//     for (let i = 0; i < this.state.count; i++) {
//       elements.push(
//           <TextInput key={i}
//             placeholder="Registered addresses"
//           />
//       );
//     }
//     return elements;
//   }

//   render() {
//     return (
//       <View>
//         {this.renderAddress()}
//         <TouchableOpacity onPress={this.addMore}>
//             <Text>HI!</Text>
//           </TouchableOpacity>
//       </View> 

//     );
//   }
// }

// export default Test;