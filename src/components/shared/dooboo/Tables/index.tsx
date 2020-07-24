import * as React from 'react';

import { ScrollView, StyleProp, Text, View, ViewStyle } from 'react-native';

import { Button } from 'dooboo-ui';
import CheckBox from './CheckBox';
import TableCell from './TableCell';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableTitle from './TableTitle';
import styled from 'styled-components/native';

export interface Props {
  style?: StyleProp<ViewStyle>;
  data: Array<Record<string, any>>;
  isCheckAble?: boolean;
  customGroup?: Array<string>;
}

type TableNamespace = {
  Title: typeof TableTitle;
  Footer: typeof TableFooter;
  Header: typeof TableHeader;
  Row: typeof TableRow;
  Cell: typeof TableCell;
};

const TableWrapper = styled.View`
  border-radius: 6px;
  box-shadow: 0px 4px 30px #E7EBF0;
  margin: 7px;
`;

const Container = styled.View`
  flex: 1;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const Table: React.FC<Props> & TableNamespace = ({
  data,
  isCheckAble,
  customGroup,
  style,
}) => {
  /** default Data key */
  const group = data.reduce((acc, current) => {
    Array.from(Object.assign(acc, Object.keys(current)));
    return acc;
  }, []);

  /** checking interaction */
  const [selected, setSelected] = React.useState<string[]>([]);
  const isSelected = (name: string): boolean => selected.indexOf(name) !== -1;
  const handleClick = (name: string): void => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };
  /** Render */
  return (
    <ScrollView
      style={{
        width: '100%',
        height: '100%',
      }}>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <View
            style={{
              paddingBottom: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#6DA6FC',
              }}>
              {selected.length > 0 ? `${selected.length}개 선택됨` : null}{'   '}
            </Text>
            <Text
              style={{
                color: '#828282',
              }}>
              {`총 ${data.length}개`}
            </Text>
            <Button
              text='삭제'
              style={{
                backgroundColor: 'white',
                height: '30px',
                width: '58px',
                marginLeft: '20px',
                borderRadius: '3px',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: '#323C47',
              }}
              textStyle={{
                color: '#323C47',
                fontSize: '14px',
              }}
              onPress={():void => {
                setSelected([]);
              }}
            ></Button>
            <Button
              text='선택해제'
              style={{
                backgroundColor: 'white',
                height: '30px',
                width: '84px',
                marginLeft: '10px',
                borderRadius: '3px',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: '#323C47',
              }}
              textStyle={{
                color: '#323C47',
                fontSize: '14px',
              }}
              onPress={():void => {
                setSelected([]);
              }}
            ></Button>
          </View>
          <TableWrapper>
            <Table.Header headerStyle={{ backgroundColor: 'white' }}>
              <Table.Title isCheckAble={!isCheckAble} />

              {/** have a customGroup or undefined  */}
              {(customGroup || group)?.map((field: any, index: number) => {
                return (
                  <Table.Title
                    numberOfLines={1}
                    key={`${field}-${index}`}
                    isCheckAble={index === 0}>
                    {field}
                  </Table.Title>
                );
              })}
            </Table.Header>
            {data.map((item, i) => {
              const isItemSelected = isSelected(item[group[0]]);
              return (
                <Table.Row
                  key={`row-${item}-${i}`}
                  isChecked={!!isItemSelected}
                  rowStyle={{ backgroundColor: 'white' }}>
                  {/* If CheckAble is true */}
                  {isCheckAble ? (
                    <Table.Cell cellStyle={[{ justifyContent: 'center' }]}>
                      <CheckBox
                        onClick={(): void => handleClick(item[group[0]])}
                        value={!!isItemSelected}
                      />
                    </Table.Cell>
                  ) : (
                    <Table.Cell isShort={!isCheckAble} />
                  )}
                  {/** Body */}
                  {group?.map((param: any, index: number) => {
                    return (
                      <Table.Cell
                        key={`cell-${param}-${index}`}
                        isShort={index === 0}>
                        {item[param]}
                      </Table.Cell>
                    );
                  })}
                </Table.Row>
              );
            })}
            <Table.Footer>
            </Table.Footer>
          </TableWrapper>
        </Container>
      </ScrollView>
    </ScrollView>
  );
};

Table.Title = TableTitle;
Table.Header = TableHeader;
Table.Footer = TableFooter;
Table.Row = TableRow;
Table.Cell = TableCell;

export default Table;
