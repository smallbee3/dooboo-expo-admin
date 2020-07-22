var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
var CheckView = styled.View(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 20px;\n  width: 20px;\n  border-width: 2px;\n  border-radius: 2px;\n  border-color: #d5d5d5;\n  align-items: center;\n  justify-content: center;\n  background-color: ", ";\n"], ["\n  height: 20px;\n  width: 20px;\n  border-width: 2px;\n  border-radius: 2px;\n  border-color: #d5d5d5;\n  align-items: center;\n  justify-content: center;\n  background-color: ",
    ";\n"])), function (_a) {
    var checked = _a.checked;
    return !checked ? '#ffffff' : '#d5d5d5';
});
var CheckMark = styled.Image(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 14px;\n  height: 14px;\n"], ["\n  width: 14px;\n  height: 14px;\n"])));
function CheckBox(props) {
    var value = props.value, onClick = props.onClick;
    return (<TouchableOpacity testID="checkbox-test-id" onPress={onClick}>
      <CheckView checked={value}>
        <CheckMark source={require('../__assets__/mark.png')}/>
      </CheckView>
    </TouchableOpacity>);
}
export default CheckBox;
var templateObject_1, templateObject_2;
