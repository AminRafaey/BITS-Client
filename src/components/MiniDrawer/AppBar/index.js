import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { appBarList } from '../../constants/optionsList';
import { ConnectIcon } from '../../../resources';
import { useUserDispatch, logout } from '../../../Context/User';
import {
  useConnectStatusState,
  useConnectStatusDispatch,
  updateStatus,
} from '../../../Context/ConnectStatus';
import {
  withStyles,
  Box,
  styled,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  makeStyles,
  IconButton,
  ListItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { HeadingColor, primaryColor } from '../../constants/theme';

const drawerWidth = 280;

const OptionTyp = styled(Typography)({
  color: HeadingColor,
  fontSize: 14,
});
const AppBarListWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
});

const StyledToolbar = withStyles({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    background: primaryColor,
  },
})(Toolbar);

const useStyles = makeStyles((theme) => ({
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
}));

export default function AppBar(props) {
  const { open, handleDrawerOpen, setOpenModal } = props;
  const classes = useStyles();
  const history = useHistory();

  const connectStatusState = useConnectStatusState();
  const connectStatusDispatch = useConnectStatusDispatch();
  const userDispatch = useUserDispatch();

  const handleConnectIconClick = () => {
    !connectStatusState && setOpenModal(true);
    connectStatusState &&
      updateStatus(connectStatusDispatch, {
        status: false,
      });
    connectStatusState && setOpenModal(false);
  };
  const sessionOut = () => {
    logout(userDispatch, {});
    history.push('/signIn');
  };
  return (
    <MuiAppBar
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
            <Link
              key={index}
              to={option.path}
              style={{
                textDecoration: 'none',
                width: '100%',
                color: 'rgba(0, 0, 0, 0.87)',
              }}
            >
              <ListItem
                button
                {...(option.title === 'Logout' && { onClick: sessionOut })}
              >
                <OptionTyp>{option.title}</OptionTyp>
              </ListItem>
            </Link>
          ))}
        </AppBarListWrapper>
        <div onClick={() => handleConnectIconClick()}>
          <ConnectIcon status={connectStatusState} />
        </div>
      </StyledToolbar>
    </MuiAppBar>
  );
}

AppBar.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
};
