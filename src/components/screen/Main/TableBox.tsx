import React, { ReactElement, useContext } from 'react';
import Table from '../../shared/dooboo/Tables/index';
import { UserDispatch } from './User';
import styled from 'styled-components/native';

const TableWrapper = styled.View`
  justify-content: flex-start;
  margin-left: 20px;
  margin-right: 20px;
`;

export default function TableBox(): ReactElement {
  const { pageEdges } = useContext(UserDispatch);
  const tableItems = pageEdges.map((item) => {
    return item.node;
  });

  // const customGroupData = [
  //   'ID',
  //   'NAME',
  //   'KIND',
  //   'CAL',
  //   'FAT',
  //   'CARBS',
  //   'PROTEIN',
  //   'SODIUM',
  //   'CALCIUM',
  //   'IRON',
  // ];

  return (
    <TableWrapper>
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
    </TableWrapper>
  );
}
