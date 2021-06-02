import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Checkbox, AbsoluteScroll } from '../../../HOC';
import SecondHeader from '../SecondHeader';
import TableHead from './TableHead';
import CreateEmployee from '../../../Forms/Employee/Create';
import DeleteAlert from '../DeleteAlert';
import { colors } from '../../../constants/AvatarColor';
import {
  useEmployeeState,
  useEmployeeDispatch,
  // handleSelectedStatus,
  // handleMultipleSelectedStatus,
} from '../../../../Context/Employee';
import { useLabelState } from '../../../../Context/Label';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Typography,
  styled,
  Box,
  Avatar,
  withStyles,
  Menu,
  MenuItem,
  Fade,
  Grid,
  CircularProgress,
  Select,
  FormControl,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import EventIcon from '@material-ui/icons/Event';
import { employee } from '../../../../Static/Employee';
import { GrayColor, DelieverStatusColor } from '../../../constants/theme';

const iconsStyle = {
  height: 14,
  color: DelieverStatusColor,
  marginRight: 6,
};
const ItemTyp = styled(Typography)({
  fontSize: 14,
  display: 'inline',
});

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
const IconWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '&:hover': {
    background: GrayColor,
    borderRadius: '50%',
  },
});

const LoaderWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '70vh',
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
        background: '#f5f6f8',
      },
      '&:nth-child(even)': {
        background: '#ffff',
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

const StickyRightTableCell = withStyles({
  body: {
    right: 0,
    position: 'sticky',
    zIndex: 1,
    background: 'inherit',
  },
})(TableCell);
const StyledFormControl = withStyles({
  root: {
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#f5f6f8',
    },
    '& .MuiSelect-select:focus': {
      background: '#f5f6f8',
    },

    '& .MuiInputBase-root .MuiSelect-root': {
      padding: '6px 32px 6px 14px',
    },
  },
})(FormControl);
export default function ContactsTable(props) {
  const { message, selectedMedia, sortType } = props;
  const { pathname } = useLocation();
  const employeeState = useEmployeeState();
  const employeeDispatch = useEmployeeDispatch();
  const [page, setPage] = useState(0);
  const [selectedCount, setSelectedCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [leadLoader, setLeadloader] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openCreateLabelModal, setOpenCreateLabelModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const selectedEmployee = useRef(null);
  const open = Boolean(anchorEl);

  // useEffect(() => {
  //   setSelectedCount(leadsState.filter((l) => l.selected).length);
  // }, [leadsState]);

  const handleIconClick = (event, row, index) => {
    console.log(row, index);
    setAnchorEl(event.currentTarget);
    selectedEmployee.current = { employee: { ...row }, index: index };
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectAllClick = (event) => {
    handleMultipleSelectedStatus(employeeDispatch, {
      selected: event.target.checked,
      startingIndex: page * rowsPerPage,
      endingIndex: page * rowsPerPage + rowsPerPage,
    });
  };

  const handleClick = (event, _id) => {
    handleSelectedStatus(employeeDispatch, {
      selected: event.target.checked,
      _id: _id,
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, employeeState.length - page * rowsPerPage);

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <SecondHeader
          handleSelectAllClick={handleSelectAllClick}
          selectedCount={selectedCount}
        />
      </Grid>

      <Grid item xs={12} md={9}>
        {leadLoader ? (
          <LoaderWrapper>
            <CircularProgress color="primary" />
          </LoaderWrapper>
        ) : (
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
                      {employeeState
                        .sort((a, b) =>
                          sortType === 2
                            ? new Date(b.createdAt) - new Date(a.createdAt)
                            : new Date(a.createdAt) - new Date(b.createdAt)
                        )
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          return (
                            <TableRow hover key={row._id}>
                              <StickyLeftTableCell padding="checkbox">
                                <Checkbox
                                  checked={row.selected ? true : false}
                                  onChange={(event) =>
                                    handleClick(event, row._id)
                                  }
                                />
                              </StickyLeftTableCell>
                              <TableCell padding="none" align="left">
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
                              </TableCell>

                              <TableCell align="left">
                                <ItemTyp>{row.email || ''}</ItemTyp>
                              </TableCell>

                              <TableCell align="left">
                                <ItemTyp>{row.mobileNumber || ''}</ItemTyp>
                              </TableCell>

                              <TableCell align="left">
                                <ItemTyp>
                                  {row.joiningDate
                                    ? new Date(
                                        row.joiningDate
                                      ).toLocaleDateString()
                                    : ''}
                                </ItemTyp>
                              </TableCell>

                              <TableCell align="left">
                                <StyledFormControl>
                                  <Select
                                    value={row.status}
                                    onChange={(e) =>
                                      console.log(e.target.value)
                                    }
                                    variant="outlined"
                                  >
                                    <MenuItem value={row.status}>
                                      {row.status}
                                    </MenuItem>
                                    <MenuItem
                                      value={
                                        row.status === 'Active'
                                          ? 'Blocked'
                                          : 'Active'
                                      }
                                    >
                                      {row.status === 'Active'
                                        ? 'Blocked'
                                        : 'Active'}
                                    </MenuItem>
                                  </Select>
                                </StyledFormControl>
                              </TableCell>

                              <StickyRightTableCell align="left">
                                <IconWrapper
                                  aria-controls="fade-menu"
                                  aria-haspopup="true"
                                  onClick={(e) =>
                                    handleIconClick(e, row, index)
                                  }
                                >
                                  {' '}
                                  <MoreVertIcon style={{ height: 18 }} />
                                </IconWrapper>

                                <Menu
                                  elevation={1}
                                  transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                  }}
                                  id="fade-menu"
                                  anchorEl={anchorEl}
                                  keepMounted
                                  open={open}
                                  onClose={handleClose}
                                  TransitionComponent={Fade}
                                >
                                  <MenuItem
                                    onClick={() => {
                                      setOpenCreateLabelModal(true);
                                      handleClose();
                                    }}
                                  >
                                    <EditIcon style={{ ...iconsStyle }} />
                                    <ItemTyp>Edit</ItemTyp>
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => {
                                      setOpenDeleteModal(true);
                                      handleClose();
                                    }}
                                  >
                                    <DeleteIcon style={{ ...iconsStyle }} />
                                    <ItemTyp>Delete</ItemTyp>
                                  </MenuItem>

                                  <MenuItem onClick={handleClose}>
                                    <NoteAddIcon style={{ ...iconsStyle }} />
                                    <ItemTyp>Add Note</ItemTyp>
                                  </MenuItem>
                                  <MenuItem onClick={handleClose}>
                                    <EventIcon style={{ ...iconsStyle }} />
                                    <ItemTyp>Schedule an appointment</ItemTyp>
                                  </MenuItem>
                                </Menu>
                              </StickyRightTableCell>
                            </TableRow>
                          );
                        })}
                      {openCreateLabelModal && (
                        <CreateEmployee
                          openModal={openCreateLabelModal}
                          setOpenModal={setOpenCreateLabelModal}
                          type={'edit'}
                          editingEmployee={
                            selectedEmployee.current
                              ? selectedEmployee.current.employee
                              : {}
                          }
                          selectedEmployeeIndex={
                            selectedEmployee.current
                              ? selectedEmployee.current.index
                              : undefined
                          }
                        />
                      )}
                      {openDeleteModal && (
                        <DeleteAlert
                          open={openDeleteModal}
                          setOpen={setOpenDeleteModal}
                          selectedCount={1}
                          selectedEmployee={selectedEmployee.current.employee}
                          selectedEmployeeIndex={selectedEmployee.current.index}
                        />
                      )}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </AbsoluteScroll>
              </StyledTableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 20, 30]}
                component="div"
                count={employeeState.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </StyledPaper>
          </React.Fragment>
        )}
      </Grid>
    </React.Fragment>
  );
}

ContactsTable.prototypes = {
  message: PropTypes.string,
  selectedMedia: PropTypes.object,
  sortType: PropTypes.number.isRequired,
};
