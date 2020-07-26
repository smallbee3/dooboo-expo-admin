import React, { Suspense, useRef, useState } from 'react';
import { Animated } from 'react-native';
import SuspenseScreen from '../Suspense';
import TableBox from './TableBox';
import { getString } from '../../../../STRINGS';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
  width: 100%;
`;

const Title = styled.Text`
  font-weight: bold;
  font-style: normal;
  font-size: 24px;
  line-height: 34px;
  color: ${({ theme }): string => theme.title};
  margin: 20px;
`;

const Users: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
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
      <Title>회원목록</Title>
      <Suspense fallback={<SuspenseScreen />}>
        <TableBox></TableBox>
      </Suspense>
    </Container>
  );
};

export default Users;
