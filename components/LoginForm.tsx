import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { TextInput, View, Button } from 'react-native';

import { UserInfo } from '../types/user';

export interface LoginForm {}

const LoginForm: React.FC<LoginForm> = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
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
        placeholder="email"
        onChangeText={(email: string) => setUserInfo({ ...userInfo, email })}
      />
      <TextInput
        placeholder="password"
        secureTextEntry
        onChangeText={(password: string) =>
          setUserInfo({ ...userInfo, password })
        }
      />
      <Button title="Sign In" onPress={() => onSignUp()} />
    </View>
  );
};

export default LoginForm;
