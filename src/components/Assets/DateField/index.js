import React from 'react';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

function DateField(props) {
  const { data, setData } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        autoOk
        variant="inline"
        inputVariant="outlined"
        format="MM/dd/yyyy"
        value={data.joiningDate}
        size="small"
        onChange={(date) => setData({ ...data, joiningDate: date })}
      />
    </MuiPickersUtilsProvider>
  );
}
DateField.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
};
export default DateField;
