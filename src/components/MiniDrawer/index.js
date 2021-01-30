import React, { useState } from 'react';
import clsx from 'clsx';
import {
  withStyles,
  Box,
  styled,
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  IconButton,
  ListItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { DrawerItem } from '../../components';

import { HighlightColor } from '../constants/theme';
import profilePlaceholder from '../../public/images/profile-placeholder.png';
import { optionsList, appBarList } from '../constants/optionsList';
import { Home, QuickSend, AddressBookTable } from '../../components';
const drawerWidth = 280;
const AddressBookWrapper = styled(Box)({
  padding: '100px 50px 0px 50px',
  background: '#E9EEF5',
  height: '100%',
});
const HomePageWrapper = styled(Box)({
  padding: '260px 50px 0px 50px',
  background: '#E9EEF5',
  height: '100%',
});
const QuickSendWrapper = styled(Box)({
  padding: '100px 50px 0px 50px',
  background: '#E9EEF5',
  minHeight: '150vh',
});
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
const AppBarListWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
});
const UserNameWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: 16,
});

const StyledToolbar = withStyles({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
})(Toolbar);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
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
  content: {
    // flexGrow: 1,
    width: '100%',
    minHeight: '100vh',
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <StyledToolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <AppBarListWrapper>
            {appBarList.map((option, index) => (
              <ListItem button key={index}>
                <OptionTyp>{option.title}</OptionTyp>
              </ListItem>
            ))}
          </AppBarListWrapper>
        </StyledToolbar>
      </AppBar>
      <Drawer
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
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {
          //   <HomePageWrapper>
          //   <Home />
          // </HomePageWrapper>
        }
        {
          //   <QuickSendWrapper>
          //   <QuickSend />
          // </QuickSendWrapper>
        }
        <AddressBookWrapper>
          {' '}
          <AddressBookTable />
        </AddressBookWrapper>
      </main>
    </div>
  );
}
