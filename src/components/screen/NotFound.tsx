import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: ${({ theme }): string => theme.background};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-weight: bold;
  color: ${({ theme }): string => theme.font};
`;

const NotFound: React.FC = () => {
  return (
    <Container>
      <Title>404 Page</Title>
    </Container>
  );
};

export default NotFound;
