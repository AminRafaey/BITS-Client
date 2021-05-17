import React, { useState, useEffect } from 'react';
import ContactsTable from '../Contact/Manage/Table';
import Filters from '../Contact/Manage/Filters';
import {
  TemplateMultiSelect,
  Template,
  ConnectionModal,
} from '../../components';
import { CheckIcon, CheckAllIcon } from '../../resources';
import { useConnectStatusState } from '../../Context/ConnectStatus';
import {
  styled,
  Box,
  makeStyles,
  Grid,
  CircularProgress,
} from '@material-ui/core';
import { LinkColor } from '../constants/theme';

const IconWrapper = styled(Box)({
  display: 'inline',
  paddingRight: 3,
});
const CampaignSelectWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
});
const TemplateWrapper = styled(Box)({});

const LoadingWrapper = styled(Box)({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: 50,
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
  const [message, setMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [selectedMedia, setSelectedMedia] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const connectState = useConnectStatusState();

  useEffect(() => {
    Object.entries(selectedTemplate).length > 0 &&
      setMessage(selectedTemplate.content);
  }, [selectedTemplate]);

  useEffect(() => {
    !connectState && setOpenModal(true);
  }, [connectState]);

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
      {connectState ? (
        <React.Fragment>
          <CampaignSelectWrapper>
            <TemplateMultiSelect setSelectedTemplate={setSelectedTemplate} />
          </CampaignSelectWrapper>
          <TemplateWrapper>
            <Template
              message={message}
              setMessage={setMessage}
              selectedMedia={selectedMedia}
              setSelectedMedia={setSelectedMedia}
            />
          </TemplateWrapper>
          <Grid container>
            <ContactsTable message={message} selectedMedia={selectedMedia} />
            <Grid item xs={12} md={3}>
              <Filters />
            </Grid>
          </Grid>
        </React.Fragment>
      ) : (
        <LoadingWrapper>
          <CircularProgress color="primary" />
        </LoadingWrapper>
      )}
      <ConnectionModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}
