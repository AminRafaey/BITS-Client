import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImportCard from './ImportCard';
import { Tab, Tabs, SelectedTab, Alert } from '../../HOC';
import {
  AppBar,
  Box,
  styled,
  Grid,
  withStyles,
  Typography,
} from '@material-ui/core';
import {
  DarkBackgroundColor,
  GrayColor,
  HeadingColor,
  HomeIconDefaultColor,
} from '../../constants/theme';

const AddContactWrapper = styled(Box)({
  marginLeft: 30,
  marginRight: 30,
  background: HeadingColor,
  width: 'auto',
});

const TabPanelWrapper = styled(Box)({
  borderColor: HomeIconDefaultColor,
  borderStyle: 'solid',
  borderWidth: '0px 1px 1px 1px',
});
const HeaderWrapper = styled(Box)({
  background: DarkBackgroundColor,
  width: '100%',
  padding: '12px 0px 12px 20px',
});
const HeaderTyp = styled(Typography)({
  fontSize: 20,
  fontFamily: 'medium',
});
const MediaErorWrapper = styled(Box)({
  paddingTop: 24,
  fontSize: 14,
  display: 'flex',
  justifyContent: 'center',
});
const StyledAppBar = withStyles({
  root: {
    background: GrayColor,
  },
})(AppBar);
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
  const [value, setValue] = useState(0);
  const [error, setError] = useState('');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <AddContactWrapper>
        <HeaderWrapper>
          <HeaderTyp>Import</HeaderTyp>
        </HeaderWrapper>
        <StyledAppBar position="static" color="default" elevation={0}>
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
        </StyledAppBar>

        <TabPanel value={value} index={0}>
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <ImportCard
                setError={setError}
                heading={'Faster CSV Contacts Import'}
                description={'Import upto 10,000 contacts from a CSV file'}
                type={'leads'}
              />
            </Grid>
            <Grid item xs={6}>
              <ImportCard
                setError={setError}
                heading={'Faster CSV Contacts Import'}
                description={'Import upto 10,000 contacts from a CSV file'}
                type={'labels'}
              />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={0}>
            {
              // <Grid item xs={4}>
              //   <ImportCard />
              // </Grid>
            }
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Grid container spacing={0}>
            {
              // <Grid item xs={4}>
              //   <ImportCard />
              // </Grid>
              // <Grid item xs={4}>
              //   <ImportCard />
              // </Grid>
              // <Grid item xs={4}>
              //   <ImportCard />
              // </Grid>
            }
          </Grid>
        </TabPanel>
      </AddContactWrapper>
      {error && (
        <MediaErorWrapper>
          <Alert severity="error">{error}</Alert>
        </MediaErorWrapper>
      )}
    </Box>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
AddContacts.propTypes = {};
export default AddContacts;
