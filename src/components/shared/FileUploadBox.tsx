import React, { ReactElement } from 'react';

import Button from '../shared/Button';
import { SvgUploadFile } from '../../utils/icons';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/theme';

const Container = styled.View`
  width: 100%;
  align-items: flex-end;
`;

const FileUploadableArea = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})`
  width: 100%;
  height: 132px;
  background: #f2f2f2;
  border: 0.8px dashed #bdbdbd;
  box-sizing: border-box;
  border-radius: 3px;
  margin-bottom: 10px;

  justify-content: center;
  align-items: center;
`;

const FileUploadBox = (): ReactElement => {
  const { theme } = useThemeContext();
  return (
    <Container>
      <FileUploadableArea>
        <SvgUploadFile />
      </FileUploadableArea>
      <Button
        type="tertiary"
        style={{ marginLeft: 10, marginBottom: 10 }}
        accentStyle={{ borderColor: theme.font, borderWidth: 1 }}
        text={getString('UPLOAD_FILE')}
        onPress={(): void => {
          console.log('Open the upload UI');
        }}
      />
    </Container>
  );
};

export default FileUploadBox;
