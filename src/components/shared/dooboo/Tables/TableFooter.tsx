import React, { ReactElement } from 'react';
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';

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
  const { children, FooterStyle } = props;

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
        <Text style={{ fontSize: '12px'}}>
          {pagination.firstPage}
        </Text>
        {/* <Interpuncts source={require('./__assets__/interpuncts.png')} /> */}
        {pagination.pageNumberArr.map((item, index) => {
          return (
            <Text key={index} style={{ fontSize: '12px'}}>
              {item}
            </Text>
          );
        })}
        <Interpuncts source={require('./__assets__/interpuncts.png')} />
        <Text style={{ fontSize: '12px'}}>
          {pagination.lastPage}
        </Text>
        <TouchableOpacity
          onPress={() => console.log('go right')}
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
          <ArrowMark source={require('./__assets__/arrow-right.png')} />
        </TouchableOpacity>
      </Pagination>
    </FooterContainer>
  );
}

export default TableFooter;
