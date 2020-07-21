import * as WebBrowser from 'expo-web-browser';

import { Button, EditText } from 'dooboo-ui';
import {
  HomeSignInEmailMutation,
  HomeSignInEmailMutationResponse,
} from '../../__generated__/HomeSignInEmailMutation.graphql';
import {
  HomeSignInWithFacebookMutation,
  HomeSignInWithFacebookMutationResponse,
} from '../../__generated__/HomeSignInWithFacebookMutation.graphql';
import {
  HomeSignInWithGoogleMutation,
  HomeSignInWithGoogleMutationResponse,
} from '../../__generated__/HomeSignInWithGoogleMutation.graphql';
import {
  IC_ALERT_TRIANGLE,
  IC_INTRO_BACKGROUND,
  SvgFacebook,
  SvgGoogle,
} from '../../utils/icons';
import React, { ReactElement, useEffect, useState } from 'react';
import {
  facebookAppId,
  facebookSecret,
  googleClientId,
  googleSecret,
} from '../../../config';
import { graphql, useMutation } from 'react-relay/hooks';

import { AuthStackNavigationProps } from '../navigation/AuthNavigator';
import CheckBox from '../shared/CheckBox';
import Hr from '../shared/Hr';
import { Input } from '../ui/Input';
import { SocialAuthProvider } from '../../types';
import SocialSignInButton from '../shared/SocialSignInButton';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useAppContext } from '../../providers/AppProvider';
import { useThemeContext } from '@dooboo-ui/theme';
import { validateEmail } from '../../utils/common';

interface Props {
  navigation: AuthStackNavigationProps<'Home'>;
}

const Container = styled.ImageBackground.attrs({
  source: IC_INTRO_BACKGROUND,
  imageStyle: { opacity: 0.3 },
})`
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }): string => theme.overlay};
`;

const MainTitle = styled.Text`
  font-style: normal;
  font-weight: 300;
  font-size: 32px;
  line-height: 47px;

  color: ${({ theme }): string => theme.overlayFont};
`;

const LeftContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  padding-left: 40px;
`;

const RightContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
  padding-right: 40px;
`;

const LoginFormWrapper = styled.View`
  width: 384px;
  background-color: ${({ theme }): string => theme.overlayForm};
  border: 1px solid ${({ theme }): string => theme.overlayFormBorder};
  border-radius: 6px;
  padding: 50px 20px;
`;

const LoginFormTitle = styled.Text`
  font-size: 36px;
  font-weight: bold;
  color: ${({ theme }): string => theme.overlayFont};
  text-align: center;
  margin-bottom: 60px;
`;

const LoginFormOptionWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
`;

const CheckBoxLabel = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;

  margin-right: 10px;

  color: ${({ theme }): string => theme.overlayFont};
`;

const ForgetPasswordLinkedText = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;

  text-decoration-line: underline;

  color: ${({ theme }): string => theme.overlayFont};
`;

const AlertWarning = styled.View`
  flex-direction: row;
  align-items: center;
  height: 40px;
  background-color: #fcede8;
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
  color: #d84910;
`;

const AlertWarningLink = styled.Text`
  flex: 1;
  text-align: right;
  text-decoration-line: underline;
  color: #d84910;
`;

const SocialLoginWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const SignUpLinkWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const SignUpLinkedText = styled.Text`
  color: ${({ theme }): string => theme.primary};
  font-weight: bold;
  text-align: right;
  text-decoration-line: underline;
`;

const StyledText = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;

  margin-right: 10px;

  color: ${({ theme }): string => theme.overlayFont};
`;

const ErrorText = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 15px;
  color: red;
  margin-top: 10px;
`;

const signInEmail = graphql`
  mutation HomeSignInEmailMutation($email: String!, $password: String!) {
    signInEmail(email: $email, password: $password) {
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
  mutation HomeSignInWithFacebookMutation($accessToken: String!) {
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
  mutation HomeSignInWithGoogleMutation($accessToken: String!) {
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

const Home: React.FC<Props> = (props): ReactElement => {
  const { theme } = useThemeContext();
  const { setUser } = useAppContext();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [keepLoginState, setKeepLoginState] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [needVerification, setNeedVerification] = useState<boolean>(false);

  const [commitSignInEmail, isInFlightEmail] = useMutation<
    HomeSignInEmailMutation
  >(signInEmail);
  const [commitSignInWithFacebook, isInFlightWithFacebook] = useMutation<
    HomeSignInWithFacebookMutation
  >(signInWithFacebook);
  const [commitSignInWithGoogle, isInFlightWithGoogle] = useMutation<
    HomeSignInWithGoogleMutation
  >(signInWithGoogle);

  const handleSubmit = (): void => {
    if (!validateEmail(email)) return setError(true);

    setError(false);

    const mutationConfigEmail = {
      variables: {
        email,
        password,
      },
      onCompleted: async (
        response: HomeSignInEmailMutationResponse,
      ): Promise<void> => {
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
        response: HomeSignInWithFacebookMutationResponse,
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
      onCompleted: async (
        response: HomeSignInWithGoogleMutationResponse,
      ): Promise<void> => {
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

  const renderVerificationAlert = (): ReactElement => {
    return (
      <AlertWarning>
        <AlertWarningImage source={IC_ALERT_TRIANGLE} />
        <AlertWarningText>
          {getString('ALERT_NOT_VERIFICATION_EMAIL')}.
        </AlertWarningText>
        <AlertWarningLink
          onPress={(): void =>
            props.navigation.navigate('VerifyEmail', {
              email,
            })
          }
        >
          {getString('VERIFY')}
        </AlertWarningLink>
      </AlertWarning>
    );
  };

  useEffect(() => {
    WebBrowser.maybeCompleteAuthSession();
  }, []);

  return (
    <Container>
      <LeftContainer>
        <MainTitle>{getString('APP_TITLE')}</MainTitle>
        <Button
          testID="login-btn"
          style={{
            borderRadius: 6,
            width: 150,
            height: 40,
            alignItems: 'center',
            marginBottom: 20,
            backgroundColor: theme.overlayForm,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: theme.overlayFormBorder,
            marginTop: 20,
          }}
          textStyle={{
            fontSize: 14,
            fontWeight: 'bold',
            color: theme.btnPrimaryFont,
            lineHeight: 21,
            letterSpacing: -0.5,
          }}
          onPress={(): void => props.navigation.navigate('MainBoard')}
          text="둘러보기"
          isLoading={isInFlightEmail}
        />
      </LeftContainer>

      <RightContainer>
        <LoginFormWrapper>
          <LoginFormTitle>{getString('LOGIN')}</LoginFormTitle>

          {needVerification && renderVerificationAlert()}

          <EditText
            testID="input-email"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              height: 56,
              marginBottom: 10,
            }}
            textStyle={{
              paddingLeft: 15,
              fontSize: 16,
              lineHeight: 24,
              alignItems: 'center',
            }}
            labelTextStyle={{
              fontWeight: 'bold',
              fontSize: 14,
              lineHeight: 21,
            }}
            value={email}
            onChangeText={setEmail}
            placeholder={getString('USERNAME')}
          />

          <EditText
            testID="input-password"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              height: 56,
              marginBottom: 22,
            }}
            textStyle={{
              paddingLeft: 15,
              fontSize: 16,
              lineHeight: 24,
              alignItems: 'center',
            }}
            labelTextStyle={{
              fontWeight: 'bold',
              fontSize: 14,
              lineHeight: 21,
            }}
            value={password}
            secureTextEntry={true}
            placeholder={getString('PASSWORD')}
            onChangeText={setPassword}
          />

          {error && (
            <ErrorText testID="text-error">
              {getString('ALERT_FAILED_SIGNIN')}
            </ErrorText>
          )}

          <LoginFormOptionWrapper>
            <CheckBox
              checked={keepLoginState}
              onChange={(): void => setKeepLoginState(!keepLoginState)}
            >
              <CheckBoxLabel>{getString('KEEP_LOGIN_STATE')}</CheckBoxLabel>
            </CheckBox>

            <ForgetPasswordLinkedText
              onPress={(): void => props.navigation.navigate('FindPassword')}
            >
              {getString('FORGOT_PASSWORD')}
            </ForgetPasswordLinkedText>
          </LoginFormOptionWrapper>

          <Button
            testID="login-btn"
            style={{
              backgroundColor: theme.btnPrimary,
              borderRadius: 6,
              width: 200,
              height: 48,
              alignItems: 'center',
              marginBottom: 20,
            }}
            textStyle={{
              fontSize: 14,
              fontWeight: 'bold',
              color: theme.btnPrimaryFont,
              lineHeight: 21,
              letterSpacing: -0.5,
            }}
            onPress={handleSubmit}
            text={getString('LOGIN')}
            isLoading={isInFlightEmail}
          />

          <Hr text="or" style={{ height: 21 }} />

          <SocialLoginWrapper>
            <Button
              testID="login-btn"
              style={{
                backgroundColor: theme.googleBackground,
                borderRadius: 6,
                width: 162,
                height: 48,
              }}
              textStyle={{
                fontSize: 14,
                fontWeight: 'bold',
                color: theme.btnPrimaryFont,
                lineHeight: 21,
                letterSpacing: -0.5,
              }}
              leftElement={
                <SvgGoogle
                  width={20}
                  height={20}
                  style={{ marginRight: 6 }}
                  fill="#fff"
                />
              }
              onPress={(): void => console.log('signin with google')}
              text={getString('SIGN_IN_WITH_GOOGLE')}
              isLoading={isInFlightWithGoogle}
            />
            <Button
              testID="login-btn"
              style={{
                backgroundColor: theme.facebookBackground,
                borderRadius: 6,
                width: 162,
                height: 48,
              }}
              textStyle={{
                fontSize: 14,
                fontWeight: 'bold',
                color: theme.btnPrimaryFont,
                lineHeight: 21,
                letterSpacing: -0.5,
              }}
              leftElement={
                <SvgFacebook
                  width={20}
                  height={20}
                  style={{ marginRight: 6 }}
                  fill="#fff"
                />
              }
              onPress={(): void => console.log('signin with facebook')}
              text={getString('SIGN_IN_WITH_FACEBOOK')}
              isLoading={isInFlightWithFacebook}
            />
          </SocialLoginWrapper>

          <SignUpLinkWrapper>
            <StyledText>{getString('NOT_USER_MESSAGE')}</StyledText>
            <SignUpLinkedText
              onPress={(): void => props.navigation.navigate('SignUp')}
            >
              {getString('SIGN_UP')}
            </SignUpLinkedText>
          </SignUpLinkWrapper>
        </LoginFormWrapper>
      </RightContainer>
    </Container>
  );
};

export default Home;
