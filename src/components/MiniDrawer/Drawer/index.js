import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useLocation, Link } from 'react-router-dom';
import { DrawerItem } from '../../../components';
import SingleOptionItem from '../SingleOptionItem';
import profilePlaceholder from '../../../public/images/profile-placeholder.png';
import { optionsList, singleOptionList } from '../../constants/optionsList';
import {
  Box,
  styled,
  Drawer as MuiDrawer,
  Typography,
  makeStyles,
  Divider,
  withStyles,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { HeadingColor, GrayColor, primaryColor } from '../../constants/theme';

const drawerWidth = 280;

const ImageWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
});

const DividerWrapper = styled(Box)({
  padding: '18px 0px',
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
const StyledDivider = withStyles({
  root: {
    background: GrayColor,
  },
})(Divider);

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    borderRight: '0px',
    background: primaryColor,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    background: primaryColor,
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
      {open ? (
        <div>
          <CompanyNameWrapper>
            <Link
              to={'/'}
              style={{ textDecoration: 'none', cursor: 'pointer' }}
            >
              <CompanyNameTyp>BITS</CompanyNameTyp>
            </Link>
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
      ) : (
        <DrawerItem
          option={{
            title: 'Home',
            icon: <HomeIcon style={{ color: '#FFFF' }} />,
            menuArr: [],
            defaultPath: '/',
          }}
          open={open}
        />
      )}

      <div>
        {optionsList.map((option, index) => (
          <DrawerItem option={option} key={index} open={open} />
        ))}
        <DividerWrapper>
          {' '}
          <StyledDivider />{' '}
        </DividerWrapper>

        {singleOptionList.map((option, index) => (
          <SingleOptionItem option={option} key={index} />
        ))}
      </div>
    </MuiDrawer>
  );
}

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
};
