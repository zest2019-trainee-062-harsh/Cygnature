import React, {Component} from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ActivityIndicator, AsyncStorage,  } from 'react-native';

import SignaturePad from 'react-native-signature-pad';

import { ProgressDialog } from 'react-native-simple-dialogs';
export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = { signature: null, canvas:true, auth: null, pdVisible: false, };
  }
 
  static navigationOptions = {
    title: "Canvas"
  }

  componentDidMount() {
    this._clear()
  }

  enrollSign = async() => {
  
    this.setState({pdVisible: true})
    let auth = await AsyncStorage.getItem("auth")
    this.setState({auth: auth})
    return fetch('http://cygnatureapipoc.stagingapplications.com/api/user/update-signature',{
    method: 'POST',
    headers: {
        'Authorization':this.state.auth,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "signatureType": 2,
        "ImageBytes": this.state.signature
    }),
    }).then((response) => response.json())
    .then((responseJson) => {
        this.setState({pdVisible: false})
        if(responseJson['message'] == null) {
          this._clear()
          alert("Enroll failed\nPlease check canvas")
        } else {
          this._clear()
          //console.warn(responseJson)
          this.props.navigation.navigate('Account')
        }
    })
    .catch((error) => {
        console.warn(error);
    });
  
}
 
  render() {
    var pencolor = "#003d5a";
    return (
      <View style={styles.mainContainer}>

      <ProgressDialog
                visible={this.state.pdVisible}
                title="Enrolling !"
                message="Please wait..."
                activityIndicatorColor="#003d5a"
                activityIndicatorSize="large"
                animationType="slide"
            />

      <View style={{flex:0.9}}>
        <View style={styles.pad}>
        {this.state.canvas?
          <SignaturePad 
            penColor={pencolor}
            onError={this._signaturePadError}
            onChange={this._signaturePadChange} />:
              <View style={{flex: 1,justifyContent: 'center', alignContent:'center'}}> 
                <ActivityIndicator color="#003d5a" size="large" /> 
              </View>}
        </View>
      </View>

      <View style={styles.footerContainer}>       
      <TouchableOpacity style = { styles.footerbuttonContainer} onPress={this._clear}>
        <Text style = { styles.footerbuttonText }>Clear</Text>
      </TouchableOpacity>

      <TouchableOpacity style = { styles.footerbuttonContainer} onPress={this._getSig}>
        <Text style = { styles.footerbuttonText }>Save</Text>
      </TouchableOpacity>
      </View>  

      </View>
    )
  };
  _signaturePadError = (error) => {
    console.error(error);
  };
 
  _signaturePadChange = ({base64DataUrl}) => {
    var string = base64DataUrl
    string = string.replace(/^data:image/, "");
    string = string.replace('/', "");
    string = string.replace(/^png;base64,/, "");
    //console.warn(string)
    this.setState({signature: string})
    //console.warn(base64DataUrl);
  };



  _getSig = () => {
    //console.warn(this.state.signature)
    this.enrollSign()
  }
  _clear = () => {
    this.setState({ canvas: false, signature: null }); 
    setTimeout( () => { this.setState({ canvas: true }); }, 500);
  }
}


const styles = StyleSheet.create({
  mainContainer: {
      borderWidth:1,
      flex:1,
      backgroundColor: 'white',
      margin: 7, 
      borderWidth: 2,
      borderRadius:5,
      borderColor: "#003d5a",
      padding: 10
  },
  pad: {
    flex: 0.9, 
    //backgroundColor: 'green',
    margin:10,
    borderWidth: 1,
    borderRadius:5,
    borderColor: "#003d5a",
  },
  footerContainer:{
    flex:0.1,
    flexDirection:'row'
  },
  footerbuttonContainer: {
    flex:0.5,
    backgroundColor: '#003d5a',
    paddingVertical: 10,
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center'
},
footerbuttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold'
},
})
 