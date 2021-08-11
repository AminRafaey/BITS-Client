import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Checkbox, Chip, AbsoluteScroll } from '../../../HOC';
import SecondHeader from '../SecondHeader';
import TableHead from './TableHead';
import Toolbar from '../../../AddressBookTable/Toolbar';
import { default as AddressBookTableHead } from '../../../AddressBookTable/TableHead';
import CreateLead from '../../../Forms/Lead/Create';
import DeleteAlert from '../DeleteAlert';
import { colors } from '../../../constants/AvatarColor';
import { rowsPerPageOptions } from '../../../constants/tablePagination';
import {
  useLeadsState,
  useLeadsDispatch,
  handleSelectedStatus,
  handleMultipleSelectedStatus,
  addLeads,
} from '../../../../Context/Lead';
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
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import EventIcon from '@material-ui/icons/Event';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { GrayColor, DelieverStatusColor } from '../../../constants/theme';
import { getLeads } from '../../../../api/Lead';
import { initLeadFilters } from '../../../constants/InitialValues';

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
});

const EmailTyp = styled(Typography)({
  fontSize: 12,
  paddingLeft: 16,
});
const IconWrapper = styled(Box)({
  marginLeft: 8,
  display: 'flex',
  alignItems: 'center',
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

export default function ContactsTable(props) {
  const { message, selectedMedia, sortType, filters, setFilters } = props;
  const { pathname } = useLocation();
  const leadsState = useLeadsState();
  const leadsDispatch = useLeadsDispatch();
  const labelState = useLabelState();
  const [page, setPage] = useState(0);
  const [selectedCount, setSelectedCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [leadLoader, setLeadloader] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openCreateLabelModal, setOpenCreateLabelModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const selectedLead = useRef(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setSelectedCount(leadsState.filter((l) => l.selected).length);
  }, [leadsState]);
  useEffect(() => {
    getMoreLeads();
  }, [page, rowsPerPage]);

  const handleIconClick = (event, row, index) => {
    setAnchorEl(event.currentTarget);
    selectedLead.current = { lead: { ...row }, index: index };
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectAllClick = (event) => {
    handleMultipleSelectedStatus(leadsDispatch, {
      selected: event.target.checked,
      startingIndex: page * rowsPerPage,
      endingIndex: page * rowsPerPage + rowsPerPage,
    });
  };

  const handleClick = (event, _id) => {
    handleSelectedStatus(leadsDispatch, {
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

  const getMoreLeads = () => {
    if (!leadsState[page * rowsPerPage]) {
      setLeadloader(true);
      if (JSON.stringify(filters) !== JSON.stringify(initLeadFilters)) {
        getFilteredLeads(filters, page, rowsPerPage).then((res) => {
          res && addLeads(leadsDispatch, { leads: res });
          setLeadloader(false);
        });
      } else {
        getLeads(page, rowsPerPage).then((res) => {
          addLeads(leadsDispatch, { leads: res });
          setLeadloader(false);
        });
      }
    }
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, leadsState.length - page * rowsPerPage);

  return (
    <React.Fragment>
      {pathname !== '/sendFromAddressBook' && (
        <Grid item xs={12}>
          <SecondHeader
            handleSelectAllClick={handleSelectAllClick}
            selectedCount={selectedCount}
          />
        </Grid>
      )}
      <Grid item xs={12} md={9}>
        {leadLoader ? (
          <LoaderWrapper>
            <CircularProgress color="primary" />
          </LoaderWrapper>
        ) : (
          <React.Fragment>
            {pathname === '/sendFromAddressBook' && (
              <Toolbar
                numSelected={selectedCount}
                message={message}
                selectedMedia={selectedMedia}
              />
            )}

            <StyledPaper>
              <StyledTableContainer className="scrollElement">
                <AbsoluteScroll>
                  <Table
                    aria-labelledby="tableTitle"
                    size={'medium'}
                    aria-label="enhanced table"
                  >
                    {pathname === '/sendFromAddressBook' ? (
                      <AddressBookTableHead
                        onSelectAllClick={handleSelectAllClick}
                        page={page}
                        rowsPerPage={rowsPerPage}
                      />
                    ) : (
                      <TableHead />
                    )}
                    <TableBody>
                      {leadsState
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
                                          `${row.firstName.charCodeAt(0)}${
                                            row.lastName
                                              ? (row.lastName.charCodeAt(0) >=
                                                  65 &&
                                                  row.lastName.charCodeAt(0) <=
                                                    90) ||
                                                (row.lastName.charCodeAt(0) >=
                                                  97 &&
                                                  row.lastName.charCodeAt(0) <=
                                                    122)
                                                ? row.lastName.charCodeAt(0)
                                                : ''
                                              : ''
                                          }` % colors.length
                                        ],
                                    }}
                                  >
                                    {`${row.firstName.substr(0, 1)}${
                                      (row.lastName &&
                                        row.lastName.substr(0, 1)) ||
                                      ''
                                    }`}
                                  </Avatar>
                                  <BasicInfoContentWrapper>
                                    <TitleTyp>{`${row.firstName} ${
                                      row.lastName || ''
                                    }`}</TitleTyp>
                                    <EmailTyp>{row.email}</EmailTyp>
                                  </BasicInfoContentWrapper>
                                </BasicInfoWrapper>
                              </TableCell>

                              <TableCell align="left">
                                <ItemTyp>{row.phone || ''}</ItemTyp>
                              </TableCell>

                              <TableCell align="left">
                                <ItemTyp>{row.leadSource}</ItemTyp>
                              </TableCell>
                              <TableCell align="left">
                                {row.labels.length > 0 &&
                                  row.labels.map((l) => (
                                    <Chip
                                      style={{ margin: '0px 8px 8px 0px' }}
                                      key={row._id + l}
                                      label={labelState[l]['title']}
                                      avatarBackground={labelState[l].color}
                                    />
                                  ))}
                              </TableCell>

                              <TableCell align="left">
                                <ItemTyp>{row.companyName || ''}</ItemTyp>
                              </TableCell>
                              <TableCell align="left">
                                <ItemTyp>{row.country || ''}</ItemTyp>
                              </TableCell>
                              {pathname !== '/sendFromAddressBook' && (
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

                                    {
                                      // <MenuItem onClick={handleClose}>
                                      //   <NoteAddIcon style={{ ...iconsStyle }} />
                                      //   <ItemTyp>Add Note</ItemTyp>
                                      // </MenuItem>
                                      // <MenuItem onClick={handleClose}>
                                      //   <EventIcon style={{ ...iconsStyle }} />
                                      //   <ItemTyp>Schedule an appointment</ItemTyp>
                                      // </MenuItem>
                                      // <MenuItem onClick={handleClose}>
                                      //   <MonetizationOnIcon
                                      //     style={{ ...iconsStyle }}
                                      //   />
                                      //   <ItemTyp>Add Deal</ItemTyp>
                                      // </MenuItem>
                                    }
                                  </Menu>
                                </StickyRightTableCell>
                              )}
                            </TableRow>
                          );
                        })}
                      {openCreateLabelModal && (
                        <CreateLead
                          openModal={openCreateLabelModal}
                          setOpenModal={setOpenCreateLabelModal}
                          type={'edit'}
                          editingLead={
                            selectedLead.current
                              ? selectedLead.current.lead
                              : {}
                          }
                          selectedLeadIndex={
                            selectedLead.current
                              ? selectedLead.current.index
                              : undefined
                          }
                        />
                      )}
                      {openDeleteModal && (
                        <DeleteAlert
                          open={openDeleteModal}
                          setOpen={setOpenDeleteModal}
                          selectedCount={1}
                          selectedLead={
                            selectedLead.current
                              ? selectedLead.current.lead
                              : {}
                          }
                          selectedLeadIndex={
                            selectedLead.current
                              ? selectedLead.current.index
                              : undefined
                          }
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
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={
                  localStorage.getItem('TOTAL_LEADS')
                    ? localStorage.getItem('TOTAL_LEADS')
                    : 0
                }
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

ContactsTable.propTypes = {
  message: PropTypes.string,
  selectedMedia: PropTypes.object,
  sortType: PropTypes.number.isRequired,
  filters: PropTypes.object,
  setFilters: PropTypes.func,
};
