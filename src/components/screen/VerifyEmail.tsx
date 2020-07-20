import {
  AuthStackNavigationProps,
  AuthStackParamList,
} from '../navigation/AuthNavigator';
import React, { FC } from 'react';
import {
  VerifyEmailMutation,
  VerifyEmailMutationResponse,
} from '../../__generated__/VerifyEmailMutation.graphql';
import { graphql, useMutation } from 'react-relay/hooks';

import { Button } from 'dooboo-ui';
import { RouteProp } from '@react-navigation/core';
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
  margin-top: 30px;
  margin-bottom: 30px;

  color: ${({ theme }): string => theme.font};
`;

const SubTitle = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 36px;
  text-align: center;
  margin-bottom: 40px;

  color: ${({ theme }): string => theme.font};
`;

interface Props {
  navigation: AuthStackNavigationProps<'VerifyEmail'>;
  route: RouteProp<AuthStackParamList, 'VerifyEmail'>;
}

const sendVerification = graphql`
  mutation VerifyEmailMutation($email: String!) {
    sendVerification(email: $email)
  }
`;

const Page: FC<Props> = ({ navigation, route }) => {
  const { theme } = useThemeContext();
  const [commitSendVerification, isInFlight] = useMutation<VerifyEmailMutation>(
    sendVerification,
  );
  const mutationConfig = {
    variables: {
      email: route.params.email,
    },
    onCompleted: (response: VerifyEmailMutationResponse): void => {
      if (response.sendVerification) return navigation.navigate('ConfirmEmail');
    },
    onError: (error: any): void => {
      console.error(error);
    },
  };
  const handleSubmit = (): void => {
    commitSendVerification(mutationConfig);
  };
  return (
    <Container>
      <ContentWrapper>
        <SvgLogoBig fill={theme.font} />
        <Title>{getString('VERIFY_EMAIL_GUIDE_TITLE')}</Title>
        <SubTitle>{getString('VERIFY_EMAIL_GUIDE_SUBTITLE')}</SubTitle>
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
          onPress={handleSubmit}
          text={getString('SEND_VERIFY_EMAIL')}
          isLoading={isInFlight}
        />
      </ContentWrapper>
    </Container>
  );
};

export default Page;
