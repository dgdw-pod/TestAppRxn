/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useCallback, type PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { authorize } from 'react-native-app-auth';
import axios from 'axios';

const defaultState = {
  isLoggedIn: false,
  isBusy: false,
  name: '',
}

const configs = {
  serviceConfiguration: {
    authorizationEndpoint: 'https://auth-staging.pod-point.com/oauth/authorize',
    tokenEndpoint: 'https://auth-staging.pod-point.com/api/v1/oauth/token',
  },
  clientId: '74',
  redirectUrl: 'com.podpoint.testapp://callback',
  additionalParameters: {},
  scopes: [],
};

const userInfoEndpoint = 'https://auth-staging.pod-point.com/api/v1/user';

const App = () => {
  const [state, setState] = useState(defaultState);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getUserProfile = async (accessToken: string) => {
    try {
      const result = await axios.get(
        userInfoEndpoint,
        {
          headers: {
            'Authorization': 'Bearer ' + accessToken,
          }
        });
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }

  const login = useCallback(async () => {
      try {
        setState({
          isBusy: true,
          isLoggedIn: false,
          name: '',
        });

        const result = await authorize({
          ...configs,
        });
        console.log(result);

        const profile = await getUserProfile(result.accessToken);
        console.log(profile);

        setState({
          isBusy: false,
          isLoggedIn: true,
          name: profile.data.name,
        });
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    setState({
      isBusy: false,
      isLoggedIn: false,
      name: '',
    })
  },
  [],
  );

  const progressIndicator = () => {
    return (
      <ActivityIndicator size="large" color='#2196F3'/>
  )}

  const loginPage = () => {
    return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => login()}
    >
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
  )}

  const profilePage = () => {
    return (
      <View style={styles.centeredSection}>
        <Text style={{textAlign: 'center', paddingBottom: 48}}>Name: {state.name}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => logout()}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        </View>
  )}

  return (
    <SafeAreaView style={{backgroundColor: '#2196F3'}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.appbar}>
        <Text style={{color:'white', fontSize: 20, fontWeight: '500'}}>
          OAuth ReactNative Demo
        </Text>
      </View>
      <View style={styles.centeredSection}>
        <View style={{backgroundColor: isDarkMode ? Colors.black : Colors.white}}>
            {
              state.isBusy
              ? progressIndicator()
              : state.isLoggedIn
                ? profilePage()
                : loginPage()
            }
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appbar: {
    width: '100%',
    height: 48,
    backgroundColor: '#2196F3',
    color: 'white',
    justifyContent:'center',
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

export default App;

