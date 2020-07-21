import { Text, ViewStyle } from 'react-native';

import React from 'react';
import styled from 'styled-components/native';

interface Props {
  style?: ViewStyle,
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Dropdown: React.FC<Props> = ({ style }) => {
  return (
    <Container style={style}>
      <Text>dropdown</Text>
    </Container>
  );
};

export default Dropdown;
