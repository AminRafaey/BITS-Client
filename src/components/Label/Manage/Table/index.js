import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AbsoluteScroll, Chip } from '../../../HOC';

import TableHead from './TableHead';
import DeleteAlert from '../DeleteAlert';
import { useLabelDispatch, useLabelState } from '../../../../Context/Label';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  styled,
  Box,
  withStyles,
  CircularProgress,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { GrayColor, DelieverStatusColor } from '../../../constants/theme';

const iconsStyle = {
  height: 20,
};

const ItemTyp = styled(Typography)({
  fontSize: 14,
  display: 'inline',
});

const IconsWrapper = styled(Box)({
  display: 'flex',
});

const EditIconWrapper = styled(Box)({
  border: `1px ${DelieverStatusColor} solid`,
  borderRadius: 2,
  cursor: 'pointer',
  padding: '4px 2px 6px',
  display: 'flex',
  alignItems: 'center',
  marginRight: 12,
  '&:hover': {
    background: GrayColor,
  },
  '&:active': {
    background: DelieverStatusColor,
  },
});

const DeleteIconWrapper = styled(Box)({
  border: `1px ${DelieverStatusColor} solid`,
  borderRadius: 2,
  cursor: 'pointer',
  padding: '4px 2px 6px',
  display: 'flex',
  alignItems: 'center',
  marginRight: 12,
  '&:hover': {
    background: GrayColor,
  },
  '&:active': {
    background: DelieverStatusColor,
  },
});
const LoaderWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '70vh',
});

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

export default function ContactsTable(props) {
  const { sortType } = props;
  const labelState = useLabelState();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const selectedLabel = useRef(null);

  const handleIconClick = (row, _id) => {
    selectedLabel.current = { label: { ...row }, _id: _id };
  };

  return (
    <React.Fragment>
      <StyledTableContainer className="scrollElement">
        <AbsoluteScroll>
          <Table
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <TableHead />
            <TableBody>
              {Object.keys(labelState)
                .sort((a, b) =>
                  sortType === 2
                    ? new Date(labelState[b].createdAt) -
                      new Date(labelState[a].createdAt)
                    : new Date(labelState[a].createdAt) -
                      new Date(labelState[b].createdAt)
                )
                .map((l, index) => {
                  const row = labelState[l];
                  return (
                    <TableRow hover key={row._id}>
                      <TableCell padding="checkbox" align="left">
                        <Chip avatarBackground={row.color} label={row.title} />
                      </TableCell>

                      <TableCell align="left">
                        <ItemTyp>{row.description}</ItemTyp>
                      </TableCell>

                      <TableCell align="left" style={{ minWidth: 150 }}>
                        <ItemTyp>
                          {new Date(row.createdAt).toDateString()}
                        </ItemTyp>
                      </TableCell>
                      <TableCell align="left">
                        <IconsWrapper>
                          <Link
                            to={`/addTemplate?edit=true&&_id=${row._id}`}
                            style={{
                              textDecoration: 'none',
                              color: 'black',
                            }}
                          >
                            <EditIconWrapper>
                              <EditIcon style={{ ...iconsStyle }} />
                            </EditIconWrapper>
                          </Link>
                          <DeleteIconWrapper
                            onClick={(e) => {
                              handleIconClick(row, l);
                              setOpenDeleteModal(true);
                            }}
                          >
                            <DeleteIcon style={{ ...iconsStyle }} />
                          </DeleteIconWrapper>
                        </IconsWrapper>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {openDeleteModal && (
                <DeleteAlert
                  open={openDeleteModal}
                  setOpen={setOpenDeleteModal}
                  selectedLabel={
                    selectedLabel.current ? selectedLabel.current.label : {}
                  }
                  selectedLabelId={
                    selectedLabel.current
                      ? selectedLabel.current._id
                      : undefined
                  }
                />
              )}
            </TableBody>
          </Table>
        </AbsoluteScroll>
      </StyledTableContainer>
    </React.Fragment>
  );
}

ContactsTable.propTypes = {
  sortType: PropTypes.number.isRequired,
};
