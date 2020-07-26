import React, { ReactElement } from 'react';

import { TextStyle } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  children: string;
  textStyle?: TextStyle;
}

const StyledTitle = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;

  text-align: center;
  margin-bottom: 40px;

  color: ${({ theme }): string => theme.grayFont};
`;

const Title = (props: Props): ReactElement => {
  return <StyledTitle style={props.textStyle}>{props.children}</StyledTitle>;
};

export default Title;
