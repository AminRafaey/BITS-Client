import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../HOC';
import {
  loadEmployee,
  useEmployeeDispatch,
  useEmployeeState,
} from '../../../../Context/Employee';
import { updateEmployeeAccess } from '../../../../api/Employee';
import { styled, Box, CircularProgress } from '@material-ui/core';
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
  const { employeeStateRef } = props;
  const employeeState = useEmployeeState();
  const employeeDispatch = useEmployeeDispatch();
  const [loading, setLoading] = useState(false);

  const handleSaveClick = () => {
    const filteredEmployees = employeeState.filter((e) => {
      const esRef = employeeStateRef.current.find((es) => es._id == e._id);
      if (
        esRef.quickSend == e.quickSend &&
        esRef.contactManagement == e.contactManagement &&
        esRef.templateManagement == e.templateManagement &&
        esRef.labelManagement == e.labelManagement &&
        esRef.inbox == e.inbox
      ) {
        return false;
      }
      return true;
    });
    if (filteredEmployees.length > 0) {
      setLoading(true);
      updateEmployeeAccess(filteredEmployees)
        .then((res) => {
          employeeStateRef.current = employeeState;
          setLoading(false);
        })
        .catch((err) => {
          loadEmployee(employeeDispatch, {
            employees: employeeStateRef.current,
          });
          setLoading(false);
        });
    }
  };
  return (
    <SecondHeaderWrapper>
      <ButtonsWrapper>
        <Box pr={3}>
          {loading ? (
            <Box pr={3}>
              <CircularProgress size={21} color="primary" />
            </Box>
          ) : (
            <Button onClick={() => handleSaveClick()}>Save</Button>
          )}
        </Box>
      </ButtonsWrapper>
    </SecondHeaderWrapper>
  );
}

SecondHeader.propTypes = {
  employeeStateRef: PropTypes.object.isRequired,
};
export default SecondHeader;
