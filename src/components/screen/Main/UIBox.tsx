import { Accordion, Button } from 'dooboo-ui';
import { Animated, ImageSourcePropType } from 'react-native';
import Table from '../../shared/dooboo/Tables';
import React, { ReactElement, useRef, useState } from 'react';
import {
  SvgBarChart,
  SvgPackage,
  SvgPhone,
  SvgStar,
  SvgTruck,
  SvgUsers,
} from '../../../utils/icons';

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
  flex: 1;
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

const accordionData = [
  {
    title: {
      name: 'Defualt-title-01',
    },
    bodies: [
      {
        name: 'Default body01',
      },
      {
        name: 'Default body02',
      },
    ],
  },
  {
    title: {
      name: 'Defualt-title-02',
    },
    bodies: [
      {
        name: 'Default body01',
      },
      {
        name: 'Default body02',
      },
    ],
  },
  {
    title: {
      name: 'Defualt-title-03',
    },
    bodies: [
      {
        name: 'Default body01',
      },
      {
        name: 'Default body02',
      },
    ],
  },
];

const tableData = [
  {
    id: 1,
    name: 'Frozen yogurt',
    type: 'Ice cream',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: 14,
    iron: 1,
  },
  {
    id: 2,
    name: 'Ice cream sandwhich',
    type: 'Ice cream',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: 8,
    iron: 1,
  },
  {
    id: 3,
    name: 'Eclair',
    type: 'Pastry',
    calories: 262,
    fat: 16.0,
    carbs: 37,
    protein: 6.0,
    sodium: 337,
    calcium: 6,
    iron: 7,
  },
  {
    id: 4,
    name: 'Cupcake',
    type: 'Pastry',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: 3,
    iron: 8,
  },
  {
    id: 5,
    name: 'Gingerbread',
    type: 'Pastry',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: 7,
    iron: 16,
  },
  {
    id: 6,
    name: 'Jelly bean',
    type: 'Other',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: 0,
    iron: 0,
  },
  {
    id: 7,
    name: 'Lollipop',
    type: 'Other',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0.0,
    sodium: 38,
    calcium: 0,
    iron: 2,
  },
  {
    id: 8,
    name: 'Honeycomb',
    type: 'Other',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: 0,
    iron: 45,
  },
  {
    id: 9,
    name: 'Donut',
    type: 'Pastry',
    calories: 52,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: 2,
    iron: 22,
  },
  {
    id: 10,
    name: 'KitKat',
    type: 'Other',
    calories: 16,
    fat: 6.0,
    carbs: 65,
    protein: 7.0,
    sodium: 54,
    calcium: 12,
    iron: 6,
  },
];

const UIBox: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { theme } = useThemeContext();
  const navigation = useNavigation();

  const arrayData = tableData;
  const customGroupData = [
    'ID',
    'NAME',
    'KIND',
    'CAL',
    'FAT',
    'CARBS',
    'PROTEIN',
    'SODIUM',
    'CALCIUM',
    'IRON',
  ];

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
        <Title style={{ margin: 20 }}>Accordion</Title>
        <BoxContainer>
          <Accordion
            data={accordionData}
            isAnimated={true}
            collapseOnStart={true}
            animDuration={400}
            activeOpacity={1}
            titleStyle={{
              color: 'white',
            }}
          />
        </BoxContainer>

        <Title style={{ margin: 20 }}>Table</Title>
        <Table
          customGroup={customGroupData}
          isCheckAble={true}
          data={arrayData}
          style={{
            borderRadius: 25,
          }}
        />
      </Wrapper>
    </Container>
  );
};

export default UIBox;
