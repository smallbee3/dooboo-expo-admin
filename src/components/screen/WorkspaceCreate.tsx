import { Head1, Head3 } from '../shared/Typography';
import React, { useState } from 'react';

import Button from '../shared/Button';
import FileUploadBox from '../shared/FileUploadBox';
import { TextInput } from '../shared/TextInput';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }): string => theme.mainBackground};
`;

const ContentWrapper = styled.View`
  padding: 100px 0;
  width: 386px;
  align-self: center;
`;

const FormWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const InputWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
`;

const UploadAreaWrapper = styled.View`
  width: 100%;
  margin-bottom: 20px;
`;

const WorkspaceCreate: React.FC = () => {
  const navigation = useNavigation();
  const [managerName, setManagerName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [additionalPhone, setAdditionalPhone] = useState<string>('');
  const [businessRegistration, setBusinessRegistration] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [representative, setRepresentative] = useState<string>('');
  const [postCode, setPostCode] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [fax, setFax] = useState<string>('');

  const submitInfo = {
    managerName,
    email,
    phone,
    additionalPhone,
    companyName,
    representative,
    postCode,
    address,
    fax,
  };

  return (
    <Container>
      <ContentWrapper>
        <FormWrapper>
          <Head1 textStyle={{ textAlign: 'center' }}>
            {getString('PRIME_SERVICE_APPLY')}
          </Head1>
          <Head3>{getString('USER_INFORMATION')}</Head3>
          <TextInput
            value={managerName}
            onChangeText={setManagerName}
            placeholder={getString('REPRESENTATIVE')}
            labelText={getString('REPRESENTATIVE')}
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="prime@gmail.com"
            labelText={getString('EMAIL')}
          />
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="01045671234"
            labelText={getString('PHONE')}
          />
          <TextInput
            value={additionalPhone}
            onChangeText={setAdditionalPhone}
            placeholder="01023456789"
            labelText={getString('ADD_PHONE')}
            containerStyle={{ marginBottom: 60 }}
          />
          <Head3>{getString('COMPANY_INFORMATION')}</Head3>
          <InputWrapper>
            <TextInput
              value={businessRegistration}
              onChangeText={setBusinessRegistration}
              placeholder="101-345-6578"
              labelText={getString('BUSINESS_REGISTRATION')}
              containerStyle={{ marginRight: 11 }}
            />
            <Button
              type="secondary"
              text={getString('VERIFICATION')}
              onPress={(): void => {
                navigation.navigate('WorkspaceRoot');
              }}
              containerStyle={{ marginBottom: 30 }}
            />
          </InputWrapper>
          <UploadAreaWrapper>
            <FileUploadBox />
          </UploadAreaWrapper>
          <InputWrapper>
            <TextInput
              value={companyName}
              onChangeText={setCompanyName}
              placeholder={getString('DOOBOOLAB')}
              labelText={getString('COMPANY_NAME')}
            />
            <TextInput
              value={representative}
              onChangeText={setRepresentative}
              placeholder={getString('GILDONG')}
              labelText={getString('REPRESENTATIVE')}
              containerStyle={{ marginLeft: 11 }}
            />
          </InputWrapper>
          <TextInput
            value={postCode}
            onChangeText={setPostCode}
            placeholder="012345"
            labelText={getString('POST_CODE')}
          />
          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder={getString('SAMPLE_ADDRESS')}
            labelText={getString('COMPANY_ADDRESS')}
          />
          <TextInput
            value={fax}
            onChangeText={setFax}
            placeholder="1013456"
            labelText={getString('FAX_NUMBER')}
            containerStyle={{ marginBottom: 40 }}
          />
          <Button
            type="primary"
            text={getString('SERVICE_APPLY')}
            onPress={(): void =>
              console.log('Submit add workspace', submitInfo)
            }
            widthSize="large"
            heightSize="large"
            style={{ marginBottom: 20 }}
          />
        </FormWrapper>
      </ContentWrapper>
    </Container>
  );
};

export default WorkspaceCreate;
