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
      <ActivityIndicator size="large" color='#2196F3' />
  )}

  const loginPage = () => {
    return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => login()}
    >
      <Text style={{ color: '#fff', textAlign: 'center' }}>Login</Text>
    </TouchableOpacity>
  )}

  const profilePage = () => {
    return (
      <View style={styles.centeredSection}>
        <Text style={{ textAlign: 'center', paddingBottom: 48}}>Name: {state.name}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => logout()}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>Logout</Text>
        </TouchableOpacity>
        </View>
  )}

  return (
    <SafeAreaView style={{backgroundColor: '#2196F3'}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.appbar}>
        <Text style={{color:'white', fontSize: 20}}>
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
    width: 140,
    height: 30,
    color: 'white',
    justifyContent: 'center',
  }
});


/*const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});*/

export default App;

