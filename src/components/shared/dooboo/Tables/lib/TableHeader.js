var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from 'react';
import styled from 'styled-components/native';
var HeaderContainer = styled.View(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex-direction: row;\n  height: 48px;\n  border-bottom-width: 1px;\n  border-bottom-color: lightgray;\n"], ["\n  flex-direction: row;\n  height: 48px;\n  border-bottom-width: 1px;\n  border-bottom-color: lightgray;\n"])));
function TableHeader(props) {
    var children = props.children, headerStyle = props.headerStyle;
    return (<HeaderContainer style={[headerStyle]} testID="table-header-test-id">
      {children}
    </HeaderContainer>);
}
export default TableHeader;
var templateObject_1;
