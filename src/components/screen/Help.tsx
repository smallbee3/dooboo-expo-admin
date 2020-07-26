import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: ${({ theme }): string => theme.whiteBackground};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-weight: bold;
  color: ${({ theme }): string => theme.font};
`;

const Help: React.FC = () => {
  return (
    <Container>
      <Title>Help Screen</Title>
    </Container>
  );
};

export default Help;
