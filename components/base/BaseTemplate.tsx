import React from 'react';
import { View, Text } from 'react-native';

export interface IBaseTemplate {
  sampleTextProp: string;
}

const BaseTemplate: React.FC<IBaseTemplate> = ({ sampleTextProp }) => {
  return (
    <View>
      <Text>{sampleTextProp}</Text>
    </View>
  );
};

export default BaseTemplate;
