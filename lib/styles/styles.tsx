import {
  StyleSheet,
} from 'react-native';

const Styles = StyleSheet.create({
  appbar: {
    width: '100%',
    height: 48,
    backgroundColor: '#2196F3',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredSection: {
    backgroundColor: 'white',
    height: '100%',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    width: 70,
    height: 38,
    color: 'white',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default Styles;