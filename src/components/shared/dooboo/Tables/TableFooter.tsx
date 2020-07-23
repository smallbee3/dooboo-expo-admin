import React, { ReactElement, useRef, useState } from 'react';
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { Button } from 'dooboo-ui';
import styled from 'styled-components/native';

type Props = React.ComponentPropsWithRef<typeof View> & {
  children: React.ReactNode;
  FooterStyle?: ViewStyle;
  pageInfo?: any;
  pageQuery?: any;
};

const FooterContainer = styled.View`
  justify-content: center;
  align-items: center;
  height: 70px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  background-color: white;
`;

const Pagination = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 30%;
`;

const ArrowMark = styled.Image`
  width: 6px;
  height: 10px;
`;

const Interpuncts = styled.Image`
  width: 35px;
  height: 24px;
`;

const pagination = {
  firstPage: 1,
  pageNumberArr: [
    2, 3, 4,
  ],
  lastPage: 39,
};

function TableFooter(props: Props): ReactElement {
  const { children, FooterStyle, pageInfo, pageQuery } = props;
  // const [currentPage, setCurrentPage] = useState(null);
  // const [previousPage, setPreviousPage] = useState(null);
  // const [nextPage, setNextPage] = useState(null);

  const currentPage = useRef(null);
  const previousPage = useRef(null);
  const nextPage = useRef(null);

  pageInfo.around.map((item, index, arr) => {
    if (item.isCurrent) {
      // setCurrentPage(item);
      currentPage.current = item;
      if (pageInfo.previous) {
        // setPreviousPage(arr[index - 1]);
        previousPage.current = arr[index - 1];
      }
      if (pageInfo.next) {
        // setNextPage(arr[index + 1]);
        nextPage.current = arr[index + 1];
      }
    }
  });
  return (
    <FooterContainer style={[FooterStyle]} testID="table-header-test-id">
      <Pagination>
        <TouchableOpacity
          onPress={() => console.log('go left')}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            height: '30px',
            width: '30px',
            borderWidth: '1.5px',
            borderStyle: 'solid',
            borderColor: '#CBD7E5',
          }}
        >
          <ArrowMark source={require('./__assets__/arrow-left.png')} />
        </TouchableOpacity>
        {pageInfo?.first && (
          <>
            <TouchableOpacity
              style={{ fontSize: '12px'}}>
              {pageInfo.first.page}
            </TouchableOpacity>
            <Interpuncts source={require('./__assets__/interpuncts.png')} />
          </>
        )}
        {pageInfo.around.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                fontSize: '12px',
                fontWeight: item.isCurrent ? '800' : 'none',
                color: item.isCurrent ? '#6DA6FC' : 'none',
              }}>
              {item.page}
            </TouchableOpacity>
          );
        })}
        {pageInfo?.last && (
          <>
            <Interpuncts source={require('./__assets__/interpuncts.png')} />
            <TouchableOpacity
              style={{ fontSize: '12px'}}>
              {pageInfo.last.page}
            </TouchableOpacity>
          </>
        )}        
        <TouchableOpacity
          // onPress={() => pageQuery({
          //   size: 2,
          //   buttonNum: 5,
          //   current: nextPage,
          //   cursor: nextPage.cursor,
          // })}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            height: '30px',
            width: '30px',
            borderWidth: '1.5px',
            borderStyle: 'solid',
            borderColor: '#CBD7E5',
            disabled: 'true',
          }}
        >
          <ArrowMark source={require('./__assets__/arrow-right.png')} />
        </TouchableOpacity>
      </Pagination>
    </FooterContainer>
  );
}

export default TableFooter;
