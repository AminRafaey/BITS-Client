import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Badge as MuiBadge } from '@material-ui/core';

const StyledBadge = withStyles({
  root: {
    marginTop: 3,
  },
  anchorOriginTopRightRectangle: {
    left: -2,
  },
  badge: {
    fontSize: 12,
    height: 16,
    minWidth: 16,
  },
})(MuiBadge);

function Badge(props) {
  return (
    <div>
      <StyledBadge {...props} color="primary" />
    </div>
  );
}

Badge.propTypes = {};
export default Badge;
