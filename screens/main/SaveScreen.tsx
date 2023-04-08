import React from 'react';
import { View, Text } from 'react-native';

export interface ISave {}

const Save: React.FC<ISave> = (props) => {
  console.log('here', props);
  return <Text>Hi</Text>;
};

export default Save;
