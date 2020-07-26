import React, { ReactElement, useContext, useRef } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { UserDispatch } from '../../screen/Main/TableBox';
import styled from 'styled-components/native';

type Props = React.ComponentPropsWithRef<typeof View> & {
  children?: React.ReactNode;
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
`;

const StyledArrowView = styled.View`
  background-color: white;
  height: 30px;
  width: 30px;
  margin: 4px;
  border-width: 1.5px;
  border-style: solid;
  border-color: #cbd7e5;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text<{around?: boolean, item?: any}>`
  margin: 4px;
  font-size: 12px;
  font-weight: ${(props): number | string => props?.item?.isCurrent ? 800 : 'normal'};
  color: ${(props): string | null => props?.item?.isCurrent ? '#6DA6FC' : null};
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
  const { FooterStyle } = props;
  const currentPage = useRef<any>(null);
  const previousPage = useRef<any>(null);
  const nextPage = useRef<any>(null);

  const { queryArgs, setQueryArgs, pageCursors } = useContext(UserDispatch);

  pageCursors.around.map((item, index, arr) => {
    if (item.isCurrent) {
      currentPage.current = item;
      if (pageCursors.previous) {
        previousPage.current = arr[index - 1];
      } else {
        previousPage.current = item;
      }
      if (pageCursors.next) {
        nextPage.current = arr[index + 1];
      } else {
        nextPage.current = item;
      }
    }
  });
  return (
    <FooterContainer style={[FooterStyle]} testID="table-header-test-id">
      <Pagination>
        {/* previous('<') button */}
        <TouchableOpacity
          onPress={(): void => {
            if (previousPage.current.page === currentPage.current.page) return;
            setQueryArgs({
              ...queryArgs,
              cursor: previousPage.current.cursor,
              currentPage: previousPage.current.page,
            });
          }}
        >
          <StyledArrowView>
            <ArrowMark source={require('./__assets__/arrow-left.png')} />
          </StyledArrowView>
        </TouchableOpacity>
        {/* first item */}
        {pageCursors?.first && (
          <>
            <TouchableOpacity
              onPress={(): void =>
                setQueryArgs({
                  ...queryArgs,
                  cursor: pageCursors.first.cursor,
                  currentPage: pageCursors.first.page,
                })
              }
            >
              <StyledText>
                {pageCursors.first.page}
              </StyledText>
            </TouchableOpacity>
            <Interpuncts source={require('./__assets__/interpuncts.png')} />
          </>
        )}
        {/* around items */}
        {pageCursors.around.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={(): void =>
                setQueryArgs({
                  ...queryArgs,
                  cursor: item.cursor,
                  currentPage: item.page,
                })
              }
              key={index}
            >
              <StyledText around item={item}>
                {item.page}
              </StyledText>
            </TouchableOpacity>
          );
        })}
        {/* last item */}
        {pageCursors?.last && (
          <>
            <Interpuncts source={require('./__assets__/interpuncts.png')} />
            <TouchableOpacity
              onPress={(): void =>
                setQueryArgs({
                  ...queryArgs,
                  cursor: pageCursors.last.cursor,
                  currentPage: pageCursors.last.page,
                })
              }
            >
              <StyledText>
                {pageCursors.last.page}
              </StyledText>
            </TouchableOpacity>
          </>
        )}
        {/* next('>') button */}
        <TouchableOpacity
          onPress={(): void => {
            if (nextPage.current.page === currentPage.current.page) return;
            setQueryArgs({
              ...queryArgs,
              cursor: nextPage.current.cursor,
              currentPage: nextPage.current.page,
            });
          }}
        >
          <StyledArrowView>
            <ArrowMark source={require('./__assets__/arrow-right.png')} />
          </StyledArrowView>
        </TouchableOpacity>
      </Pagination>
    </FooterContainer>
  );
}

export default TableFooter;
