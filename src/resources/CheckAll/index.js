import React from 'react';
import { default as CAI } from './icon.svg';
import PropTypes from 'prop-types';
import { DelieverStatusColor } from '../../components/constants/theme';
import { styled, Box, Tooltip } from '@material-ui/core';

const IconWrapper = styled(Box)({
  cursor: 'pointer',
  display: 'inline',
});

function CheckAllIcon(props) {
  return (
    <Tooltip title={props.fill === DelieverStatusColor ? 'Delieverd' : 'Read'}>
      <IconWrapper>
        <CAI fill={props.fill} />
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
