import React from 'react';
import PropTypes from 'prop-types';
import { manageAccessHeadCells } from '../../../../constants/EmployeeColumns';
import {
  TableHead as MuiTableHead,
  TableRow,
  TableCell,
  Typography,
  styled,
} from '@material-ui/core';

const ItemTyp = styled(Typography)({
  fontSize: 14,
});

export default function TableHead(props) {
  return (
    <MuiTableHead>
      <TableRow>
        <TableCell />
        {manageAccessHeadCells.map((headCell, index) => {
          return (
            <TableCell
              key={index}
              align={'center'}
              {...(index === 0 && { align: 'left' })}
            >
              <ItemTyp>{headCell.label}</ItemTyp>
            </TableCell>
          );
        })}
      </TableRow>
    </MuiTableHead>
  );
}

TableHead.propTypes = {};
