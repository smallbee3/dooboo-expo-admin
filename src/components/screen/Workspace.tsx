import { Animated, ImageSourcePropType } from 'react-native';
import {
  IC_BAR_CHART,
  IC_PACKAGE,
  IC_PHONE,
  IC_STAR,
  IC_TRUCK,
  IC_USERS,
} from '../../utils/icons';
import React, { ReactElement, useRef, useState } from 'react';

import { Button } from 'dooboo-ui';
import { getString } from '../../../STRINGS';
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

const ContentWrapper = styled.View`
  height: 100%;
  background-color: ${({ theme }): string => theme.content};
`;

const MenuWrapper = styled.View`
  justify-content: flex-start;
  flex-direction: column;
`;

const MenuItem = styled.TouchableOpacity`
  background-color: ${({ theme }): string => theme.content};
  width: 223px;
  height: 56px;
  justify-content: center;
  font-size: 16px;
`;

const MenuLabel = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 40px;
`;

const MenuText = styled.Text`
  font-style: normal;
  font-weight: normal;
  color: ${({ theme }): string => theme.font};
`;

const ImageStyled = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 10px;
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

type ItemType = {
  target: string;
  image: ImageSourcePropType;
};

const Workspace: React.FC = () => {
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

  const menuItem: Array<Record<string, Required<ItemType>>> = [
    { Account: { target: getString('ACCOUNT'), image: IC_STAR } },
    { Client: { target: getString('CLIENT'), image: IC_USERS } },
    { Products: { target: getString('PRODUCT'), image: IC_PACKAGE } },
    {
      Order_Delivery: { target: getString('ORDER_DELIVERY'), image: IC_TRUCK },
    },
    { CS: { target: getString('CS'), image: IC_PHONE } },
    { Statistic: { target: getString('STATISTIC'), image: IC_BAR_CHART } },
  ];

  const renderLeftDesktopMenu = (): ReactElement => {
    return (
      <MenuWrapper>
        {menuItem.map((item, index) => {
          return (
            <MenuItem
              key={index}
              onPress={(): void => linkTo(Object.keys(item)[0])}
            >
              <MenuLabel>
                <ImageStyled source={Object.values(item)[0].image} />
                <MenuText>{Object.values(item)[0].target}</MenuText>
              </MenuLabel>
            </MenuItem>
          );
        })}
      </MenuWrapper>
    );
  };

  return (
    <Container>
      <ContentWrapper>{renderLeftDesktopMenu()}</ContentWrapper>
      <Wrapper>
        <Title style={{ margin: 20 }}>{getString('BOOKMARK')}</Title>
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
                navigation.navigate('WorkspaceAdd');
              }}
            />
          </WorksBoard>
        </BoxContainer>
        <Title style={{ margin: 20 }}>{getString('STATUS')}</Title>
        <BoxContainer>
          <WorksBoard style={{ height: 245 }}>
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
                navigation.navigate('WorkspaceAdd');
              }}
            />
          </WorksBoard>
        </BoxContainer>
      </Wrapper>
    </Container>
  );
};

export default Workspace;
