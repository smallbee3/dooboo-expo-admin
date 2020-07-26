import React, { ReactElement } from 'react';

import { TextStyle } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  children: string | null;
  textStyle?: TextStyle;
}

const StyledHead1 = styled.Text`
  font-weight: normal;
  font-size: 32px;
  line-height: 44px;
  margin-bottom: 60px;
  text-align: auto;
  color: ${({ theme }): string => theme.font};
`;

const StyledHead2 = styled(StyledHead1)`
  font-size: 24px;
  line-height: 34px;
  margin-bottom: 20px;
`;

const StyledHead3 = styled(StyledHead1)`
  font-size: 20px;
  line-height: 30px;
  margin-bottom: 20px;
`;

export const Head1 = (props: Props): ReactElement => {
  return <StyledHead1 style={props.textStyle}>{props.children}</StyledHead1>;
};

export const Head2 = (props: Props): ReactElement => {
  return <StyledHead2 style={props.textStyle}>{props.children}</StyledHead2>;
};

export const Head3 = (props: Props): ReactElement => {
  return <StyledHead3 style={props.textStyle}>{props.children}</StyledHead3>;
};
