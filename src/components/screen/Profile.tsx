import React from 'react';

import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${({ theme }): string => theme.mainBackground};
`;

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  width: 97px;
  height: 30px;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
  color: ${({ theme }): string => theme.font};
`;

const Profile: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <Title>{getString('PROFILE_IMAGE')}</Title>
      </Wrapper>
    </Container>
  );
};

export default Profile;
