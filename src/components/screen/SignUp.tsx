import { Button, EditText } from 'dooboo-ui';
import React, { ReactElement, useState } from 'react';
import {
  SignUpMutation,
  SignUpMutationResponse,
} from '../../__generated__/SignUpMutation.graphql';
import { graphql, useMutation } from 'react-relay/hooks';

import { AuthStackNavigationProps } from '../navigation/AuthNavigator';
import CheckBox from '../shared/CheckBox';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/theme';
import { validateEmail } from '../../utils/common';

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
  margin-bottom: 80px;
`;

const CheckBoxWrapper = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const CheckedText = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }): string => theme.font};
  margin-left: 8px;
  width: 420px;
`;

const ErrorText = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 15px;
  color: red;
  margin-bottom: 25px;
`;

interface Props {
  navigation: AuthStackNavigationProps<'SignUp'>;
}

const signUp = graphql`
  mutation SignUpMutation($email: String!, $password: String!) {
    signUp(user: { email: $email, password: $password }) {
      id
      email
      verified
    }
  }
`;

const SignUp = (props: Props): ReactElement => {
  const { theme } = useThemeContext();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState({
    first: '',
    second: '',
  });
  const [checked, setChecked] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [commitSignUp, isInFlight] = useMutation<SignUpMutation>(signUp);
  const mutationConfig = {
    variables: {
      email,
      password: password.first,
    },
    onCompleted: (response: SignUpMutationResponse): void => {
      const user = response.signUp;
      if (user && !user.verified) {
        props.navigation.navigate('ConfirmEmail');
      }
    },
    onError: (error: any): void => {
      console.error(error);
      setError(true);
    },
  };

  const handleSubmit = (): void => {
    if (!validateEmail(email)) return setError(true);
    if (!password.first || !password.second) return setError(true);
    if (password.first !== password.second) return setError(true);
    if (!checked) return setError(true);

    setError(false);

    commitSignUp(mutationConfig);
  };
  return (
    <Container>
      <ContentWrapper>
        <Title>{getString('SIGN_UP')}</Title>
        <EditText
          testID="input-email"
          style={{
            marginBottom: 25,
          }}
          textStyle={{
            fontSize: 16,
            lineHeight: 24,
            alignItems: 'center',
            color: theme.font,
          }}
          value={email}
          onChangeText={setEmail}
          placeholder="email@email.com"
          label={getString('EMAIL')}
          labelTextStyle={{
            fontWeight: 'bold',
            fontSize: 14,
            lineHeight: 21,
          }}
        />
        <EditText
          testID="input-password-first"
          style={{
            marginBottom: 25,
          }}
          textStyle={{
            fontSize: 16,
            lineHeight: 24,
            alignItems: 'center',
            color: theme.font,
          }}
          value={password.first}
          onChangeText={(text): void =>
            setPassword({ ...password, first: text })
          }
          secureTextEntry={true}
          placeholder={getString('PASSWORD')}
          label={getString('PASSWORD')}
          labelTextStyle={{
            fontWeight: 'bold',
            fontSize: 14,
            lineHeight: 21,
          }}
        />
        <EditText
          testID="input-password-second"
          style={{
            marginBottom: 25,
          }}
          textStyle={{
            fontSize: 16,
            lineHeight: 24,
            alignItems: 'center',
            color: theme.font,
          }}
          value={password.second}
          onChangeText={(text): void =>
            setPassword({ ...password, second: text })
          }
          secureTextEntry={true}
          placeholder={getString('PASSWORD_CONFIRM')}
          label={getString('PASSWORD_CONFIRM')}
          labelTextStyle={{
            fontWeight: 'bold',
            fontSize: 14,
            lineHeight: 21,
          }}
        />
        {error && (
          <ErrorText testID="text-error">
            {getString('ALERT_FAILED_SIGNIN')}
          </ErrorText>
        )}
        <CheckBoxWrapper>
          <CheckBox
            testID="checkbox-agreement"
            checked={checked}
            onChange={(): void => setChecked(!checked)}
          >
            <CheckedText numberOfLines={2}>
              {getString('SIGN_UP_AGREEMENT_CHECK')}
            </CheckedText>
          </CheckBox>
        </CheckBoxWrapper>
        <Button
          testID="btn-submit"
          style={{
            backgroundColor: theme.btnPrimary,
            borderRadius: 6,
            width: '100%',
            height: 46,
            alignItems: 'center',
            marginBottom: 25,
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

export default SignUp;
