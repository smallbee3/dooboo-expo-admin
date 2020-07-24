import React, { ReactElement, useContext, useRef, useState } from 'react';
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { UserDispatch } from '../../../screen/Main/User';

import { Button } from 'dooboo-ui';
import styled from 'styled-components/native';

type Props = React.ComponentPropsWithRef<typeof View> & {
  children: React.ReactNode;
  FooterStyle?: ViewStyle;
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
  width: 20%;
`;

const ArrowMark = styled.Image`
  width: 6px;
  height: 10px;
`;

const Interpuncts = styled.Image`
  width: 35px;
  height: 24px;
`;

function TableFooter(props: Props): ReactElement {
  const { children, FooterStyle } = props;
  const currentPage = useRef(null);
  const previousPage = useRef(null);
  const nextPage = useRef(null);

  const { queryArgs, setQueryArgs, pageCursors } = useContext(UserDispatch);

  pageCursors.around.map((item, index, arr) => {
    if (item.isCurrent) {
      currentPage.current = item;
      if (pageCursors.previous) {
        previousPage.current = arr[index - 1];
      }
      if (pageCursors.next) {
        nextPage.current = arr[index + 1];
      }
    }
  });

  return (
    <FooterContainer style={[FooterStyle]} testID="table-header-test-id">
      <Pagination>
        <TouchableOpacity
          onPress={() =>
            setQueryArgs({
              ...queryArgs,
              cursor: previousPage.current.cursor,
              currentPage: previousPage.current.page,
            })
          }
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
        {pageCursors?.first && (
          <>
            <TouchableOpacity
              onPress={() =>
                setQueryArgs({
                  ...queryArgs,
                  cursor: pageCursors.first.cursor,
                  currentPage: pageCursors.first.page,
                })
              }
              style={{ fontSize: '12px'}}>
              {pageCursors.first.page}
            </TouchableOpacity>
            <Interpuncts source={require('./__assets__/interpuncts.png')} />
          </>
        )}
        {pageCursors.around.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() =>
                setQueryArgs({
                  ...queryArgs,
                  cursor: item.cursor,
                  currentPage: item.page,
                })
              }
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
        {pageCursors?.last && (
          <>
            <Interpuncts source={require('./__assets__/interpuncts.png')} />
            <TouchableOpacity
              onPress={() =>
                setQueryArgs({
                  ...queryArgs,
                  cursor: pageCursors.last.cursor,
                  currentPage: pageCursors.last.page,
                })
              }
              style={{ fontSize: '12px'}}>
              {pageCursors.last.page}
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity
          onPress={() =>
            setQueryArgs({
              ...queryArgs,
              cursor: nextPage.current.cursor,
              currentPage: nextPage.current.page,
            })
          }
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
