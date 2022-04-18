import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import WriteHeader from '../components/WriteHeader';
import WriteEditor from '../components/WriteEditor';

const WriteScreen = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <WriteHeader />
        <WriteEditor
          title={title}
          body={body}
          onChangeTitle={setTitle}
          onChangeBody={setBody}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  block: {flex: 1, backgroundColor: 'white'},
  avoidingView: {
    flex: 1,
  },
});

export default WriteScreen;
