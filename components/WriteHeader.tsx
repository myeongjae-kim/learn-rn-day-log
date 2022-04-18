import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TransparentCircleButton from './TransparentCircleButton';

const WriteHeader = () => {
  const navigation = useNavigation();
  const onGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.block}>
      <View>
        <TransparentCircleButton
          name={'arrow-back'}
          color={'#424242'}
          onPress={onGoBack}
        />
      </View>
      <View style={styles.buttons}>
        <TransparentCircleButton
          name={'delete-forever'}
          color={'#ef5350'}
          hasMarginRight
        />
        <TransparentCircleButton name={'check'} color={'#009688'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    height: 48,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default WriteHeader;
