import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { auth } from '../../../../api/Auth';
import {
  Box,
  styled,
  Grid,
  CircularProgress,
  InputAdornment,
  TextField,
} from '@material-ui/core';

import { isEmailValid } from '../../Lead/index';
import config from '../../../../config.json';

import {
  StyledButton,
  StyledEmailIcon,
  ErrorTyp,
  SignInWrapper,
  SignInTyp,
  SignUpWrapper,
  SignUpHelperTyp,
  SignUpTyp,
} from '../../SignIn';

const ImageWrapper = styled(Box)({
  minWidth: '100%',
  minHeight: '80vh',
  backgroundImage: `url(${config.baseUrl}images/forgot-password-email-confirmation.jpg)`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  borderTopLeftRadius: 4,
  borderBottomLeftRadius: 4,
  position: 'relative',
});

const RightWrapper = styled(Box)({
  height: 'calc(100% - 50px)',
  padding: '50px 45px 0px',
  backgroundColor: 'white',
  borderTopRightRadius: 4,
  borderBottomRightRadius: 4,
});

function EmailConfirmation(props) {
  const [error, setError] = useState('');
  const [isSubmitCicked, setIsSubmitClicked] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    !isSubmitCicked && setIsSubmitClicked(true);
    if (!isEmailValid(email)) return;
    setLoading(true);
    auth(email, password)
      .then((res) => {
        setLoading(false);
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
            <SignInTyp>Forgot Password?</SignInTyp>
            {error && <ErrorTyp>{error}</ErrorTyp>}
            <TextField
              variant="outlined"
              size="small"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && handleSubmit()}
              error={
                isSubmitCicked ? (isEmailValid(email) ? false : true) : false
              }
              helperText={
                isSubmitCicked
                  ? isEmailValid(email)
                    ? ''
                    : 'Invalid Email'
                  : ''
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <StyledEmailIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Box mb={3.15} />
            {loading ? (
              <Box display="flex" justifyContent="center">
                <CircularProgress color="primary" size={28} />
              </Box>
            ) : (
              <StyledButton onClick={handleSubmit}>Submit</StyledButton>
            )}
            <SignUpWrapper>
              <SignUpHelperTyp>Already have an account?</SignUpHelperTyp>
              <Link
                to={'signIn'}
                style={{
                  textDecoration: 'none',
                  color: 'rgba(0, 0, 0, 0.87)',
                }}
              >
                <SignUpTyp> Login</SignUpTyp>
              </Link>
            </SignUpWrapper>
          </RightWrapper>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </SignInWrapper>
  );
}

EmailConfirmation.propTypes = {};

export default EmailConfirmation;
