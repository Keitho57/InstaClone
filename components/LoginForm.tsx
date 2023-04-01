import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { TextInput, View, Button } from 'react-native';

import { userInfo } from '../util/types';

export interface ILoginForm {}

const LoginForm: React.FC<ILoginForm> = () => {
  const [userInfo, setUserInfo] = useState<userInfo>({
    email: '',
    password: '',
  });

  const onSignUp = () => {
    const { email, password } = userInfo;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <View>
      <TextInput
        placeholder='email'
        onChangeText={(email: string) => setUserInfo({ ...userInfo, email })}
      />
      <TextInput
        placeholder='password'
        secureTextEntry
        onChangeText={(password: string) =>
          setUserInfo({ ...userInfo, password })
        }
      />
      <Button
        title='Sign In'
        onPress={() => onSignUp()}
      />
    </View>
  );
};

export default LoginForm;
