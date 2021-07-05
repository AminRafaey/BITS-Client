import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  useEmployeeDispatch,
  updateEmployee,
} from '../../../../../Context/Employee';
import { updateEmployeeStatus } from '../../../../../api/Employee';
import {
  withStyles,
  MenuItem,
  Select,
  FormControl,
  CircularProgress,
  Typography,
  styled,
} from '@material-ui/core';
const ItemTyp = styled(Typography)({
  fontSize: 14,
  display: 'flex',
});
const StyledFormControl = withStyles({
  root: {
    width: 110,
    '& .MuiInputBase-root .MuiSelect-root': {
      padding: '6px 32px 6px 14px',
    },
  },
})(FormControl);

function StatusSelect(props) {
  const { row, index } = props;
  const employeeDispatch = useEmployeeDispatch();
  const [loading, setLoading] = useState(false);

  const handleChange = (status) => {
    setLoading(true);
    updateEmployeeStatus(row._id, status).then((res) => {
      updateEmployee(employeeDispatch, {
        selectedEmployeeIndex: index,
        employeeData: res,
      });
    });
    setTimeout(() => setLoading(false), 5000);
  };
  return (
    <>
      {loading ? (
        <CircularProgress size={26} color="primary" />
      ) : (
        <>
          {row.status === 'Not-Verified' ? (
            <ItemTyp>{row.status}</ItemTyp>
          ) : (
            <StyledFormControl>
              <Select
                value={row.status}
                onChange={(e) => handleChange(e.target.value)}
                variant="outlined"
              >
                <MenuItem value={row.status}>{row.status}</MenuItem>
                <MenuItem
                  value={row.status === 'Active' ? 'Blocked' : 'Active'}
                >
                  {row.status === 'Active' ? 'Blocked' : 'Active'}
                </MenuItem>
              </Select>
            </StyledFormControl>
          )}
        </>
      )}
    </>
  );
}

StatusSelect.propTypes = {
  row: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default StatusSelect;
