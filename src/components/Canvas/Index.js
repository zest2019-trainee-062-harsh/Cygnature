import React, {Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Signature from 'react-native-signature-canvas';

 
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { signature: null };
  }
 
  handleSignature = signature => {
    this.setState({ signature });
    var sign = signature();
    console.warn(sign)
    
  };
  
  static navigationOptions = {
    title: "Canvas"
}
 
  render() {
    const style = `.m-signature-pad--footer
    .button {
      background-color: red;
      color: #FFF;
    }`;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.preview}>
          {this.state.signature ? (
            <Image
              resizeMode={"contain"}
              style={{ width: 335, height: 114 }}
              source={{ uri: this.state.signature }}
             
            />
          ) : null}
        </View>
        <Signature
          onOK={this.handleSignature}
          descriptionText="Sign"
          clearText="Clear"
          confirmText="Save"
          webStyle={style}
        />
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  preview: {
    width: 335,
    height: 114,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15
  },
  previewText: {
    color: "#FFF",
    fontSize: 14,
    height: 40,
    lineHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#69B2FF",
    width: 120,
    textAlign: "center",
    marginTop: 10
  }
});