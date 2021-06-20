import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { auth } from '../../../api/Auth';
import { useUserDispatch, loadUser } from '../../../Context/User';
import {
  Box,
  Typography,
  styled,
  Grid,
  CircularProgress,
  IconButton,
  InputAdornment,
  withStyles,
  Button as MuiButton,
  TextField,
} from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import EmailIcon from '@material-ui/icons/Email';

import {
  HoverColor,
  HeadingColor,
  HighlightColor,
  LinkColor,
  BackgroundColor,
} from '../../constants/theme';

const SignInWrapper = styled(Box)({
  minWidth: '100vw',
  minHeight: '80vh',
  background: BackgroundColor,
  paddingTop: '10vh',
  paddingBottom: '10vh',
});

const ImageWrapper = styled(Box)({
  minWidth: '100%',
  minHeight: '80vh',
  backgroundImage: `url("/src/public/images/login-new.png")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  borderTopLeftRadius: 4,
  borderBottomLeftRadius: 4,
  position: 'relative',
});

const RightWrapper = styled(Box)({
  height: 'calc(100% - 50px)',
  padding: '50px 50px 0px',
  backgroundColor: 'white',
  borderTopRightRadius: 4,
  borderBottomRightRadius: 4,
});

const SignInTyp = styled(Typography)({
  fontSize: 20,
  color: '#263238 !important',
  paddingTop: 50,
  paddingBottom: 20,
});

const ForgotTyp = styled(Typography)({
  display: 'flex',
  justifyContent: 'flex-end',
  color: LinkColor,
  fontSize: 10,
  paddingBottom: 20,
  '&:hover': {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
});

const SignUpWrapper = styled(Box)({
  paddingTop: 20,
  display: 'flex',
  justifyContent: 'center',
});

const SignUpHelperTyp = styled(Typography)({
  fontSize: 10,
  color: '#78909c',
});

const SignUpTyp = styled(Typography)({
  color: LinkColor,
  fontSize: 10,
  whiteSpace: 'pre',
  '&:hover': {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
});
const ErrorTyp = styled(Typography)({
  color: '#EB4137',
  paddingBottom: 4,
  fontSize: 12,
});

const StyledEmailIcon = withStyles({
  root: {
    fill: 'rgba(0, 0, 0, 0.54)',
  },
})(EmailIcon);

const StyledButton = withStyles({
  root: {
    width: '100%',
    background: HighlightColor,
    paddingTop: '10px',
    paddingBottom: '10px',
    borderRadius: 4,
  },
  label: {
    fontSize: 13,
    fontFamily: 'Regular',
    color: HeadingColor,
    textTransform: 'none',
  },
  contained: {
    '&:hover': {
      background: HoverColor,
    },
  },
})(MuiButton);

const StyledIconButton = withStyles({
  root: {
    padding: 0,
  },
})(IconButton);

function SignIn(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitCicked, setIsSubmitClicked] = useState(false);
  const [email, setEmail] = useState('amin@gmail.com');
  const [password, setPassword] = useState('1234');
  const [loading, setLoading] = useState(false);
  const userDispatch = useUserDispatch();
  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: { pathname: '/' } };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    !isSubmitCicked && setIsSubmitClicked(true);
    if (!password || !email) return;
    setLoading(true);
    auth(email, password)
      .then((res) => {
        loadUser(userDispatch, { token: res.token });
        setLoading(false);
        history.push(from.pathname);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };
  return (
    <SignInWrapper>
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={5}>
          <ImageWrapper />
        </Grid>
        <Grid item xs={3}>
          <RightWrapper>
            <SignInTyp>Sign In</SignInTyp>
            {error && <ErrorTyp>{error}</ErrorTyp>}
            <TextField
              variant="outlined"
              size="small"
              placeholder="email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && handleSubmit()}
              error={isSubmitCicked ? (email ? false : true) : false}
              helperText={
                isSubmitCicked ? (email ? '' : 'This field is required') : ''
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <StyledEmailIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Box p={0.75} />

            <TextField
              variant="outlined"
              size="small"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && handleSubmit()}
              error={isSubmitCicked ? (password ? false : true) : false}
              helperText={
                isSubmitCicked ? (password ? '' : 'This field is required') : ''
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <StyledIconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </StyledIconButton>
                  </InputAdornment>
                ),
              }}
            />

            <ForgotTyp>Forgot Passowrd</ForgotTyp>
            {loading ? (
              <Box display="flex" justifyContent="center">
                <CircularProgress color="primary" size={28} />
              </Box>
            ) : (
              <StyledButton onClick={handleSubmit}>Sign In</StyledButton>
            )}
            <SignUpWrapper>
              <SignUpHelperTyp>Do not have an account?</SignUpHelperTyp>
              <Link
                to={'signUp'}
                style={{
                  textDecoration: 'none',
                  color: 'rgba(0, 0, 0, 0.87)',
                }}
              >
                <SignUpTyp> Sign Up</SignUpTyp>
              </Link>
            </SignUpWrapper>
          </RightWrapper>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </SignInWrapper>
  );
}

SignIn.propTypes = {};

export default SignIn;
