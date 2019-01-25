import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFD9E2',
  },
  button: {
    padding: 20,
    borderColor: '#dcc7e5',
    backgroundColor: "#ddcce5",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 4
  },
  uploadingLoader: {
    padding: 20
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    marginVertical: 16
  },
  successLabel: {
    fontSize: 12,
    color: 'green',
    marginTop: 4
  }
})

export default style
