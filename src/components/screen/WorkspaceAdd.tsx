import { Button, EditText } from 'dooboo-ui';

import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useThemeContext } from '@dooboo-ui/theme';

const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${({ theme }): string => theme.mainBackground};
`;

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.View`
  width: 386px;
`;

const InputWrapper = styled.View`
  flex-direction: row;
`;

const Title = styled.Text`
  margin-top: 100px;
  font-weight: bold;
  font-size: 32px;
  line-height: 44px;
  color: ${({ theme }): string => theme.font};
`;

const SubTitle = styled.Text`
  width: 138px;
  margin-top: 61px;
  margin-bottom: 20px;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
`;

const WorkspaceAdd: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useThemeContext();

  return (
    <ScrollView>
      <Container>
        <Wrapper>
          <Title>{getString('PRIME_SERVICE_APPLY')}</Title>
          <ContentWrapper>
            <SubTitle>{getString('USER_INFORMATION')}</SubTitle>
            <EditText
              style={{
                marginBottom: 25,
              }}
              textStyle={{
                fontSize: 16,
                lineHeight: 24,
                alignItems: 'center',
                color: theme.grayFont,
              }}
              value={''}
              placeholder={getString('REPRESENTATIVE')}
              label={getString('REPRESENTATIVE')}
              labelTextStyle={{
                color: theme.tint,
                fontWeight: 'bold',
                fontSize: 14,
                lineHeight: 21,
              }}
            />
            <EditText
              style={{
                marginBottom: 25,
              }}
              textStyle={{
                fontSize: 16,
                lineHeight: 24,
                alignItems: 'center',
                color: theme.grayFont,
              }}
              value={''}
              placeholder="prime@gmail.com"
              label={getString('EMAIL')}
              labelTextStyle={{
                color: theme.tint,
                fontWeight: 'bold',
                fontSize: 14,
                lineHeight: 21,
              }}
            />
            <EditText
              style={{
                marginBottom: 25,
              }}
              textStyle={{
                fontSize: 16,
                lineHeight: 24,
                alignItems: 'center',
                color: theme.grayFont,
              }}
              value={''}
              secureTextEntry={true}
              placeholder="01045671234"
              label={getString('PHONE')}
              labelTextStyle={{
                color: theme.tint,
                fontWeight: 'bold',
                fontSize: 14,
                lineHeight: 21,
              }}
            />
            <EditText
              style={{
                marginBottom: 25,
              }}
              textStyle={{
                fontSize: 16,
                lineHeight: 24,
                alignItems: 'center',
                color: theme.grayFont,
              }}
              value={''}
              secureTextEntry={true}
              placeholder="01023456789"
              label={getString('ADD_PHONE')}
              labelTextStyle={{
                color: theme.tint,
                fontWeight: 'bold',
                fontSize: 14,
                lineHeight: 21,
              }}
            />
            <SubTitle>{getString('COMPANY_INFORMATION')}</SubTitle>
            <InputWrapper>
              <EditText
                style={{
                  marginBottom: 25,
                }}
                textStyle={{
                  fontSize: 16,
                  lineHeight: 24,
                  alignItems: 'center',
                  color: theme.grayFont,
                }}
                value={''}
                placeholder={getString('DOOBOOLAB')}
                label={getString('COMPANY_NAME')}
                labelTextStyle={{
                  color: theme.tint,
                  fontWeight: 'bold',
                  fontSize: 14,
                  lineHeight: 21,
                }}
              />
              <EditText
                style={{
                  marginBottom: 25,
                }}
                textStyle={{
                  fontSize: 16,
                  lineHeight: 24,
                  alignItems: 'center',
                  color: theme.grayFont,
                }}
                value={''}
                placeholder={getString('GILDONG')}
                label={getString('REPRESENTATIVE')}
                labelTextStyle={{
                  color: theme.tint,
                  fontWeight: 'bold',
                  fontSize: 14,
                  lineHeight: 21,
                }}
              />
            </InputWrapper>
            <EditText
              style={{
                marginBottom: 25,
              }}
              textStyle={{
                fontSize: 16,
                lineHeight: 24,
                alignItems: 'center',
                color: theme.grayFont,
              }}
              value={''}
              placeholder="012345"
              label={getString('POST_CODE')}
              labelTextStyle={{
                color: theme.tint,
                fontWeight: 'bold',
                fontSize: 14,
                lineHeight: 21,
              }}
            />
            <EditText
              style={{
                marginBottom: 25,
              }}
              textStyle={{
                fontSize: 16,
                lineHeight: 24,
                alignItems: 'center',
                color: theme.grayFont,
              }}
              value={''}
              secureTextEntry={true}
              placeholder={getString('SAMPLE_ADDRESS')}
              label={getString('COMPANY_ADDRESS')}
              labelTextStyle={{
                color: theme.tint,
                fontWeight: 'bold',
                fontSize: 14,
                lineHeight: 21,
              }}
            />
            <EditText
              style={{
                marginBottom: 25,
              }}
              textStyle={{
                fontSize: 16,
                lineHeight: 24,
                alignItems: 'center',
                color: theme.grayFont,
              }}
              value={''}
              secureTextEntry={true}
              placeholder="1013456"
              label={getString('FAX_NUMBER')}
              labelTextStyle={{
                color: theme.tint,
                fontWeight: 'bold',
                fontSize: 14,
                lineHeight: 21,
              }}
            />
            <Button
              text={getString('SERVICE_APPLY')}
              style={{ backgroundColor: theme.btnBlue, borderRadius: 4 }}
              textStyle={{ color: theme.overlayFont }}
              onPress={(): void => {
                navigation.navigate('Workspace');
              }}
            />
          </ContentWrapper>
        </Wrapper>
      </Container>
    </ScrollView>
  );
};

export default WorkspaceAdd;
