import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { TextField } from '../../HOC';
import { verifyEmployeeAccount } from '../../../api/Auth';
import { useUserDispatch, loadUser } from '../../../Context/User';
import {
  Box,
  Typography,
  styled,
  CircularProgress,
  IconButton,
  InputAdornment,
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
} from '../../constants/theme';
import config from '../../../config.json';
const ImageWrapper = styled(Box)({
  minWidth: '100%',
  minHeight: '100vh',
  backgroundImage: `url("https://icecube-eu-832.icedrive.io/thumbnail?p=EoL8Ll8BC1sSO5A4a4JtDlMmjU5N9M7%2Bc8x6IkCkDrynpwCHligxI3lEXXSCSLO9WKXagl%2BZ2g58fwjFzgfSaMP2zq2IdvA7sWmB3LGBe6pltkYcBTpMFYMDXY5%2BVMwe&w=1280&h=1280&m=cropped")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  position: 'relative',
  backgroundBlendMode: 'overlay',
  backgroundColor: '#4A474A',
});

const FormParentWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  padding: '50px 50px 0px',
});
const FormWrapper = styled(Box)({
  width: 300,
});
const LogoTyp = styled(Typography)({
  display: 'flex',
  justifyContent: 'center',
  fontSize: 28,
  color: '#ffff',
  fontFamily: 'Medium',
  paddingTop: 25,
  paddingBottom: 20,
});
const FreeAccountTyp = styled(Typography)({
  display: 'flex',
  justifyContent: 'center',
  color: '#ffff',
  fontSize: 12,
  fontFamily: 'Medium',
});
const AgreeTyp = styled(Typography)({
  paddingTop: 15,
  display: 'flex',
  justifyContent: 'center',
  color: '#ffff',
  fontSize: 12,
});
const PolicyTyp = styled(Typography)({
  display: 'flex',
  justifyContent: 'center',
  color: LinkColor,
  fontSize: 12,
  paddingBottom: 20,
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

function AccountVerification(props) {
  const history = useHistory();
  const search = useLocation().search;
  const token = new URLSearchParams(search).get('token');

  const userDispatch = useUserDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitCicked, setIsSubmitClicked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const _id = useRef('');

  useEffect(() => {
    if (!token) {
      window.location.href = config.baseUrl + 'signIn/';
      return;
    }
    const decoded = jwtDecode(token);
    if (decoded.email && decoded._id) {
      setEmail(decoded.email);
      _id.current = decoded._id;
    } else {
      window.location.href = config.baseUrl + 'signIn/';
    }
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    !isSubmitCicked && setIsSubmitClicked(true);
    if (!password || !userName) return;
    setLoading(true);

    verifyEmployeeAccount(_id.current, userName, password)
      .then((res) => {
        loadUser(userDispatch, { token: res.token });
        setLoading(false);
        history.push('/');
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };
  return (
    <ImageWrapper>
      <FormParentWrapper>
        <FormWrapper>
          <LogoTyp>BITS</LogoTyp>
          <FreeAccountTyp>Finish up account registration</FreeAccountTyp>
          {error && <ErrorTyp>{error}</ErrorTyp>}

          <TextField
            variant="outlined"
            size="medium"
            placeholder="email"
            value={email}
            disabled={true}
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
            size="medium"
            placeholder="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            error={isSubmitCicked ? (userName ? false : true) : false}
            helperText={
              isSubmitCicked ? (userName ? '' : 'This field is required') : ''
            }
          />
          <Box p={0.75} />
          <TextField
            variant="outlined"
            size="medium"
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
          <AgreeTyp>By clicking sign up, I agree to Agile BITS's</AgreeTyp>
          <PolicyTyp>Terms of Service & Privacy Policy</PolicyTyp>
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress color="primary" size={28} />
            </Box>
          ) : (
            <StyledButton onClick={handleSubmit}>Sign Up</StyledButton>
          )}
        </FormWrapper>
      </FormParentWrapper>
    </ImageWrapper>
  );
}

AccountVerification.propTypes = {};

export default AccountVerification;
