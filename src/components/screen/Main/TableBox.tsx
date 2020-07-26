import React, { useState } from 'react';
import {
  TableBoxUsersQuery,
  TableBoxUsersQueryResponse,
  TableBoxUsersQueryVariables,
} from '../../../__generated__/TableBoxUsersQuery.graphql';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';
import { PageCursorsUserConnection } from '../../../types/graphql';
import SearchInput from '../../shared/SearchInput';
import { SvgMagnifier } from '../../../utils/icons';
import Table from '../../shared/Tables/index';
import { getString } from '../../../../STRINGS';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/theme';

const SearchInputContainer = styled.View`
  margin-bottom: 50;
  width: 100%;
`;

const MagContainer = styled.View`
  height: 100%;
  width: 13%;
  justify-content: center;
  align-items: center;
  background-color: #6da6fc;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
`;

const Magnifier = styled.Image`
  width: 22px;
  height: 22px;
`;

const TableContainer = styled.View`
  justify-content: flex-start;
  margin-left: 20px;
  margin-right: 20px;
`;

const tableBoxUsersQuery = graphql`
  query TableBoxUsersQuery(
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
  queryArgs: TableBoxUsersQueryVariables | null;
  setQueryArgs: React.Dispatch<
    React.SetStateAction<TableBoxUsersQueryVariables>
  > | null;
  pageCursors: PageCursorsUserConnection | null;
};

export const UserDispatch = React.createContext<contextState>({
  queryArgs: null,
  setQueryArgs: null,
  pageCursors: null,
});

const TableBox: React.FC = () => {
  const { theme } = useThemeContext();
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [queryArgs, setQueryArgs] = useState<TableBoxUsersQueryVariables>({
    size: 5,
    buttonNum: 7,
  });
  const useUsersQuery = ({
    size,
    buttonNum,
    currentPage,
    cursor,
  }: {
    size: number;
    buttonNum: number;
    currentPage?: number | null;
    cursor?: string | null;
  }): TableBoxUsersQueryResponse => {
    const result = useLazyLoadQuery<TableBoxUsersQuery>(
      tableBoxUsersQuery,
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

  const tableItems = data?.users?.pageEdges?.map((item) => item.node);

  return (
    <UserDispatch.Provider
      value={{
        queryArgs,
        setQueryArgs,
        pageCursors: data?.users?.pageCursors,
      }}
    >
      <SearchInputContainer>
        <SearchInput
          value={searchInputValue}
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
              <SvgMagnifier stroke={theme.primary} />
            </MagContainer>
          }
          debounceDelay={400}
          onDebounceOrOnReset={(str): void => {
            setSearchInputValue(str);
          }}
        />
      </SearchInputContainer>

      <TableContainer>
        {tableItems && (
          <Table
            // customGroup={customGroupData}
            isCheckAble={true}
            data={tableItems}
            style={{
              borderRadius: 25,
            }}
          />
        )}
      </TableContainer>
    </UserDispatch.Provider>
  );
};

export default TableBox;
