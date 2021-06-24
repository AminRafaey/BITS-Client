import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { AbsoluteScroll } from '../../../HOC';

import TableHead from './TableHead';
import DeleteAlert from '../DeleteAlert';
import {
  useTemplateDispatch,
  useTemplateState,
  loadTemplates,
} from '../../../../Context/Template';
import { getTemplates } from '../../../../api/template';
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

const TitleTyp = styled(Typography)({
  fontSize: 14,
  paddingLeft: 16,
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
  const templateState = useTemplateState();
  const templateDispatch = useTemplateDispatch();
  const [loader, setLoader] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const selectedTemplate = useRef(null);

  const handleIconClick = (row, index) => {
    selectedTemplate.current = { template: { ...row }, index: index };
  };

  useEffect(() => {
    if (templateState.length === 0) {
      getTemplates()
        .then((res) => {
          setLoader(false);
          loadTemplates(templateDispatch, { templates: res });
        })
        .catch((err) => {});
    } else {
      setLoader(false);
    }
  }, []);

  return (
    <React.Fragment>
      {loader ? (
        <LoaderWrapper>
          <CircularProgress color="primary" />
        </LoaderWrapper>
      ) : (
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
                  {templateState
                    .sort((a, b) =>
                      sortType === 2
                        ? new Date(b.createdAt) - new Date(a.createdAt)
                        : new Date(a.createdAt) - new Date(b.createdAt)
                    )
                    .map((row, index) => {
                      return (
                        <TableRow hover key={row._id}>
                          <TableCell padding="none" align="left">
                            <TitleTyp>{`${row.title}`}</TitleTyp>
                          </TableCell>

                          <TableCell align="left">
                            <ItemTyp>{row.content}</ItemTyp>
                          </TableCell>

                          <TableCell align="left" style={{ minWidth: 150 }}>
                            <ItemTyp>
                              {new Date(row.createdAt).toDateString()}
                            </ItemTyp>
                          </TableCell>
                          <TableCell align="left">
                            <IconsWrapper>
                              <EditIconWrapper>
                                <EditIcon style={{ ...iconsStyle }} />
                              </EditIconWrapper>
                              <DeleteIconWrapper
                                onClick={(e) => {
                                  handleIconClick(row, index);
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
                      selectedTemplate={
                        selectedTemplate.current
                          ? selectedTemplate.current.template
                          : {}
                      }
                      selectedTemplateIndex={
                        selectedTemplate.current
                          ? selectedTemplate.current.index
                          : undefined
                      }
                    />
                  )}
                </TableBody>
              </Table>
            </AbsoluteScroll>
          </StyledTableContainer>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

ContactsTable.propTypes = {
  sortType: PropTypes.number.isRequired,
};
