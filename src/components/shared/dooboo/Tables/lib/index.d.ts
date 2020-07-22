import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import TableCell from './TableCell';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableTitle from './TableTitle';
export interface Props {
    style?: StyleProp<ViewStyle>;
    data: Array<Record<string, any>>;
    isCheckAble?: boolean;
    customGroup?: Array<string>;
}
declare type TableNamespace = {
    Title: typeof TableTitle;
    Header: typeof TableHeader;
    Row: typeof TableRow;
    Cell: typeof TableCell;
};
declare const Table: React.FC<Props> & TableNamespace;
export default Table;
