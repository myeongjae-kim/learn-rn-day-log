import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FloatingWriteButton from '../components/FloatingWriteButton';
import LogContext from '../contexts/LogContext';

const FeedsScreen = () => {
  const {logs} = useContext(LogContext);
  console.log(JSON.stringify(logs, null, 2));

  return (
    <View style={styles.block}>
      <Text>{JSON.stringify(logs, null, 2)}</Text>
      <FloatingWriteButton />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

export default FeedsScreen;
