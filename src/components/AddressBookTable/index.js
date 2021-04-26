import React, { useState, useEffect } from 'react';
import ContactsTable from '../Contact/Manage/Table';
import Filters from '../Contact/Manage/Filters';
import { TemplateMultiSelect, Template } from '../../components';
import { CheckIcon, CheckAllIcon } from '../../resources';
import { styled, Box, makeStyles, Grid } from '@material-ui/core';
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

  useEffect(() => {
    Object.entries(selectedTemplate).length > 0 &&
      setMessage(selectedTemplate.content);
  }, [selectedTemplate]);

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
          selectedMedia={selectedMedia}
          setSelectedMedia={setSelectedMedia}
        />
      </TemplateWrapper>
      <Grid container>
        <ContactsTable />
        <Grid item xs={3}>
          <Filters />
        </Grid>
      </Grid>
    </div>
  );
}
