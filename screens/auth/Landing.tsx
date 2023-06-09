import React from 'react';
import { View, Button } from 'react-native';

interface Landing {
  navigation: any;
}

const Landing: React.FC<Landing> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default Landing;
