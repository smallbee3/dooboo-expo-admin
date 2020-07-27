import * as React from 'react';

import {
  Button,
  ScrollView,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
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
  margin: 7px;
  border-radius: 6px;
  box-shadow: 0px 4px 30px #e7ebf0;
`;

const Container = styled.View`
  flex: 1;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const StyledDeleteButton = styled.View`
  background-color: white;
  height: 30px;
  width: 58px;
  margin-left: 20px;
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: #323c47;
  justify-content: center;
  align-items: center;
`;

const StyledUnselectButton = styled(StyledDeleteButton)`
  width: 84px;
  margin-left: 10px;
`;

const StyledText = styled.Text`
  color: #323c47;
  font-size: 14px;
`;

const Table: React.FC<Props> & TableNamespace = ({
  data,
  isCheckAble,
  customGroup,
  style,
}) => {
  /** default Data key */
  const group = data.reduce((acc, current) => {
    Object.assign(acc, Object.keys(current));
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
      horizontal
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        width: '100%',
        height: '100%',
      }}
    >
      <Container>
        <View
          style={{
            paddingBottom: 15,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#6DA6FC',
            }}
          >
            {selected.length > 0 ? `${selected.length}개 선택됨` : null}
            {'   '}
          </Text>
          <Text
            style={{
              color: '#828282',
            }}
          >
            {`총 ${data.length}개`}
          </Text>
          <TouchableOpacity
            onPress={(): void => {
              setSelected([]);
            }}
          >
            <StyledDeleteButton>
              <StyledText>삭제</StyledText>
            </StyledDeleteButton>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={(): void => {
              setSelected([]);
            }}
          >
            <StyledUnselectButton>
              <StyledText>선택해제</StyledText>
            </StyledUnselectButton>
          </TouchableOpacity>
        </View>
        <TableWrapper>
          <Table.Header headerStyle={{ backgroundColor: 'white' }}>
            <Table.Title isShort={!isCheckAble} />

            {/** have a customGroup or undefined  */}
            {(customGroup || group)?.map((field: any, index: number) => {
              return (
                <Table.Title
                  numberOfLines={1}
                  key={`${field}-${index}`}
                  isShort={index === 0}
                >
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
                rowStyle={{ backgroundColor: 'white' }}
              >
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
                      isShort={index === 0}
                    >
                      {item[param]}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            );
          })}
          <Table.Footer></Table.Footer>
        </TableWrapper>
      </Container>
    </ScrollView>
  );
};

Table.Title = TableTitle;
Table.Header = TableHeader;
Table.Footer = TableFooter;
Table.Row = TableRow;
Table.Cell = TableCell;

export default Table;
