import React from 'react';
import { View, Text } from 'react-native';

export interface AddScreen {}

const AddScreen: React.FC<AddScreen> = () => {
  return (
    <View>
      <Text>AddScreen</Text>
    </View>
  );
};

export default AddScreen;
