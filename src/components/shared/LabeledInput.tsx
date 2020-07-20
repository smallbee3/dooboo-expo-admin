import React, { useRef } from 'react';

import { Input } from '../ui/Input';
import { TextInput } from 'react-native';
import styled from 'styled-components/native';

type Props = React.ComponentProps<typeof TextInput> & {
  labelStyle?: React.CSSProperties
}

const Container = styled.View<Props>`
  height: 100%;
  width: 100%;
`;

const InputLabel = styled.Text<Props>`
  position: absolute;
  top: 0;
  background-color: #444448;
  color: white;
  border-radius: 4px;
  width: ${({ multiline }): string => multiline ? '100%' : '150px'};
  height: 40px;
  line-height: 40px;
  font-weight: bold;
  text-align: center;
  z-index: 2;
  overflow: hidden;
`;

const CustomInput = styled(Input)<Props>`
  padding: 0 10px 0 160px;
  text-align: right;
  color: #609FFF;
  background-color: #fff;
  z-index: 1;

  ${({ multiline }): string => (multiline ? `
    padding: 60px 20px;
    height: 100%;
    color: #1B1B21;
    line-height: 18px;
    text-align: left;
  ` : '')};
`;

const LabeldInput: React.FC<Props> = ({ children, labelStyle, ...options }) => {
  const inputRef = useRef<TextInput>(null);

  return (
    <Container>
      <InputLabel
        multiline={options.multiline}
        onPress={(): void => inputRef?.current?.focus()}
        labelStyle={labelStyle}
      >
        {children}
      </InputLabel>
      <CustomInput ref={inputRef} {...options} />
    </Container>
  );
};

export default LabeldInput;
