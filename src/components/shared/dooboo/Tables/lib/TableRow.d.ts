import { ReactElement, ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
interface Props {
    children: ReactNode;
    isChecked?: boolean;
    rowStyle?: StyleProp<ViewStyle>;
}
declare function TableRow(props: Props): ReactElement;
export default TableRow;
