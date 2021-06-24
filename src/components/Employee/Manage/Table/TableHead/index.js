import React from 'react';
import PropTypes from 'prop-types';
import { headCells } from '../../../../constants/EmployeeColumns';
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
        <TableCell padding="checkbox"></TableCell>

        {headCells.map((headCell, index) => {
          return (
            <TableCell
              key={index}
              align={'left'}
              {...(index === 0 && { padding: 'none' })}
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
