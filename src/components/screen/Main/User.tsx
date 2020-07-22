import { Animated, ImageSourcePropType } from 'react-native';
import React, { ReactElement, useRef, useState } from 'react';
import {
  SvgBarChart,
  SvgPackage,
  SvgPhone,
  SvgStar,
  SvgTruck,
  SvgUsers,
} from '../../../utils/icons';

import { Button } from 'dooboo-ui';
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

const BoxContainer = styled.View`
  justify-content: flex-start;
  flex-direction: row;
  margin-left: 20px;
  margin-right: 20px;
`;

const SubTitle = styled.Text`
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 24px;
  align-items: center;
  text-align: center;
  color: ${({ theme }): string => theme.grayFont};
`;

const WorksBoard = styled.View`
  width: 100%;
  height: 170px;
  background-color: ${({ theme }): string => theme.content};
  box-shadow: 0px 4px 15px ${({ theme }): string => theme.contentShadow};
  border-radius: 6px;
  justify-content: center;
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
        <BoxContainer>
          <WorksBoard>
            <SubTitle>{getString('EMPTY_INFORMATION')}</SubTitle>
            <Button
              text={getString('ADDITEM')}
              style={{
                width: 119,
                height: 36,
                backgroundColor: theme.btnBlue,
                borderRadius: 4,
              }}
              textStyle={{ fontSize: 14, color: theme.overlayFont }}
              onPress={(): void => {
                navigation.navigate('WorkspaceForm');
              }}
            />
          </WorksBoard>
        </BoxContainer>
      </Wrapper>
    </Container>
  );
};

export default User;
