import React from 'react';
import { ViewStyle } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  style?: ViewStyle,
  text?: string;
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Left = styled.View`
  flex: 1;
  justify-content: center;
`;

const Right = styled.View`
  flex: 1;
  justify-content: center;
`;

const CenterText = styled.Text`
  color: #D1D1D1;
  padding: 5px;
`;

const Line = styled.View`
  height: 1px;
  background-color: #D1D1D1;
`;

const Hr: React.FC<Props> = ({ style, text }) => {
  return (
    <Container style={style}>
      <Left>
        <Line />
      </Left>

      <CenterText>{text}</CenterText>

      <Right>
        <Line />
      </Right>
    </Container>
  );
};

export default Hr;
