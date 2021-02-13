import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button as MuiButton } from '@material-ui/core';
import {
  HoverColor,
  HeadingColor,
  HighlightColor,
} from '../../constants/theme';

const StyledButton = withStyles({
  root: {
    background: HighlightColor,
    padding: '2px 4px',
  },
  label: {
    fontSize: 14,
    color: HeadingColor,
    textTransform: 'none',
  },
  contained: {
    '&:hover': {
      background: HoverColor,
    },
  },
})(MuiButton);

function Button(props) {
  return (
    <div>
      <StyledButton
        {...props}
        size="small"
        variant="contained"
        disableElevation={true}
      />
    </div>
  );
}

Button.propTypes = {};
export default Button;
