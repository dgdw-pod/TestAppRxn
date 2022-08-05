/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import Styles from './styles/styles';
import loginPage from './login/login';
import profilePage from './profile/profile';
import progressIndicator from './progress/progress';
import { AuthHandler } from './authHandler'

const defaultState = {
  isLoggedIn: false,
  isBusy: false,
  name: '',
};

const App = () => {
  const [state, setState] = useState(defaultState);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const authHandler = new AuthHandler((isBusy: boolean, isLoggedIn: boolean, name: string) => {
    setState({
      isBusy: isBusy,
      isLoggedIn: isLoggedIn,
      name: name,
    })
  });

  return (
    <SafeAreaView style={{ backgroundColor: '#2196F3' }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={Styles.appbar}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: '500' }}>
          OAuth ReactNative Demo
        </Text>
      </View>
      <View style={Styles.centeredSection}>
        <View style={{ backgroundColor: isDarkMode ? Colors.black : Colors.white }}>
          {
            state.isBusy
              ? progressIndicator()
              : state.isLoggedIn
                ? profilePage(authHandler, state.name)
                : loginPage(authHandler)
          }
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;

