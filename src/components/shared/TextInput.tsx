import {
  NativeSyntheticEvent,
  TextInputProps,
  TextInputSubmitEditingEventData,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, { ReactElement } from 'react';

import { EditText } from 'dooboo-ui';
import { useThemeContext } from '@dooboo-ui/theme';

interface Props {
  testID?: string;
  labelPosition?: 'row';
  placeholder?: TextInputProps['placeholder'];
  placeholderTextColor?: TextInputProps['placeholderTextColor'];
  containerStyle?: ViewStyle;
  textInputStyle?: ViewStyle;
  focusColor?: string;
  labelText?: string;
  labelTextStyle?: TextStyle;
  value?: TextInputProps['value'];
  isErrored?: boolean;
  errorMessage?: React.ReactElement;
  errorStyle?: ViewStyle;
  numberOfLines?: number;
  secureTextEntry?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeText?: TextInputProps['onChangeText'];
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
}

export const TextInput = (props: Props): ReactElement => {
  const { theme, themeType } = useThemeContext();
  return (
    <EditText
      {...props}
      containerStyle={{
        flex: 1,
        width: '100%',
        marginBottom: 20,
        ...props.containerStyle,
      }}
      textInputStyle={{
        backgroundColor: themeType === 'LIGHT' ? theme.content : 'transparent',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 6,
        ...props.textInputStyle,
      }}
      labelTextStyle={{
        color: theme.font,
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 21,
        ...props.labelTextStyle,
      }}
    />
  );
};
