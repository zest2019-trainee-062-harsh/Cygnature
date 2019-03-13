import React, {Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Signature from 'react-native-signature-canvas';
import fetch_blob from 'react-native-fetch-blob';
import RNFS from 'react-native-fs';
 
export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = { signature: null };
  }
 
  handleSignature = signature => {
    this.setState({ signature });
  };

 
 
  render() {
    const style = `.m-signature-pad--footer
    .button {
      background-color: red;
      color: #FFF;
    }`;
    // const fs = fetch_blob.fs
    // const base64 = fetch_blob.base64
    // const dirs = fetch_blob.fs.dirs

    // const file_path =  "/android/app/src/cygnature_img"
    // const base64_img = base64.encode({signature})

    // RNFetchBlob.fs.writeFile(file_path, base64_img, 'base64')
    // .then((res) => {console.log("File : ", res)});

    const path = `${RNFS.PicturesDirectoryPath}/android/app/src/cygnature_img`;
    await RNFS.mkdir(path);
    return await fetch(uri)
   .then(res => res.blob())
   .then(image => {
      RNFetchBlob.fs.readFile(uri, "base64").then(data => {
         RNFS.appendFile(`${path}/${(signature)}`, data, "base64").catch(
            err => {
               console.log("error writing to android storage :", err);
            }
         );
      });
   });

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