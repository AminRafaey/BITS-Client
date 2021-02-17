import React from 'react';
import PropTypes from 'prop-types';
import { default as CI } from './icon.svg';
import { styled, Box, Tooltip, Fade, withStyles } from '@material-ui/core';
import { NotConnected, Connected } from '../../components/constants/theme';

const IconWrapper = styled(Box)({
  cursor: 'pointer',
  display: 'inline',
});
const StyledToolTip = withStyles({
  tooltip: {
    fontSize: 14,
    width: 'fit-content',
  },
})(Tooltip);
function ConnectIcon(props) {
  const { status } = props;
  return (
    <StyledToolTip
      arrow
      interactive
      TransitionComponent={Fade}
      title={`Click to ${status ? 'disconnect' : 'connect'}`}
    >
      <IconWrapper>
        <CI fill={status ? Connected : NotConnected} />
      </IconWrapper>
    </StyledToolTip>
  );
}

ConnectIcon.defaultProps = {
  status: false,
};

ConnectIcon.propTypes = {
  status: PropTypes.bool,
};

export default ConnectIcon;
