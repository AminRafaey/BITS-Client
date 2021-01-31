import React from 'react';
import { default as CI } from './icon.svg';
import PropTypes from 'prop-types';
import { DelieverStatusColor } from '../../components/constants/theme';
import { styled, Box, Tooltip } from '@material-ui/core';

const IconWrapper = styled(Box)({
  cursor: 'pointer',
  display: 'inline',
});

function CheckIcon(props) {
  return (
    <Tooltip title={'Sent'}>
      <IconWrapper>
        <CI fill={props.fill} />
      </IconWrapper>
    </Tooltip>
  );
}

CheckIcon.defaultProps = {
  fill: DelieverStatusColor,
};

CheckIcon.propTypes = {
  fill: PropTypes.string,
};

export default CheckIcon;
