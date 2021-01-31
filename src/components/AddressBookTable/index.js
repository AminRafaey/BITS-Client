import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
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
} from '@material-ui/core';
import { Checkbox as MuiCheckbox } from '../HOC/Checkbox';
import Toolbar from './Toolbar';
import TableHead from './TableHead';
import profilePlaceholder from '../../public/images/profile-placeholder.png';
import { addressBook } from '../../Static/AddressBook';
import { CheckIcon, CheckAllIcon } from '../../resources';
import { LinkColor } from '../constants/theme';
import { CampaignMultiSelect, Template } from '..';
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

  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = addressBook.map((n) => n.mobileNumber);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, mobileNumber) => {
    const selectedIndex = selected.indexOf(mobileNumber);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, mobileNumber);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (mobileNumber) => selected.indexOf(mobileNumber) !== -1;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, addressBook.length - page * rowsPerPage);
  const getMyStatusIcon = (status) => {
    if (status === 'read')
      return (
        <IconWrapper>
          <CheckAllIcon fill={LinkColor} />
        </IconWrapper>
      );
    else if (status === 'delieverd')
      return (
        <IconWrapper>
          <CheckAllIcon />
        </IconWrapper>
      );
    else
      return (
        <IconWrapper>
          <CheckIcon />
        </IconWrapper>
      );
  };
  return (
    <div className={classes.root}>
      <CampaignSelectWrapper>
        <CampaignMultiSelect />
      </CampaignSelectWrapper>
      <TemplateWrapper>
        <Template />
      </TemplateWrapper>
      <Toolbar numSelected={selected.length} />
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
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={addressBook.length}
            />
            <TableBody>
              {addressBook
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.mobileNumber);
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.mobileNumber)}
                      key={row.mobileNumber}
                    >
                      <TableCell padding="checkbox">
                        <MuiCheckbox checked={isItemSelected} />
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
