import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, AbsoluteScroll } from '../../../HOC';
import SecondHeader from '../SecondHeader';
import TableHead from './TableHead';
import { colors } from '../../../constants/AvatarColor';
import {
  useEmployeeState,
  useEmployeeDispatch,
  updateEmployeeAccess,
} from '../../../../Context/Employee';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  styled,
  Box,
  Avatar,
  withStyles,
} from '@material-ui/core';

const BasicInfoWrapper = styled(Box)({
  display: 'flex',
});
const BasicInfoContentWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});
const TitleTyp = styled(Typography)({
  fontSize: 14,
  paddingLeft: 16,
  whiteSpace: 'nowrap',
});

const EmailTyp = styled(Typography)({
  fontSize: 12,
  paddingLeft: 16,
  whiteSpace: 'nowrap',
});

const StyledPaper = withStyles({
  root: {
    borderRadius: 0,
  },
})(Paper);
const StyledTableContainer = withStyles({
  root: {
    background: '#F5F6F8',
    '& .MuiTableBody-root .MuiTableRow-root': {
      '&:nth-child(odd)': {
        background: '#ffff',
      },
      '&:nth-child(even)': {
        background: '#f5f6f8',
      },
    },
  },
})(TableContainer);

const StickyLeftTableCell = withStyles({
  body: {
    left: 0,
    position: 'sticky',
    zIndex: 1,
    background: 'inherit',
  },
})(TableCell);

export default function AccessTable(props) {
  const { employeeStateRef } = props;
  const employeeState = useEmployeeState();
  const employeeDispatch = useEmployeeDispatch();

  const handleCheckboxChange = (index, propertyName, propertyValue) => {
    updateEmployeeAccess(employeeDispatch, {
      selectedEmployeeIndex: index,
      propertyName,
      propertyValue: propertyValue ? 'allow' : 'not-allow',
    });
  };
  return (
    <React.Fragment>
      <SecondHeader employeeStateRef={employeeStateRef} />

      <React.Fragment>
        <StyledPaper>
          <StyledTableContainer className="scrollElement">
            <AbsoluteScroll>
              <Table
                aria-labelledby="tableTitle"
                size={'medium'}
                aria-label="enhanced table"
              >
                <TableHead />

                <TableBody>
                  {employeeState.map((row, index) => {
                    return (
                      <TableRow hover key={row._id}>
                        <TableCell />
                        <StickyLeftTableCell padding="checkbox" align="left">
                          <BasicInfoWrapper>
                            <Avatar
                              style={{
                                color: '#ffff',
                                background:
                                  colors[
                                    `${row.firstName} ${
                                      row.lastName ? row.lastName : ''
                                    }`
                                      .split(' ')
                                      .map((char) => char.charCodeAt(0))
                                      .join('') % colors.length
                                  ],
                              }}
                            >
                              {`${row.firstName} ${row.lastName || ''}`
                                .split(' ')
                                .map((c) => c.charAt(0))
                                .join('')}
                            </Avatar>
                            <BasicInfoContentWrapper>
                              <TitleTyp>{`${row.firstName} ${
                                row.lastName || ''
                              }`}</TitleTyp>
                              <EmailTyp>{row.designation}</EmailTyp>
                            </BasicInfoContentWrapper>
                          </BasicInfoWrapper>
                        </StickyLeftTableCell>

                        <TableCell align="center">
                          <Checkbox
                            checked={row.quickSend === 'allow'}
                            onChange={(event) =>
                              handleCheckboxChange(
                                index,
                                'quickSend',
                                event.target.checked
                              )
                            }
                          />
                        </TableCell>

                        <TableCell align="center">
                          <Checkbox
                            checked={row.contactManagement === 'allow'}
                            onChange={(event) =>
                              handleCheckboxChange(
                                index,
                                'contactManagement',
                                event.target.checked
                              )
                            }
                          />
                        </TableCell>

                        <TableCell align="center">
                          <Checkbox
                            checked={row.templateManagement === 'allow'}
                            onChange={(event) =>
                              handleCheckboxChange(
                                index,
                                'templateManagement',
                                event.target.checked
                              )
                            }
                          />
                        </TableCell>

                        <TableCell align="center">
                          <Checkbox
                            checked={row.labelManagement === 'allow'}
                            onChange={(event) =>
                              handleCheckboxChange(
                                index,
                                'labelManagement',
                                event.target.checked
                              )
                            }
                          />
                        </TableCell>
                        <TableCell align="center">
                          {' '}
                          <Checkbox
                            checked={row.inbox === 'allow'}
                            onChange={(event) =>
                              handleCheckboxChange(
                                index,
                                'inbox',
                                event.target.checked
                              )
                            }
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </AbsoluteScroll>
          </StyledTableContainer>
        </StyledPaper>
      </React.Fragment>
    </React.Fragment>
  );
}

AccessTable.prototypes = {
  employeeStateRef: PropTypes.object.isRequired,
};
