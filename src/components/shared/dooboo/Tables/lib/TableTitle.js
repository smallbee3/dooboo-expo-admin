var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
var Container = styled.View(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: ", ";\n  flex-direction: row;\n  align-content: center;\n"], ["\n  width: ", ";\n  flex-direction: row;\n  align-content: center;\n"])), function (_a) {
    var isCheckAble = _a.isCheckAble;
    return (isCheckAble ? '50px' : '100px');
});
var StyledText = styled.Text(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 100%;\n  height: 24px;\n  line-height: 24px;\n  font-size: 12px;\n  align-items: center;\n  text-align: center;\n"], ["\n  width: 100%;\n  height: 24px;\n  line-height: 24px;\n  font-size: 12px;\n  align-items: center;\n  text-align: center;\n"])));
function TableTitle(props) {
    var isCheckAble = props.isCheckAble, children = props.children, onPress = props.onPress, titleStyle = props.titleStyle, numberOfLines = props.numberOfLines;
    return (<TouchableWithoutFeedback testID="table-title-test-id" disabled={!onPress} onPress={onPress}>
      <Container isCheckAble={isCheckAble} style={[{ paddingVertical: 12 }, titleStyle]}>
        <StyledText numberOfLines={numberOfLines}>{children}</StyledText>
      </Container>
    </TouchableWithoutFeedback>);
}
export default TableTitle;
var templateObject_1, templateObject_2;
