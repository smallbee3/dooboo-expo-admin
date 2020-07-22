import React, { ReactElement, useRef, useState } from 'react';
import { IC_SEARCH_MAGNIFIER } from '../../../utils/icons';
import SearchInput from '../../shared/dooboo/SearchInput';
import styled from 'styled-components/native';

const SearchInputContainer = styled.View`
  margin-bottom: 50;
  width: 100%;
`;

const MagContainer = styled.View`
  height: 100%;
  width: 13%;
  justify-content: center;
  align-items: center;
  background-color: #6DA6FC;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
`;

const Magnifier = styled.Image`
  width: 22px;
  height: 22px;
`;

export default function SearchInputBox(): ReactElement {
  const [value, setValue] = useState<string>('');

  return (
    <SearchInputContainer>
      <SearchInput
        value={value}
        containerStyle={{
          borderColor: '#E0E0E0',
          backgroundColor: 'white',
          flexDirection: 'row-reverse',
          borderRadius: 3,
          height: '40px',
          width: '367px',
        }}
        inputStyle={{
          color: 'black',
          paddingLeft: 10,
          fontSize: 14,
        }}
        focusColor="#109CF1"
        placeholder="검색어를 입력하세요."
        placeholderTextColor={'#BDBDBD'}
        customIcon={
          <MagContainer>
            <Magnifier source={IC_SEARCH_MAGNIFIER} />
          </MagContainer>
        }
        debounceDelay={400}
        onDebounceOrOnReset={(str): void => {
          setValue(str);
        }}
      />
    </SearchInputContainer>
  );
}
