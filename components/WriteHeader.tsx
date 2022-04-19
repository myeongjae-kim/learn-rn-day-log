import React, {useReducer} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TransparentCircleButton from './TransparentCircleButton';
import {ko} from 'date-fns/locale';
import {format} from 'date-fns';
import DateTimePicker from 'react-native-modal-datetime-picker';

type DateTimePickerMode = 'date' | 'time' | 'datetime';

type State = {
  mode: DateTimePickerMode;
  visible: boolean;
};

type Action = {
  type: 'open' | 'close';
  mode?: DateTimePickerMode;
};

const initialState: State = {mode: 'date', visible: false};
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'open':
      return {
        mode: action.mode ?? state.mode,
        visible: true,
      };
    case 'close':
      return {
        ...state,
        visible: false,
      };
    default:
      throw new Error('Unhandled action type');
  }
};

type Props = {
  onSave(): void;
  onAskRemove(): void;
  isEditing: boolean;
  date: Date;
  onChangeDate(date: Date): void;
};

const WriteHeader = ({
  onSave,
  onAskRemove,
  isEditing,
  date,
  onChangeDate,
}: Props) => {
  const navigation = useNavigation();
  const onGoBack = () => {
    navigation.goBack();
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const open = (mode: DateTimePickerMode) => dispatch({type: 'open', mode});
  const close = () => dispatch({type: 'close'});

  const onConfirm = (selectedDate: Date) => {
    close();
    onChangeDate(selectedDate);
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
        {isEditing && (
          <TransparentCircleButton
            name={'delete-forever'}
            color={'#ef5350'}
            hasMarginRight
            onPress={onAskRemove}
          />
        )}
        <TransparentCircleButton
          name={'check'}
          color={'#009688'}
          onPress={onSave}
        />
      </View>
      <View style={styles.center}>
        <Pressable onPress={() => open('date')}>
          <Text>{format(date, 'PPP', {locale: ko})}</Text>
        </Pressable>
        <View style={styles.separator} />
        <Pressable onPress={() => open('time')}>
          <Text>{format(date, 'p', {locale: ko})}</Text>
        </Pressable>
      </View>
      <DateTimePicker
        isVisible={state.visible}
        mode={state.mode}
        onConfirm={onConfirm}
        onCancel={close}
        date={date}
      />
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
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
    flexDirection: 'row',
  },
  separator: {
    width: 8,
  },
});

export default WriteHeader;
