import { Button, EditText } from 'dooboo-ui';
import {
  FindPasswordMutation,
  FindPasswordMutationResponse,
} from '../../__generated__/FindPasswordMutation.graphql';
import React, { ReactElement, useState } from 'react';
import { graphql, useMutation } from 'react-relay/hooks';

import { AuthStackNavigationProps } from '../navigation/AuthNavigator';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/theme';
import { validateEmail } from '../../utils/common';

interface Props {
  navigation: AuthStackNavigationProps<'FindPassword'>;
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }): string => theme.background};
`;

const ContentWrapper = styled.View`
  width: 528px;
`;

const Title = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 53px;

  color: ${({ theme }): string => theme.font};

  width: 100%;
  text-align: center;
  margin-bottom: 18px;
`;

const SubTitle = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 36px;

  align-items: center;
  text-align: center;
  margin-bottom: 59px;

  color: ${({ theme }): string => theme.font};
`;

const signUp = graphql`
  mutation FindPasswordMutation($email: String!) {
    findPassword(email: $email)
  }
`;

const ResetPassword = (props: Props): ReactElement => {
  const { theme } = useThemeContext();
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [commitSignUp, isInFlight] = useMutation<FindPasswordMutation>(signUp);
  const mutationConfig = {
    variables: {
      email,
    },
    onCompleted: (response: FindPasswordMutationResponse): void => {
      if (response.findPassword) {
        return props.navigation.navigate('ConfirmEmail');
      }
    },
    onError: (error: any): void => {
      console.error(error);
      setError(getString('ALERT_FAILED_FIND_PASSWORD'));
    },
  };

  const handleChangeEmail = (text: string): void => {
    if (text === '') setError('');
    setEmail(text);
  };

  const handleSubmit = (): void => {
    if (!validateEmail(email)) {
      return setError(getString('ALERT_FAILED_FIND_PASSWORD'));
    }

    setError('');

    commitSignUp(mutationConfig);
  };
  return (
    <Container>
      <ContentWrapper>
        <Title>{getString('RESET_PASSWORD')}</Title>
        <SubTitle>{getString('ENTER_EMAIL_FOR_TEMPORARY_PASSWORD')}</SubTitle>
        <EditText
          testID="input-email"
          style={{
            marginBottom: 65,
          }}
          textStyle={{
            fontSize: 16,
            lineHeight: 24,
            alignItems: 'center',
            color: theme.font,
          }}
          value={email}
          onChangeText={handleChangeEmail}
          placeholder={getString('EMAIL')}
          label={getString('EMAIL')}
          labelTextStyle={{
            fontWeight: 'bold',
            fontSize: 14,
            lineHeight: 21,
          }}
          errorText={error}
        />
        <Button
          testID="btn-submit"
          style={{
            backgroundColor: theme.btnPrimary,
            borderRadius: 6,
            width: '100%',
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
          text={getString('VERIFY_EMAIL')}
          isLoading={isInFlight}
        />
      </ContentWrapper>
    </Container>
  );
};

export default ResetPassword;
