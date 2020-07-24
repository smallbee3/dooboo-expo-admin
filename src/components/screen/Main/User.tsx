import React, {
  useRef,
  useState,
} from 'react';
import {
  UsersQuery,
  UsersQueryResponse,
} from '../../../__generated__/UsersQuery.graphql';
import {
  graphql,
  useLazyLoadQuery,
} from 'react-relay/hooks';
import { Animated } from 'react-native';

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
          name
          email
          nickname
          gender
          phone
          verified
          lastSignedIn
          createdAt
          deletedAt
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

type contextState = {
  queryArgs: any,
  setQueryArgs: any,
  pageEdges: any,
  pageCursors: any,
};

export const UserDispatch = React.createContext<contextState>({
  queryArgs: null,
  setQueryArgs: null,
  pageEdges: null,
  pageCursors: null,
});

const User: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { theme } = useThemeContext();
  const navigation = useNavigation();
  const [queryArgs, setQueryArgs] = useState({
    size: 5,
    buttonNum: 7,
    currentPage: null,
    cursor: null,
  });

  const useUsersQuery = ({
    size,
    buttonNum,
    currentPage,
    cursor,
  }: {
    size: number;
    buttonNum: number;
    currentPage?: number;
    cursor?: string;
  }): UsersQueryResponse => {
    const result = useLazyLoadQuery<UsersQuery>(
      usersQuery,
      {
        size,
        buttonNum,
        currentPage,
        cursor,
      },
      { fetchPolicy: 'store-or-network' },
    );
    return result;
  };

  const data = useUsersQuery({
    size: queryArgs.size,
    buttonNum: queryArgs.buttonNum,
    currentPage: queryArgs.currentPage,
    cursor: queryArgs.cursor,
  });

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
    <UserDispatch.Provider
      value={{
        queryArgs,
        setQueryArgs,
        pageEdges: data.users.pageEdges,
        pageCursors: data.users.pageCursors,
      }}
    >
      <Container>
        <Wrapper>
          <Title style={{ margin: 20 }}>회원목록</Title>

          <SearchInputBox />

          {data && <TableBox />}
        </Wrapper>
      </Container>
    </UserDispatch.Provider>
  );
};

export default User;
