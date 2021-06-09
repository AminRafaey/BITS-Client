import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Typography,
  styled,
  Grid,
  CircularProgress,
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormControl,
  withStyles,
  Button as MuiButton,
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

const StyledFormControl = withStyles({
  root: {
    width: '100%',
    paddingBottom: 10,
  },
})(FormControl);

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

function SignIn(props) {
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
            <StyledFormControl size="small" variant="outlined">
              <OutlinedInput
                placeholder="email or username"
                value={values.email}
                onChange={handleChange('email')}
                endAdornment={
                  <InputAdornment position="end">
                    <StyledEmailIcon />
                  </InputAdornment>
                }
                labelWidth={0}
              />
            </StyledFormControl>

            <StyledFormControl size="small" variant="outlined">
              <OutlinedInput
                placeholder="Password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </StyledFormControl>
            <ForgotTyp>Forgot Passowrd</ForgotTyp>
            <StyledButton>Sign In</StyledButton>
            <SignUpWrapper>
              <SignUpHelperTyp>Do not have an account?</SignUpHelperTyp>
              <SignUpTyp> Sign Up</SignUpTyp>
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
