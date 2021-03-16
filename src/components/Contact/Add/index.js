import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, withStyles, Box, styled, Typography } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { HomeIconDefaultColor, HeadingColor } from '../../constants/theme';

const AddContactWrapper = styled(Box)({
  marginLeft: 30,
  background: HeadingColor,
  width: 'auto',
});
const StyledTab = withStyles({
  root: {
    textTransform: 'none',
  },
})(Tab);

const StyledSelectedTab = withStyles({
  root: {
    textTransform: 'none',
    background: HeadingColor,
    borderColor: HomeIconDefaultColor,
    borderStyle: 'solid',
    borderWidth: '1px 1px 0px 1px',
  },
})(Tab);
const StyledTabs = withStyles({
  flexContainer: {
    display: 'block',
  },
  fixed: {
    '& .MuiTabs-indicator': {
      display: 'none',
    },
  },
})(Tabs);
const TabPanelWrapper = styled(Box)({
  borderColor: HomeIconDefaultColor,
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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </TabPanelWrapper>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function AddContacts() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AddContactWrapper>
      <AppBar position="static" color="default" elevation={0}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          aria-label="full width tabs example"
        >
          {value === 0 ? (
            <StyledSelectedTab label="Import From CSV" {...a11yProps(0)} />
          ) : (
            <StyledTab label="Import From CSV" {...a11yProps(0)} />
          )}
          {value === 1 ? (
            <StyledSelectedTab label="Import From WhatsApp" {...a11yProps(1)} />
          ) : (
            <StyledTab label="Import From WhatsApp" {...a11yProps(1)} />
          )}
          {value === 2 ? (
            <StyledSelectedTab label="Import From Others" {...a11yProps(2)} />
          ) : (
            <StyledTab label="Import From Others" {...a11yProps(2)} />
          )}
        </StyledTabs>
      </AppBar>

      <TabPanel value={value} index={0} dir={theme.direction}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        Item Three
      </TabPanel>
    </AddContactWrapper>
  );
}

AddContacts.propTypes = {};
export default AddContacts;
