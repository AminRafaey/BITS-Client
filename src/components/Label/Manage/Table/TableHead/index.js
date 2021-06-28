import React from 'react';
import PropTypes from 'prop-types';
import { manageLabels } from '../../../../constants/ColumnName';
import {
  TableHead as MuiTableHead,
  TableRow,
  TableCell,
  Typography,
  styled,
  withStyles,
} from '@material-ui/core';

const ItemTyp = styled(Typography)({
  fontSize: 14,
  fontFamily: 'medium',
});

const StyledTableHead = withStyles({
  root: {
    background: '#ffff',
  },
})(MuiTableHead);

export default function TableHead(props) {
  return (
    <StyledTableHead>
      <TableRow>
        {manageLabels.map((headCell, index) => {
          return (
            <TableCell key={index} align={'left'}>
              <ItemTyp>{headCell.label}</ItemTyp>
            </TableCell>
          );
        })}
      </TableRow>
    </StyledTableHead>
  );
}

TableHead.propTypes = {};
