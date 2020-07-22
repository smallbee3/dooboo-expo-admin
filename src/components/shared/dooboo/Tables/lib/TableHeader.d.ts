import React, { ReactElement } from 'react';
import { View, ViewStyle } from 'react-native';
declare type Props = React.ComponentPropsWithRef<typeof View> & {
    children: React.ReactNode;
    headerStyle?: ViewStyle;
};
declare function TableHeader(props: Props): ReactElement;
export default TableHeader;
