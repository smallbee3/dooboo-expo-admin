import React, { FC } from 'react';

import { AuthStackNavigationProps } from '../navigation/AuthNavigator';
import { Button } from 'dooboo-ui';
import { SvgLogoBig } from '../../utils/icons';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/theme';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }): string => theme.background};
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.View`
  width: 528px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 47px;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 20px;

  color: ${({ theme }): string => theme.logo};
`;

const SubTitle = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 36px;
  text-align: center;
  margin-bottom: 65px;

  color: ${({ theme }): string => theme.font};
`;

interface Props {
  navigation: AuthStackNavigationProps<'FindPassword'>;
}

const Page: FC<Props> = ({ navigation }) => {
  const { theme } = useThemeContext();
  return (
    <Container>
      <ContentWrapper>
        <SvgLogoBig fill={theme.font} />
        <Title>{getString('COMPLETE_EMAIL_SEND_TITLE')}</Title>
        <SubTitle>{getString('COMPLETE_EMAIL_SEND_SUBTITLE')}</SubTitle>
        <Button
          testID="btn-submit"
          style={{
            backgroundColor: theme.btnPrimary,
            borderRadius: 6,
            width: 200,
            height: 48,
            alignItems: 'center',
          }}
          textStyle={{
            fontSize: 14,
            fontWeight: 'bold',
            color: theme.btnPrimaryFont,
            lineHeight: 21,
            letterSpacing: -0.5,
          }}
          onPress={(): void => navigation.navigate('Home')}
          text={getString('LOGIN')}
        />
      </ContentWrapper>
    </Container>
  );
};

export default Page;
