import React from 'react';
import PropTypes from 'prop-types';
import ImportCard from './ImportCard';
import { Tab, Tabs, SelectedTab } from '../../HOC';
import { AppBar, Box, styled, Grid } from '@material-ui/core';

const AddContactWrapper = styled(Box)({
  marginLeft: 30,
  marginRight: 30,
  background: '#ffff',
  width: 'auto',
});

const TabPanelWrapper = styled(Box)({
  borderColor: '#cccc',
  borderStyle: 'solid',
  borderWidth: '0px 1px 1px 1px',
});
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <TabPanelWrapper
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </TabPanelWrapper>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function AddContacts() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AddContactWrapper>
      <AppBar position="static" color="default" elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="full width tabs example"
        >
          {value === 0 ? (
            <SelectedTab label="Import From CSV" {...a11yProps(0)} />
          ) : (
            <Tab label="Import From CSV" {...a11yProps(0)} />
          )}

          {value === 1 ? (
            <SelectedTab label="Import From WhatsApp" {...a11yProps(1)} />
          ) : (
            <Tab label="Import From WhatsApp" {...a11yProps(1)} />
          )}

          {value === 2 ? (
            <SelectedTab label="Import From Others" {...a11yProps(2)} />
          ) : (
            <Tab label="Import From Others" {...a11yProps(2)} />
          )}
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <ImportCard />
          </Grid>
          <Grid item xs={4}>
            <ImportCard />
          </Grid>
          <Grid item xs={4}>
            <ImportCard />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <ImportCard />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <ImportCard />
          </Grid>
          <Grid item xs={4}>
            <ImportCard />
          </Grid>
          <Grid item xs={4}>
            <ImportCard />
          </Grid>
        </Grid>
      </TabPanel>
    </AddContactWrapper>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
AddContacts.propTypes = {};
export default AddContacts;
