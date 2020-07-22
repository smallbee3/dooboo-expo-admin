import React, { ReactElement } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
interface Props {
    children?: React.ReactNode;
    onPress?: () => void;
    cellStyle?: StyleProp<ViewStyle>;
    isShort?: boolean;
}
declare function TableCell(props: Props): ReactElement;
export default TableCell;
