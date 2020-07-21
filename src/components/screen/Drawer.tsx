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

import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useThemeContext } from '@dooboo-ui/theme';

const DrawerWrapper = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
`;

const DrawerBlock = styled.View`
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

const MenuText = styled.Text`
  font-style: normal;
  font-weight: normal;
  color: ${({ theme }): string => theme.font};
`;

const MenuLabel = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 40px;
`;

const ImageStyled = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

type ItemType = {
  target: string;
  image: ImageSourcePropType;
};

const Drawer: React.FC = () => {
  const { theme, changeThemeType } = useThemeContext();
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
    <DrawerWrapper>
      <DrawerBlock>{renderLeftDesktopMenu()}</DrawerBlock>
    </DrawerWrapper>
  );
};

export default Drawer;
