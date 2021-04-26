import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '../../HOC';
import { headCells } from '../../constants/ColumnName';
import { useLeadsState } from '../../../Context/Lead';
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
  const { onSelectAllClick, page, rowsPerPage } = props;
  const leadsState = useLeadsState();

  const checkBoxStatus = (function () {
    const selectedOnes = leadsState
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .filter((a) => a.selected).length;

    switch (true) {
      case selectedOnes ===
        leadsState.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .length:
        return 'checked';
      case selectedOnes > 0:
        return 'indeterminate';
      default:
        return 'uncheced';
    }
  })();

  return (
    <MuiTableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={checkBoxStatus === 'indeterminate'}
            checked={checkBoxStatus === 'checked'}
            onChange={onSelectAllClick}
          />
        </TableCell>

        {headCells.map((headCell, index) => {
          if (!headCell.label) return;
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
  onSelectAllClick: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
