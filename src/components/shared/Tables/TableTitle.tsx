import * as React from 'react';

import { StyleProp, TouchableWithoutFeedback, ViewStyle } from 'react-native';

import styled from 'styled-components/native';

type Props = React.ComponentPropsWithRef<typeof TouchableWithoutFeedback> & {
  children?: React.ReactNode;
  numberOfLines?: number;
  onPress?: () => void;
  isShort?: boolean;
  titleStyle?: StyleProp<ViewStyle>;
};

const Container = styled.View<{ isShort?: boolean }>`
  width: ${({ isShort }): string => (isShort ? '50px' : '125px')};
  flex-direction: row;
  align-content: center;
`;
const StyledText = styled.Text`
  width: 100%;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  align-items: center;
  text-align: center;
  font-weight: 800;
`;

function TableTitle(props: Props): React.ReactElement {
  const { isShort, children, onPress, titleStyle, numberOfLines } = props;

  return (
    <TouchableWithoutFeedback
      testID="table-title-test-id"
      disabled={!onPress}
      onPress={onPress}>
      <Container
        isShort={isShort}
        style={[{ paddingVertical: 12 }, titleStyle]}>
        <StyledText numberOfLines={numberOfLines}>{children}</StyledText>
      </Container>
    </TouchableWithoutFeedback>
  );
}

export default TableTitle;
