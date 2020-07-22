var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from 'react';
import styled from 'styled-components/native';
var Container = styled.View(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: ", ";\n  flex-direction: row;\n  align-items: center;\n"], ["\n  width: ", ";\n  flex-direction: row;\n  align-items: center;\n"])), function (_a) {
    var isShort = _a.isShort;
    return (isShort ? '50px' : '100px');
});
var StyledText = styled.Text(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 100%;\n  height: 24px;\n  line-height: 24px;\n  font-size: 12px;\n  align-items: center;\n  text-align: center;\n"], ["\n  width: 100%;\n  height: 24px;\n  line-height: 24px;\n  font-size: 12px;\n  align-items: center;\n  text-align: center;\n"])));
function TableCell(props) {
    var children = props.children, cellStyle = props.cellStyle, isShort = props.isShort;
    return (<Container testID="table-cell-test-id" isShort={isShort} style={[{ paddingVertical: 12 }, cellStyle]}>
      <StyledText numberOfLines={2}>{children}</StyledText>
    </Container>);
}
export default TableCell;
var templateObject_1, templateObject_2;
