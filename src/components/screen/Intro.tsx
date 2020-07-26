import * as WebBrowser from 'expo-web-browser';

import {
  IC_ALERT_TRIANGLE,
  IC_INTRO_BACKGROUND,
  SvgFacebook,
  SvgGoogle,
} from '../../utils/icons';
import {
  IntroSignInEmailMutation,
  IntroSignInEmailMutationResponse,
} from '../../__generated__/IntroSignInEmailMutation.graphql';
import {
  IntroSignInWithFacebookMutation,
  IntroSignInWithFacebookMutationResponse,
} from '../../__generated__/IntroSignInWithFacebookMutation.graphql';
import {
  IntroSignInWithGoogleMutation,
  IntroSignInWithGoogleMutationResponse,
} from '../../__generated__/IntroSignInWithGoogleMutation.graphql';
import React, { ReactElement, useState } from 'react';
import { facebookAppId, facebookSecret, googleClientId, googleSecret } from '../../../config';
import { graphql, useMutation } from 'react-relay/hooks';

import { AuthStackNavigationProps } from '../navigation/AuthNavigator';
import { Button } from 'dooboo-ui';
import CheckBox from '../shared/CheckBox';
import Hr from '../shared/Hr';
import { Input } from '../ui/Input';
import { SocialAuthProvider } from '../../types';
import SocialSignInButton from '../shared/SocialSignInButton';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useAppContext } from '../../providers/AppProvider';
import { useThemeContext } from '@dooboo-ui/theme';

interface Props {
  navigation: AuthStackNavigationProps<'Intro'>;
}

const Container = styled.View`
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  font-size: 30px;
  color: ${({ theme }):string => theme.overlayFont};
  margin-left: 40px;
`;

const Background = styled.ImageBackground`
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }): string => theme.overlay};
`;

const TitleContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;

const LoginFormContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.View`
  width: 100%;
  max-width: 384px;
  background-color: ${({ theme }):string => theme.overlayForm};
  border: 1px solid ${({ theme }):string => theme.overlayFormBorder};
  border-radius: 6px;
  padding: 50px 20px;
`;

const FormTitle = styled.Text`
  font-size: 36px;
  font-weight: bold;
  color: ${({ theme }):string => theme.overlayFont};
  margin: 0 auto 10px auto;
`;

const FormInput = styled(Input)`
  padding: 15px 30px;
  margin-bottom: 3px;
  background-color: rgba(255, 255, 255, 0.75);
`;

const CheckBoxLabel = styled.Text`
  color: ${({ theme }):string => theme.overlayFont};
  margin-right: 10px;
`;

const FormCheckBoxWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 22px;
`;

const FormCheckBox = styled.View`
  flex: 1;
`;

const LinkForgotPwd = styled.Text`
  flex: 1;
  color: ${({ theme }):string => theme.overlayFont};
  text-align: right;
  text-decoration-line: underline;
`;

const AlertWarning = styled.View`
  flex-direction: row;
  align-items: center;
  height: 40px;
  background-color: #FCEDE8;
  border-radius: 6px;
  margin-bottom: 10px;
  padding: 10px;
`;

const AlertWarningImage = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 7px;
`;

const AlertWarningText = styled.Text`
  color: #D84910; 
`;

const AlertWarningLink = styled.Text`
  flex: 1;
  text-align: right;
  text-decoration-line: underline;
  color: #D84910;
`;

const FormButton = styled(Button)`
  width: 100%;
  border-radius: 6px;
`;

const SocialButtons = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const SocialButton = styled.View``;

const LinkSignUpContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
`;

const LinkSignUp = styled.Text`
  color: ${({ theme }):string => theme.primary};
  font-weight: bold;
  text-align: right;
  text-decoration-line: underline;
`;

const NotUserMessage = styled.Text`
  color: ${({ theme }):string => theme.overlayFont};
  margin-right: 10px;
`;

const ErrorText = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 15px;
  color: red;
  margin-top: 10px;
`;

function checkEmail(asValue): boolean {
  // eslint-disable-next-line no-useless-escape
  const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return regExp.test(asValue);
}

const signInEmail = graphql`
  mutation IntroSignInEmailMutation($email: String!, $password: String!) {
    signInEmail(email:$email password:$password) {
      token
      user {
        id
        email
        verified
      }
    }
  }
`;

const signInWithFacebook = graphql`
  mutation IntroSignInWithFacebookMutation($accessToken: String!) {
  signInWithFacebook(accessToken: $accessToken) {
    token
    user {
      id
      email
      verified
    }
  }
}
`;

const signInWithGoogle = graphql`
  mutation IntroSignInWithGoogleMutation($accessToken: String!) {
  signInWithGoogle(accessToken: $accessToken) {
    token
    user {
      id
      email
      verified
    }
  }
}
`;

const Intro: React.FC<Props> = (props): ReactElement => {
  const { theme } = useThemeContext();
  const { setUser } = useAppContext();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [keepLoginState, setKeepLoginState] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [needVerification, setNeedVerification] = useState<boolean>(false);
  const [commitSignInEmail, isInFlightEmail] = useMutation<IntroSignInEmailMutation>(signInEmail);
  const [
    commitSignInWithFacebook,
    isInFlightWithFacebook,
  ] = useMutation<IntroSignInWithFacebookMutation>(signInWithFacebook);
  const [
    commitSignInWithGoogle,
    isInFlightWithGoogle,
  ] = useMutation<IntroSignInWithGoogleMutation>(signInWithGoogle);

  WebBrowser.maybeCompleteAuthSession();

  const handleSubmit = (): void => {
    if (!checkEmail(email)) return setError(true);

    setError(false);

    const mutationConfigEmail = {
      variables: {
        email,
        password,
      },
      onCompleted: async (response: IntroSignInEmailMutationResponse): Promise<void> => {
        const { user } = response.signInEmail;

        if (user && !user.verified) {
          setNeedVerification(true);
        }

        if (user && user.verified) {
          setUser(user);
        }
      },
      onError: (error: any): void => {
        console.error(error);
        setError(true);
      },
    };

    commitSignInEmail(mutationConfigEmail);
  };

  const handleSubmitFacebook = (accessToken): void => {
    const mutationConfigFacebook = {
      variables: { accessToken },
      onCompleted: async (
        response: IntroSignInWithFacebookMutationResponse,
      ): Promise<void> => {
        const { user } = response.signInWithFacebook;

        if (user && !user.verified) {
          return setNeedVerification(true);
        }

        if (user && user.verified) {
          return setUser(user);
        }
      },
      onError: (error: any): void => {
        console.error(error);
        setError(true);
      },
    };

    commitSignInWithFacebook(mutationConfigFacebook);
  };

  const handleSubmitGoogle = (accessToken): void => {
    const mutationConfigGoogle = {
      variables: { accessToken },
      onCompleted: async (response: IntroSignInWithGoogleMutationResponse): Promise<void> => {
        const { user } = response.signInWithGoogle;

        if (user && !user.verified) {
          return setNeedVerification(true);
        }

        if (user && user.verified) {
          return setUser(user);
        }
      },
      onError: (error: any): void => {
        console.error(error);
        setError(true);
      },
    };

    commitSignInWithGoogle(mutationConfigGoogle);
  };

  return (
    <Container>
      <Background
        source={IC_INTRO_BACKGROUND}
        imageStyle={{ opacity: 0.3 }}
      >
        <TitleContainer>
          <Title>{getString('APP_TITLE')}</Title>
        </TitleContainer>

        <LoginFormContainer>
          <LoginForm>
            <FormTitle>{getString('LOGIN')}</FormTitle>

            {needVerification && (
              <AlertWarning>
                <AlertWarningImage source={IC_ALERT_TRIANGLE} />
                <AlertWarningText>{getString('ALERT_NOT_VERIFICATION_EMAIL')}.</AlertWarningText>
                <AlertWarningLink
                  onPress={(): void => props.navigation.navigate('VerifyEmail', {
                    email,
                  })}
                >
                  {getString('VERIFY')}
                </AlertWarningLink>
              </AlertWarning>
            )}

            <FormInput
              placeholder={getString('USERNAME')}
              onChangeText={setEmail}
            />
            <FormInput
              secureTextEntry={true}
              placeholder={getString('PASSWORD')}
              onChangeText={setPassword}
            />

            {error && (
              <ErrorText testID="text-error">
                {getString('ALERT_FAILED_SIGNIN')}
              </ErrorText>
            )}

            <FormCheckBoxWrapper>
              <FormCheckBox>
                <CheckBox
                  checked={keepLoginState}
                  onChange={(): void => setKeepLoginState(!keepLoginState)}
                >
                  <CheckBoxLabel>{getString('KEEP_LOGIN_STATE')}</CheckBoxLabel>
                </CheckBox>
              </FormCheckBox>

              <LinkForgotPwd onPress={(): void => props.navigation.navigate('FindPassword')}>
                {getString('FORGOT_PASSWORD')}
              </LinkForgotPwd>
            </FormCheckBoxWrapper>

            <FormButton
              testID="login-btn"
              containerStyle={{ width: '100%', marginTop: 22 }}
              style={{
                height: 48,
                backgroundColor: theme.btnPrimary,
                maxWidth: 200,
              }}
              textStyle={{
                color: theme.btnPrimaryFont,
                fontSize: 14,
                fontWeight: 'bold',
              }}
              text={getString('LOGIN')}
              onPress={handleSubmit}
              isLoading={isInFlightEmail}
            />

            <Hr text="or" style={{ marginTop: 10, height: 21 }} />

            <SocialButtons>
              <SocialButton style={{ marginRight: 10 }}>
                <SocialSignInButton
                  clientId={facebookAppId}
                  clientSecret={facebookSecret}
                  svgIcon={<SvgFacebook width={18} height={18} fill={theme.facebookIcon}/>}
                  onUserCreated={(accessToken): void => {
                    if (accessToken) handleSubmitFacebook(accessToken);
                  }}
                  socialProvider={SocialAuthProvider.Facebook}
                />
              </SocialButton>

              <SocialButton style={{ marginLeft: 10 }}>
                <SocialSignInButton
                  clientId={googleClientId}
                  clientSecret={googleSecret}
                  svgIcon={<SvgGoogle width={20} height={20} fill={theme.googleIcon}/>}
                  onUserCreated={(accessToken): void => {
                    if (accessToken) handleSubmitGoogle(accessToken);
                  }}
                  socialProvider={SocialAuthProvider.Google}
                />
              </SocialButton>
            </SocialButtons>

            <LinkSignUpContainer>
              <NotUserMessage>{getString('NOT_USER_MESSAGE')}</NotUserMessage>
              <LinkSignUp onPress={(): void => props.navigation.navigate('SignUp')}>{getString('SIGN_UP')}</LinkSignUp>
            </LinkSignUpContainer>
          </LoginForm>
        </LoginFormContainer>
      </Background>
    </Container>
  );
};

export default Intro;
