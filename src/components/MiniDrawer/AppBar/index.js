import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  withStyles,
  Box,
  styled,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  makeStyles,
  useTheme,
  IconButton,
  ListItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { HighlightColor } from '../../constants/theme';
import { appBarList } from '../../constants/optionsList';
const drawerWidth = 280;

const OptionTyp = styled(Typography)({
  color: '#FFFFFF',
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
  const { open, handleDrawerOpen } = props;
  const classes = useStyles();

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
            <ListItem button key={index}>
              <OptionTyp>{option.title}</OptionTyp>
            </ListItem>
          ))}
        </AppBarListWrapper>
      </StyledToolbar>
    </MuiAppBar>
  );
}

AppBar.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
};
