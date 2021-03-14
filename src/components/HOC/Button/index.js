import React from 'react';
import { withStyles, Button as MuiButton } from '@material-ui/core';
import {
  HoverColor,
  HeadingColor,
  HighlightColor,
} from '../../constants/theme';

const StyledButton = withStyles({
  root: {
    background: HighlightColor,
    paddingTop: '2px',
    paddingBottom: '2px',
    borderRadius: 0,
  },
  label: {
    fontSize: 13,
    fontFamily: 'Regular',
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
