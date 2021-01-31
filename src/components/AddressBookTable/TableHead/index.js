import React from 'react';
import PropTypes from 'prop-types';
import {
  TableHead as MuiTableHead,
  TableRow,
  TableCell,
  Typography,
  styled,
} from '@material-ui/core';
import { Checkbox as MuiCheckbox } from '../../HOC/Checkbox';

const ItemTyp = styled(Typography)({
  fontSize: 16,
});

const headCells = [
  {
    label: 'Profile',
  },
  { label: 'Mobile Number' },
  { label: 'Last interaction' },
  { label: 'Lead Source' },
  { label: 'Lead label' },
];

export default function TableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <MuiTableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <MuiCheckbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        <TableCell align={'left'} padding="none">
          <ItemTyp>Profile</ItemTyp>
        </TableCell>
        {headCells.map((headCell, index) => {
          if (index === 0) return;
          return (
            <TableCell key={index} align={'left'}>
              <ItemTyp>{headCell.label}</ItemTyp>
            </TableCell>
          );
        })}
      </TableRow>
    </MuiTableHead>
  );
}

TableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
};
