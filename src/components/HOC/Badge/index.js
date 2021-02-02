import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Badge as MuiBadge } from '@material-ui/core';

const StyledBadge = withStyles({
  anchorOriginTopRightRectangle: {
    left: -5,
  },
})(MuiBadge);

function Badge(props) {
  return (
    <div>
      <StyledBadge badgeContent={4} color="primary" />
    </div>
  );
}

Badge.propTypes = {};
export default Badge;
