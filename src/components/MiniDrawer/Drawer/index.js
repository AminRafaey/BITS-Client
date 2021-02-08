import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import { DrawerItem } from '../../../components';
import profilePlaceholder from '../../../public/images/profile-placeholder.png';
import { optionsList } from '../../constants/optionsList';
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

import { HighlightColor, HeadingColor } from '../../constants/theme';

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
  color: HeadingColor,
});

const OptionTyp = styled(Typography)({
  color: HeadingColor,
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
    width: 50,
    [theme.breakpoints.up('sm')]: {
      width: 50,
    },
  },
  toolbar: {
    padding: theme.spacing(0, 1),
  },
}));

export default function Drawer(props) {
  const { open, handleDrawerOpen } = props;
  const classes = useStyles();
  const { pathname } = useLocation();
  const theme = useTheme();

  useEffect(() => {
    if (!open) {
      pathname !== '/inbox' && handleDrawerOpen();
    }
  }, [pathname]);

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
      <div style={{ ...(!open && { display: 'none' }) }}>
        <CompanyNameWrapper>
          <CompanyNameTyp>BITS</CompanyNameTyp>
          {
            //   <div className={classes.toolbar}>
            //   <IconButton onClick={handleDrawerClose}>
            //     {theme.direction === 'rtl' ? (
            //       <ChevronRightIcon />
            //     ) : (
            //       <ChevronLeftIcon />
            //     )}
            //   </IconButton>
            // </div>
          }
        </CompanyNameWrapper>
        <ImageWrapper>
          <img
            src={profilePlaceholder}
            alt="Avatar"
            style={{
              width: 180,
              borderRadius: '50%',
            }}
          />
        </ImageWrapper>
        <UserNameWrapper>
          <OptionTyp>Muhammad Amin</OptionTyp>
        </UserNameWrapper>
      </div>

      <List>
        {optionsList.map((option, index) => (
          <DrawerItem option={option} key={index} open={open} />
        ))}
      </List>
    </MuiDrawer>
  );
}

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
};
