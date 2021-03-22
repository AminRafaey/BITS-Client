import React, { useState, useEffect } from 'react';
import { Checkbox } from '../../../HOC';
import SecondHeader from '../SecondHeader';
import TableHead from './TableHead';
import { colors } from '../../../constants/AvatarColor';
import {
  useLeadsState,
  useLeadsDispatch,
  handleSelectedStatus,
  handleMultipleSelectedStatus,
} from '../../../../Context/Lead';
import { useLabelState } from '../../../../Context/LabelRevamp';
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
  Chip,
  withStyles,
  Menu,
  MenuItem,
  Fade,
  Grid,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import EventIcon from '@material-ui/icons/Event';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
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
const StyledChip = withStyles({
  root: {
    background: '#EDF1F2',
    margin: '0px 8px 8px 0px',
  },
})(Chip);
const StyledPaper = withStyles({
  root: {
    borderRadius: 0,
  },
})(Paper);
const StyledTableContainer = withStyles({
  root: {
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

export default function ContactsTable() {
  const leadsState = useLeadsState();
  const LeadsDispatch = useLeadsDispatch();
  const labelState = useLabelState();
  const [page, setPage] = useState(0);
  const [selectedCount, setSelectedCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setSelectedCount(leadsState.filter((l) => l.selected).length);
  }, [leadsState]);
  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectAllClick = (event) => {
    handleMultipleSelectedStatus(LeadsDispatch, {
      selected: event.target.checked,
      startingIndex: page * rowsPerPage,
      endingIndex: page * rowsPerPage + rowsPerPage,
    });
  };

  const handleClick = (event, _id) => {
    handleSelectedStatus(LeadsDispatch, {
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
    rowsPerPage - Math.min(rowsPerPage, leadsState.length - page * rowsPerPage);

  return (
    <>
      <Grid item xs={12}>
        <SecondHeader
          handleSelectAllClick={handleSelectAllClick}
          selectedCount={selectedCount}
        />
      </Grid>
      <Grid item xs={9}>
        <StyledPaper>
          <StyledTableContainer className="scrollElement">
            <Table
              aria-labelledby="tableTitle"
              size={'medium'}
              aria-label="enhanced table"
            >
              <TableHead />
              <TableBody>
                {leadsState
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover key={row._id}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={row.selected ? true : false}
                            onChange={(event) => handleClick(event, row._id)}
                          />
                        </TableCell>
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
                              {`${row.firstName} ${
                                row.lastName ? row.lastName : ''
                              }`
                                .split(' ')
                                .map((c) => c.charAt(0))
                                .join('')}
                            </Avatar>
                            <BasicInfoContentWrapper>
                              <TitleTyp>{`${row.firstName} ${
                                row.lastName ? row.lastName : ''
                              }`}</TitleTyp>
                              <EmailTyp>{row.email}</EmailTyp>
                            </BasicInfoContentWrapper>
                          </BasicInfoWrapper>
                        </TableCell>

                        <TableCell align="left">
                          <ItemTyp>{'+' + row.phone}</ItemTyp>
                        </TableCell>

                        <TableCell align="left">
                          <ItemTyp>{row.leadSource}</ItemTyp>
                        </TableCell>
                        <TableCell align="left">
                          {row.labels.length > 0 &&
                            row.labels.map((l) => (
                              <StyledChip
                                key={row._id + l}
                                size="small"
                                label={labelState[l]['title']}
                              />
                            ))}
                        </TableCell>
                        <TableCell align="left">
                          <IconWrapper
                            aria-controls="fade-menu"
                            aria-haspopup="true"
                            onClick={handleIconClick}
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
                            <MenuItem onClick={handleClose}>
                              <EditIcon style={{ ...iconsStyle }} />
                              <ItemTyp>Edit</ItemTyp>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
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
                            <MenuItem onClick={handleClose}>
                              <MonetizationOnIcon style={{ ...iconsStyle }} />
                              <ItemTyp>Add Deal</ItemTyp>
                            </MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    );
                  })}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </StyledTableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={leadsState.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </StyledPaper>
      </Grid>
    </>
  );
}

ContactsTable.prototypes = {};
