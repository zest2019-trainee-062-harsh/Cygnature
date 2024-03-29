import React, {Component} from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ActivityIndicator, AsyncStorage,  } from 'react-native';

import SignaturePad from 'react-native-signature-pad';

import { StackActions, NavigationActions } from 'react-navigation'
import { ProgressDialog } from 'react-native-simple-dialogs';
export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state.isSignature  = this.props.navigation.getParam('isSignature')
    this.state.flow  = this.props.navigation.getParam('flow')
  }
    state = { 
      signature: null,
      canvas:true,
      auth: null,
      pdVisible: false,
      isSignature: true,
      flow: null
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
    if(this.state.isSignature) { 
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
            alert("Update failed\nPlease check canvas")
          } else {
            this._clear()
            //console.warn(responseJson)
            //this.props.navigation.navigate('Account')
            alert("Updated")
            if(this.state.flow == 1) {
              const popAction = StackActions.pop({
                n: 1,
              });
              this.props.navigation.dispatch(popAction)
            } else {
              const popAction = StackActions.pop({
                n: 2,
              });
              this.props.navigation.dispatch(popAction) 
            }
          }
      })
      .catch((error) => {
          console.warn(error);
      })
  }
  else {
    return fetch('http://cygnatureapipoc.stagingapplications.com/api/user/enroll-signature',{
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
            //this.props.navigation.navigate('Account')
            alert("Enrolled")
            if(this.state.flow == 1) {
              const popAction = StackActions.pop({
                n: 1,
              });
              this.props.navigation.dispatch(popAction)
            } else {
              const popAction = StackActions.pop({
                n: 2,
              });
              this.props.navigation.dispatch(popAction) 
            }
          
          }
      })
      .catch((error) => {
          console.warn(error);
      })
  }
    
  
}
 
  render() {
    var pencolor = "black";
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

        <View style={styles.pad}>
        {this.state.canvas
            ?
          <SignaturePad 
            style={{flex:1,}}
            penColor={pencolor}
            onError={this._signaturePadError}
            onChange={this._signaturePadChange} />
            :
          <View style={{flex: 1,justifyContent: 'center', alignContent:'center'}}> 
            <ActivityIndicator color="#003d5a" size="large" /> 
          </View>
        }
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
    flex:0.3,
    borderWidth: 1,
    borderRadius:5,
    borderColor: "#003d5a",
    margin:10,
    marginBottom: 30
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
 