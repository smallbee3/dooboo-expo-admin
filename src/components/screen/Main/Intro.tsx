import { Button } from 'dooboo-ui';
import React from 'react';
import { getString } from '../../../../STRINGS';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useThemeContext } from '@dooboo-ui/theme';

const Container = styled.View`
  width: 100%;
  background-color: ${({ theme }): string => theme.mainBackground};
  flex: 1;
`;

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  margin-bottom: 20px;
  font-weight: bold;
  color: ${({ theme }): string => theme.font};
  font-size: 24px;
  margin-top: 291px;
`;

const SubTitle = styled.Text`
  margin-bottom: 40px;
  font-size: 16px;
  line-height: 24px;
  align-items: center;
  text-align: center;
  color: ${({ theme }): string => theme.grayFont};
`;

const Intro: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useThemeContext();

  return (
    <Container>
      <Wrapper>
        <Title>{getString('INTRO_WELLCOME')}</Title>
        <SubTitle>{getString('INTRO_WELLCOME_COMMENT')}</SubTitle>
        <Button
          text={getString('SERVICE_APPLY')}
          style={{ backgroundColor: theme.btnBlue, borderRadius: 4 }}
          textStyle={{ color: theme.overlayFont }}
          onPress={(): void => {
            navigation.navigate('WorkspaceForm');
          }}
        />
      </Wrapper>
    </Container>
  );
};

export default Intro;
