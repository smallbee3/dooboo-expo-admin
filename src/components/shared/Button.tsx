import React, { ReactElement } from 'react';
import { TextStyle, TouchableOpacityProps, ViewStyle } from 'react-native';

import { Button as DoobooButton } from 'dooboo-ui';
import { useThemeContext } from '@dooboo-ui/theme';

type ButtonType = 'primary' | 'secondary' | 'tertiary';
type ButtonWidthSizeType = 'small' | 'middle' | 'large' | 'full';
type ButtonHeightSizeType = 'small' | 'middle' | 'large';

enum ButtonWidthSize {
  default = 'auto',
  small = '119px',
  middle = '132px',
  large = '200px',
  full = '100%',
}

enum ButtonHeight {
  small = '36px',
  middle = '40px',
  large = '48px',
}

interface Props {
  testID?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  style?: ViewStyle;
  disabledStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabledTextStyle?: TextStyle;
  leftElement?: React.ReactElement;
  rightElement?: React.ReactElement;
  indicatorColor?: string;
  activeOpacity?: number;
  text?: string;
  touchableOpacityProps?: TouchableOpacityProps;
  /** hover */
  /** Accent */
  hoverStyle?: ViewStyle;
  accentStyle?: ViewStyle;
  /** Secondary */
  hoverTextStyle?: TextStyle;
  secondaryStyle?: ViewStyle;

  // custom props
  type?: ButtonType;
  widthSize?: ButtonWidthSizeType;
  heightSize?: ButtonHeightSizeType;
}

const CustomButton = (props: Props): ReactElement => {
  const { theme } = useThemeContext();

  const ButtonColor = {
    // This will change with custom doobooTheme by @s-ong-c
    primary: '#6DA6FC',
    secondary: '#90A0B7',
    tertiary: 'transparent',
  };

  const ButtonTextColor = {
    primary: theme.btnPrimaryFont,
    secondary: theme.btnPrimaryFont,
    tertiary: theme.font,
  };

  return (
    <DoobooButton
      {...props}
      containerStyle={{
        backgroundColor: ButtonColor[props.type || 'primary'],
        borderRadius: 6,
        width: ButtonWidthSize[props.widthSize || 'default'],
        height: ButtonHeight[props.heightSize || 'small'],
        alignItems: 'center',
        ...props.containerStyle,
      }}
      textStyle={{
        fontSize: 14,
        fontWeight: 'bold',
        color: ButtonTextColor[props.type || 'primary'],
        lineHeight: 21,
        paddingHorizontal: 16,
        ...props.textStyle,
      }}
    />
  );
};

export default CustomButton;
