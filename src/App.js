import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import ImagePicker from "react-native-image-crop-picker"
import { RNS3 } from 'react-native-aws3'
import style from './style'

class App extends Component {

  state = {
    file: null,
    uploading: false
  }

  openGallery = () => {
    ImagePicker.openPicker({ multiple: true })
      .then(files => {
        this.setState({ file: files[0] })
      })
      .catch(({ message }) => {
        if (__DEV__) {
          console.log(message)
        }
      })
  }

  performUpload = () => {
    const { sourceURL, filename, mime } = this.state.file
    const file = {
      uri: sourceURL,
      name: filename,
      type: mime
    }

    const options = {
      keyPrefix: "uploads/",
      bucket: "s3poc-dev",
      region: "us-east-1",
      accessKey: "AKIAII6EIT2N7ZAI6V3A",
      secretKey: "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",
      successActionStatus: 201
    }

    this.setState({ uploading: true })

    RNS3.put(file, options).then(response => {
      this.setState({ uploading: false })

      if (response.status !== 201) {
        console.log('ops some error ocurred')
      }
      console.log(response.body);
      /**
       * {
       *   postResponse: {
       *     bucket: "your-bucket",
       *     etag : "9f620878e06d28774406017480a59fd4",
       *     key: "uploads/image.png",
       *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
       *   }
       * }
       */
    });
  }

  render() {
    return (
      <View style={style.container}>
        <View style={style.section}>
          <TouchableOpacity
            onPress={this.openGallery}
            style={style.button}
          >
            <Text>
              Select media from gallery
            </Text>
          </TouchableOpacity>
        </View>
        {this.state.file && (
          <View style={style.section}>
            <Text style={style.label}>
              Selected image: {this.state.file.filename}
            </Text>
            {this.state.uploading
              ? <ActivityIndicator style={style.uploadingLoader} />
              : (
                <TouchableOpacity
                  onPress={this.performUpload}
                  style={style.button}
                >
                  <Text>
                    Upload to S3
                  </Text>
                </TouchableOpacity>
              )
            }
          </View>
        )}
      </View>
    )
  }
}

export default App