import { Animated, ImageSourcePropType } from 'react-native';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import {
  UsersQuery,
  UsersQueryResponse,
} from '../../../__generated__/UsersQuery.graphql';

import { graphql, useQuery } from 'relay-hooks';
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

const usersQuery = graphql`
  query UsersQuery(
    $size: Int!
    $buttonNum: Int!
    $currentPage: Int
    $cursor: String
  ) {
    users(
      size: $size
      buttonNum: $buttonNum
      currentPage: $currentPage
      cursor: $cursor
    ) {
      pageEdges {
        cursor
        node {
          id
          email
          name
          nickname
          gender
          phone
          verified
          lastSignedIn
          createdAt
        }
      }
      pageCursors {
        first {
          cursor
          page
          isCurrent
        }
        previous {
          cursor
          page
          isCurrent
        }
        around {
          cursor
          page
          isCurrent
        }
        next {
          cursor
          page
          isCurrent
        }
        last {
          cursor
          page
          isCurrent
        }
      }
    }
  }
`;

function useUsersQuery({
  size,
  buttonNum,
  currentPage,
  cursor,
}: {
  size: number;
  buttonNum: number;
  currentPage?: number;
  cursor?: string;
}): any[] {
  const { props, error, retry, cached } = useQuery<UsersQuery>(usersQuery, {
    size,
    buttonNum,
    currentPage,
    cursor,
  });

  return [props, error, retry, cached];
}

const User: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { theme } = useThemeContext();
  const navigation = useNavigation();
  // const [result, setResult] = useState(null);

  const [props, error, retry, cached] = useUsersQuery({
    size: 5,
    buttonNum: 5,
  });
  // setResult(props);

  // useEffect(() => {
  //   const [props, error, retry, cached] = useUsersQuery({
  //     size: 5,
  //     buttonNum: 5,
  //   });
  //   setResult(props);
  //   console.log(1, { props });
  // }, []);

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

        <TableBox
          tableData={props?.users}
          pageQuery={useUsersQuery} />
      </Wrapper>
    </Container>
  );
};

export default User;
