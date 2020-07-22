import { Animated, ImageSourcePropType } from 'react-native';
import React, { ReactElement, useRef, useState } from 'react';

import { Button } from 'dooboo-ui';
import SearchInputBox from './SearchInputBox';
import TableBox from './TableBox';
import { getString } from '../../../../STRINGS';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useThemeContext } from '@dooboo-ui/theme';

const Container = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
`;

const Wrapper = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-weight: bold;
  font-style: normal;
  font-size: 24px;
  line-height: 34px;
  color: ${({ theme }): string => theme.title};
`;

const User: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { theme } = useThemeContext();
  const navigation = useNavigation();

  const fadeOut = (): void => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setToggle(!toggle);
  };

  const linkTo = (link: string): void => {
    setToggle(!toggle);
    fadeOut();
    navigation.navigate(link);
  };

  return (
    <Container>
      <Wrapper>
        <Title style={{ margin: 20 }}>회원목록</Title>

        <SearchInputBox />

        <TableBox />
      </Wrapper>
    </Container>
  );
};

export default User;
