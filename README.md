# React Native - S3 Files Upload

This repo contains just a Proof of Concept (PoC) of an application responsible for uploading files to
AWS S3 using React Native.

Basically, the user can select fotos from gallery and upload them.

## Stack
This project was built with:

- [React Native](https://github.com/facebook/react-native)
- [React Native AWS S3](https://github.com/mybigday/react-native-s3)
- [React Native Image Crop Picker](https://github.com/ivpusic/react-native-image-crop-picker)

## How to use
This repo provivides an example AWS config file, inside `src/aws-config-example.json`.

Create a `aws-config.json` file inside `./src` and  fill the properties according to your AWS data and you're good to go :)


Here's the JSON example:
```
{
  "keyPrefix": "uploads/",
  "bucket": "your-bucket",
  "region": "us-east-1",
  "accessKey": "your-access-key",
  "secretKey": "your-secret-key",
  "successActionStatus": 201
}
```

Feel free to contact us at http://divisio.com.br if you have any doubts.