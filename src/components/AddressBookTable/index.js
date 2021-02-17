import React, { useState, useEffect } from 'react';
import { Checkbox } from '../HOC';
import Toolbar from './Toolbar';
import TableHead from './TableHead';
import profilePlaceholder from '../../public/images/profile-placeholder.png';
import { addressBook } from '../../Static/AddressBook';
import { TemplateMultiSelect, Template } from '../../components';
import { CheckIcon, CheckAllIcon } from '../../resources';
import {
  useAddressBookState,
  useAddressBookDispatch,
  handleSelectedStatus,
  handleMultipleSelectedStatus,
} from '../../Context/AddressBook';
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
  makeStyles,
} from '@material-ui/core';
import { LinkColor } from '../constants/theme';

const ItemTyp = styled(Typography)({
  fontSize: 14,
  display: 'inline',
});

const IconWrapper = styled(Box)({
  display: 'inline',
  paddingRight: 3,
});
const CampaignSelectWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
});
const TemplateWrapper = styled(Box)({});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
  },
  table: {
    minWidth: 750,
  },
}));

export default function AddressBookTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [message, setMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [selectedMedia, setSelectedMedia] = useState({});
  const addressBookState = useAddressBookState();
  const addressBookDispatch = useAddressBookDispatch();

  useEffect(() => {
    Object.entries(selectedTemplate).length > 0 &&
      setMessage(selectedTemplate.content);
  }, [selectedTemplate]);

  const handleSelectAllClick = (event) => {
    handleMultipleSelectedStatus(addressBookDispatch, {
      selected: event.target.checked,
      startingIndex: page * rowsPerPage,
      endingIndex: page * rowsPerPage + rowsPerPage,
    });
  };

  const handleClick = (event, _id) => {
    handleSelectedStatus(addressBookDispatch, {
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
    Math.min(rowsPerPage, addressBook.length - page * rowsPerPage);

  const getMyStatusIcon = (status) => {
    switch (status) {
      case 'read':
        return (
          <IconWrapper>
            <CheckAllIcon fill={LinkColor} />
          </IconWrapper>
        );
      case 'delieverd':
        return (
          <IconWrapper>
            <CheckAllIcon />
          </IconWrapper>
        );
      default:
        return (
          <IconWrapper>
            <CheckIcon />
          </IconWrapper>
        );
    }
  };
  return (
    <div className={classes.root}>
      <CampaignSelectWrapper>
        <TemplateMultiSelect setSelectedTemplate={setSelectedTemplate} />
      </CampaignSelectWrapper>
      <TemplateWrapper>
        <Template
          message={message}
          setMessage={setMessage}
          setSelectedMedia={setSelectedMedia}
        />
      </TemplateWrapper>
      <Toolbar
        numSelected={addressBookState.filter((a) => a.selected).length}
        message={message}
      />
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <TableHead
              classes={classes}
              onSelectAllClick={handleSelectAllClick}
              page={page}
              rowsPerPage={rowsPerPage}
            />
            <TableBody>
              {addressBookState
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
                        {row.profile ? (
                          <ItemTyp>row.profile</ItemTyp>
                        ) : (
                          <img
                            src={profilePlaceholder}
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                            }}
                          />
                        )}
                      </TableCell>

                      <TableCell align="left">
                        <ItemTyp>{row.mobileNumber}</ItemTyp>
                      </TableCell>
                      <TableCell align="left">
                        {getMyStatusIcon(row.lastInteraction.status)}
                        <ItemTyp>{row.lastInteraction.message}</ItemTyp>
                      </TableCell>
                      <TableCell align="left">
                        <ItemTyp>{row.leadSource}</ItemTyp>
                      </TableCell>
                      <TableCell align="left">
                        <ItemTyp>{row.label}</ItemTyp>
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
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={addressBook.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
