import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../HOC';
import { useEmployeeState } from '../../../../Context/Employee';
import { styled, Box } from '@material-ui/core';
import { DarkBackgroundColor } from '../../../constants/theme';

const SecondHeaderWrapper = styled(Box)({
  display: 'flex',
  padding: '8px 4px',
  background: DarkBackgroundColor,
});

const ButtonsWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
});

function SecondHeader(props) {
  const employeeState = useEmployeeState();

  return (
    <SecondHeaderWrapper>
      <ButtonsWrapper>
        <Box pr={3}>
          <Button onClick={() => {}}>Save</Button>
        </Box>
      </ButtonsWrapper>
    </SecondHeaderWrapper>
  );
}

SecondHeader.propTypes = {};
export default SecondHeader;
