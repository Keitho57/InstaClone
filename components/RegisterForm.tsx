import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { TextInput, View, Button } from 'react-native';

import { userInfo } from '../util/types';

export interface IRegisterForm {}

const RegisterForm: React.FC<IRegisterForm> = () => {
  const [userInfo, setUserInfo] = useState<userInfo>({
    email: '',
    password: '',
    name: '',
  });

  const onSignUp = () => {
    const { email, password, name } = userInfo;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <View>
      <TextInput
        placeholder='name'
        onChangeText={(name: string) => setUserInfo({ ...userInfo, name })}
      />
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
        title='Sign Up'
        onPress={() => onSignUp()}
      />
    </View>
  );
};

export default RegisterForm;
