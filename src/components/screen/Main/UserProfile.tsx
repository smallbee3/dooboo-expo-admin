import React from 'react';
import { getString } from '../../../../STRINGS';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${({ theme }): string => theme.mainBackground};
`;

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: ${({ theme }): string => theme.font};
`;

const UserProfile: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <Title>{getString('PROFILE_IMAGE')}</Title>
      </Wrapper>
    </Container>
  );
};

export default UserProfile;
