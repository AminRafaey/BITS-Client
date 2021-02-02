import React from 'react';
import PropTypes from 'prop-types';
import { default as CI } from './icon.svg';
import { styled, Box, Tooltip } from '@material-ui/core';
import { DelieverStatusColor } from '../../components/constants/theme';

const IconWrapper = styled(Box)({
  cursor: 'pointer',
  display: 'inline',
});

function CheckIcon(props) {
  const { fill } = props;
  return (
    <Tooltip title={'Sent'}>
      <IconWrapper>
        <CI fill={fill} />
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
