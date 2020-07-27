import React, { ReactElement, useState } from 'react';
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

const ImageCell = styled.Image`
  width: 20px;
  height: 20px;
`;

const RenderFunction = (children): ReactElement => {
  return (
    <>
      <ImageCell source={'https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png'} />
      {children}
    </>
  );
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

  const items = [
    {
      name: 'Frozen yogurt',
      id: 1,
      type: 'Ice cream',
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      // sodium: RenderFunction('abc'),
      // calcium: 14,
      // iron: 1,
    },
    {
      name: 'Frozen yogurt',
      id: 2,
      type: 'Ice cream',
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
      // sodium: 129,
      // calcium: 8,
      // iron: 1,
    },
    {
      name: 'Frozen yogurt',
      id: 3,
      type: 'Pastry',
      calories: 262,
      fat: 16.0,
      carbs: 37,
      protein: 6.0,
      // sodium: 337,
      // calcium: 6,
      // iron: 7,
    },
    {
      name: 'Cupcake',
      id: 4,
      type: 'Pastry',
      calories: 305,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
      // sodium: 413,
      // calcium: 3,
      // iron: 8,
    },
  ];

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
            isCheckAble={false}
            // data={tableItems}
            data={items}
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
