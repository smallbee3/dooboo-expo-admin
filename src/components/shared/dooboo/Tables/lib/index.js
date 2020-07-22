var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as React from 'react';
import { ScrollView, Text } from 'react-native';
import CheckBox from './CheckBox';
import TableCell from './TableCell';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableTitle from './TableTitle';
import styled from 'styled-components/native';
var Container = styled.View(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex: 1;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n"], ["\n  flex: 1;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n"])));
var Table = function (_a) {
    var _b;
    var data = _a.data, isCheckAble = _a.isCheckAble, customGroup = _a.customGroup, style = _a.style;
    /** default Data key */
    var group = data.reduce(function (acc, current) {
        Array.from(Object.assign(acc, Object.keys(current)));
        return acc;
    }, []);
    /** checking interaction */
    var _c = React.useState([]), selected = _c[0], setSelected = _c[1];
    var isSelected = function (name) { return selected.indexOf(name) !== -1; };
    var handleClick = function (name) {
        var selectedIndex = selected.indexOf(name);
        var newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        }
        else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        }
        else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        }
        else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };
    /** Render */
    return (<ScrollView style={{
        width: '100%',
        height: '100%',
    }}>
      <ScrollView horizontal>
        <Container>
          <Text>
            {selected.length > 0 ? selected.length + " item selected" : null}{' '}
          </Text>
          <Table.Header headerStyle={{ backgroundColor: '#f9f9f9' }}>
            <Table.Title isCheckAble={!isCheckAble}/>

            
            {(_b = (customGroup || group)) === null || _b === void 0 ? void 0 : _b.map(function (field, index) {
        return (<Table.Title numberOfLines={1} key={field + "-" + index} isCheckAble={index === 0}>
                  {field}
                </Table.Title>);
    })}
          </Table.Header>
          {data.map(function (item, i) {
        var isItemSelected = isSelected(item[group[0]]);
        return (<Table.Row key={"row-" + item + "-" + i} isChecked={!!isItemSelected} rowStyle={{ backgroundColor: 'white' }}>
                
                {isCheckAble ? (<Table.Cell cellStyle={[{ justifyContent: 'center' }]}>
                    <CheckBox onClick={function () { return handleClick(item[group[0]]); }} value={!!isItemSelected}/>
                  </Table.Cell>) : (<Table.Cell isShort={!isCheckAble}/>)}
                
                {group === null || group === void 0 ? void 0 : group.map(function (param, index) {
            return (<Table.Cell key={"cell-" + param + "-" + index} isShort={index === 0}>
                      {item[param]}
                    </Table.Cell>);
        })}
              </Table.Row>);
    })}
        </Container>
      </ScrollView>
    </ScrollView>);
};
Table.Title = TableTitle;
Table.Header = TableHeader;
Table.Row = TableRow;
Table.Cell = TableCell;
export default Table;
var templateObject_1;
