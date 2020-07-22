import * as React from 'react';
import { StyleProp, TouchableWithoutFeedback, ViewStyle } from 'react-native';
declare type Props = React.ComponentPropsWithRef<typeof TouchableWithoutFeedback> & {
    children?: React.ReactNode;
    numberOfLines?: number;
    onPress?: () => void;
    isCheckAble?: boolean;
    titleStyle?: StyleProp<ViewStyle>;
};
declare function TableTitle(props: Props): React.ReactElement;
export default TableTitle;
