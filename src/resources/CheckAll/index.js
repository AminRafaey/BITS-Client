import React from 'react';
import PropTypes from 'prop-types';
import { default as CAI } from './icon.svg';
import { styled, Box, Tooltip } from '@material-ui/core';
import { DelieverStatusColor } from '../../components/constants/theme';

const IconWrapper = styled(Box)({
  cursor: 'pointer',
  display: 'inline',
});

function CheckAllIcon(props) {
  const { fill } = props;
  return (
    <Tooltip title={fill === DelieverStatusColor ? 'Delieverd' : 'Read'}>
      <IconWrapper>
        <CAI fill={fill} />
      </IconWrapper>
    </Tooltip>
  );
}

CheckAllIcon.defaultProps = {
  fill: DelieverStatusColor,
};

CheckAllIcon.propTypes = {
  fill: PropTypes.string,
};

export default CheckAllIcon;
