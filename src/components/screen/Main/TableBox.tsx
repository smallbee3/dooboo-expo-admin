import React, { ReactElement, useRef, useState } from 'react';
import { PaginationUserConnection } from '../../../types/graphql';
import Table from '../../shared/dooboo/Tables/index';
import styled from 'styled-components/native';

const TableWrapper = styled.View`
  justify-content: flex-start;
  margin-left: 20px;
  margin-right: 20px;
`;

export default function TableBox({
  tableData,
}): ReactElement {
  const tableItems = tableData?.pageEdges.map((item) => {
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
