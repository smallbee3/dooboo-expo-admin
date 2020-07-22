var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from 'react';
import styled from 'styled-components/native';
var Container = styled.View(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: 48px;\n"], ["\n  width: 100%;\n  height: 48px;\n"])));
var Content = styled.View(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  height: 48px;\n  border-bottom-width: 1px;\n  border-bottom-color: lightgray;\n  flex-direction: row;\n  background: ", ";\n"], ["\n  height: 48px;\n  border-bottom-width: 1px;\n  border-bottom-color: lightgray;\n  flex-direction: row;\n  background: ", ";\n"])), function (_a) {
    var isChecked = _a.isChecked;
    return (isChecked ? '#f2f9ff' : 'white');
});
function TableRow(props) {
    var isChecked = props.isChecked, rowStyle = props.rowStyle;
    return (<Container testID="table-row-test-id" style={[rowStyle]}>
      <Content isChecked={isChecked}>{props.children}</Content>
    </Container>);
}
export default TableRow;
var templateObject_1, templateObject_2;
