import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from './pages/auth/Landing';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

import {
  APIKEY,
  APPID,
  AUTHDOMAIN,
  MEASUREMENTID,
  MESSAGESENDERID,
  PROJECTID,
  STORAGEBUCKET,
} from '@env';

const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGESENDERID,
  appId: APPID,
  measurementId: MEASUREMENTID,
};

export const fb = initializeApp(firebaseConfig);

const Stack = createStackNavigator();

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoaded(true);
        setLoggedIn(false);
      } else {
        setLoaded(true);
        setLoggedIn(true);
      }
    });
  }, []);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>Loading</Text>
      </View>
    );
  }

  if (!loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Landing'>
          <Stack.Screen
            name='Landing'
            component={Landing}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Register'
            component={Register}
          />
          <Stack.Screen
            name='Login'
            component={Login}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>User is logged in </Text>
    </View>
  );
};
export default App;
