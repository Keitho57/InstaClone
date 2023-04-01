import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions/index';

interface Main {}

const Main = () => {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    setUser(fetchUser());
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>User is logged in </Text>
    </View>
  );
};

const mapDispatchProps = (dispatch: any) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(null, mapDispatchProps)(Main);