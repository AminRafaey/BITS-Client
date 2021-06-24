import React from 'react';
import PropTypes from 'prop-types';
import { useEmployeeState } from '../../../../Context/Employee';
import { styled, Box, Typography } from '@material-ui/core';
import { DelieverStatusColor } from '../../../constants/theme';

const ContactInfoWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'baseline',
});
const FirstHeaderWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '16px 16px 24px 16px',
});

const ContactTyp = styled(Typography)({
  fontSize: 24,
  display: 'inline',
});

const ContactNumTyp = styled(Typography)({
  fontSize: 14,
  fontFamily: 'medium',
  display: 'inline',
  paddingLeft: 14,
  color: DelieverStatusColor,
});

function FirstHeader(props) {
  const {} = props;
  const employeeState = useEmployeeState();

  return (
    <FirstHeaderWrapper>
      <ContactInfoWrapper>
        <ContactTyp>Manage Access</ContactTyp>
        <ContactNumTyp>{employeeState.length} Total</ContactNumTyp>
      </ContactInfoWrapper>
    </FirstHeaderWrapper>
  );
}

FirstHeader.propTypes = {};
export default FirstHeader;
