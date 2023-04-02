import React from 'react';
import { View, Text } from 'react-native';

export interface FeedScreen {}

const FeedScreen: React.FC<FeedScreen> = () => {
  return (
    <View>
      <Text>Feed</Text>
    </View>
  );
};

export default FeedScreen;
