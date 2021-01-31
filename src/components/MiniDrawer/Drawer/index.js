import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  styled,
  Drawer as MuiDrawer,
  List,
  Typography,
  makeStyles,
  useTheme,
  IconButton,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { DrawerItem } from '../../../components';

import { HighlightColor } from '../../constants/theme';
import profilePlaceholder from '../../../public/images/profile-placeholder.png';
import { optionsList } from '../../constants/optionsList';

const drawerWidth = 280;

const ImageWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
});

const CompanyNameWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
});

const CompanyNameTyp = styled(Typography)({
  fontSize: '3rem',
  color: '#FFFFFF',
});

const OptionTyp = styled(Typography)({
  color: '#FFFFFF',
  fontSize: 14,
});

const UserNameWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: 16,
});

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    borderRight: '0px',
    background: HighlightColor,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    background: HighlightColor,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    padding: theme.spacing(0, 1),
  },
}));

export default function Drawer(props) {
  const { open, handleDrawerClose } = props;
  const classes = useStyles();
  const theme = useTheme();

  return (
    <MuiDrawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div>
        <CompanyNameWrapper>
          <CompanyNameTyp>BITS</CompanyNameTyp>
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
        </CompanyNameWrapper>
        <ImageWrapper>
          <img
            src={profilePlaceholder}
            alt="Avatar"
            style={{
              width: 180,
              borderRadius: '50%',
              ...(!open && { display: 'none' }),
            }}
          />
        </ImageWrapper>
        <UserNameWrapper>
          <OptionTyp>Muhammad Amin</OptionTyp>
        </UserNameWrapper>
      </div>

      <List>
        {optionsList.map((option, index) => (
          <DrawerItem option={option} key={index} />
        ))}
      </List>
    </MuiDrawer>
  );
}

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
};
