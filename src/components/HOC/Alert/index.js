import React from 'react';
import { withStyles } from '@material-ui/core';
import { default as MuiAlert } from '@material-ui/lab/Alert';
import { ErrorAlert } from '../../constants/theme';

const StyledAlert = withStyles({
  standardError: {
    background: ErrorAlert,
  },
})(MuiAlert);

function Alert(props) {
  return <StyledAlert {...props} />;
}

Alert.propTypes = {};
export default Alert;
