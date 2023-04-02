import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

import { TextInput, View, Button } from 'react-native';

import { UserInfo } from '../../types/user';

export interface RegisterForm {}

const RegisterForm: React.FC<RegisterForm> = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: '',
    password: '',
    name: '',
  });

  const onSignUp = () => {
    const { email, password, name } = userInfo;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        const userDocRef = doc(getFirestore(), 'users', auth.currentUser!.uid);
        setDoc(userDocRef, { name, email });
      })
      .catch((err) => console.error(err));
  };

  return (
    <View>
      <TextInput
        placeholder="name"
        onChangeText={(name: string) => setUserInfo({ ...userInfo, name })}
      />
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
      <Button title="Sign Up" onPress={() => onSignUp()} />
    </View>
  );
};

export default RegisterForm;
