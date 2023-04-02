import React from 'react';
import { View, Text } from 'react-native';

export interface ProfileScreen {}

const ProfileScreen: React.FC<ProfileScreen> = () => {
  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;
