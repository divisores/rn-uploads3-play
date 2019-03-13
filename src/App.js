import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import { RNS3 } from 'react-native-aws3'
import options from './aws-config.json'
import style from './style'

class App extends Component {
  state = {
    file: null,
    uploading: false,
    success: false
  }

  openGallery = () => {
    ImagePicker.openPicker({ multiple: true })
      .then((files) => {
        this.setState({ file: files[0] })
      })
      .catch(({ message }) => {
        if (__DEV__) {
          console.log(message)
        }
      })
  }

  performUpload = () => {
    const { file: { sourceURL, filename, mime } } = this.state
    const file = {
      uri: sourceURL,
      name: filename,
      type: mime
    }

    this.setState({ uploading: true, success: false })

    RNS3.put(file, options).then((response) => {
      const uploadState = {
        uploading: false,
        success: true
      }

      if (response.status !== 201) {
        console.log('ops some error ocurred')
        uploadState.success = false
      }

      this.setState({ ...uploadState })
    })
  }

  render() {
    const { file, uploading, success } = this.state

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
        {file && (
          <View style={style.section}>
            <Text style={style.label}>
              Selected image: {file.filename}
            </Text>
            {uploading
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
            {success && (
              <Text style={style.successLabel}>
                Upload successfully
              </Text>
            )}
          </View>
        )}
      </View>
    )
  }
}

export default App
