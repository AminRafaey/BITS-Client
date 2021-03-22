import React from 'react';
import { withStyles } from '@material-ui/core';
import { default as MuiButton } from '../Button';
import { GrayColor } from '../../constants/theme';

const StyledButton = withStyles({
  root: {
    background: '#ffff',
    marginRight: 8,
  },
  label: {
    color: 'black',
  },
  contained: {
    '&:hover': {
      background: GrayColor,
    },
  },
})(MuiButton);

function SecondaryButton(props) {
  return (
    <div>
      <StyledButton {...props} />
    </div>
  );
}

SecondaryButton.propTypes = {};
export default SecondaryButton;
