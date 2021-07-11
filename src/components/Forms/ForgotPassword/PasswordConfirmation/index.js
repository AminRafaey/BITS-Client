import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { TextField, Alert } from '../../../HOC';
import { resetPassword } from '../../../../api/Auth';
import {
  Box,
  styled,
  CircularProgress,
  InputAdornment,
} from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import config from '../../../../config.json';

import {
  StyledIconButton,
  StyledButton,
  TextFieldErrorTyp,
  FormParentWrapper,
  FormWrapper,
  LogoTyp,
  FreeAccountTyp,
  AgreeTyp,
  PolicyTyp,
} from '../../SignUp';

const ImageWrapper = styled(Box)({
  minWidth: '100%',
  minHeight: '100vh',
  backgroundImage: `url(${config.baseUrl}images/forgot-password-password-confirmation.jpg)`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  position: 'relative',
  backgroundBlendMode: 'overlay',
  backgroundColor: '#4A474A',
});

function SignUp(props) {
  const history = useHistory();
  const search = useLocation().search;
  const token = new URLSearchParams(search).get('token');

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [isSubmitCicked, setIsSubmitClicked] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    !isSubmitCicked && setIsSubmitClicked(true);
    if (!password || !confirmPassword) return;
    setLoading(true);

    resetPassword(
      {
        password,
        confirmPassword,
      },
      token
    )
      .then((res) => {
        setLoading(false);
        history.push(`/signIn`);
      })
      .catch((err) => {
        err && setError(err);
        setLoading(false);
      });
  };
  return (
    <ImageWrapper>
      <FormParentWrapper>
        <FormWrapper>
          <LogoTyp>BITS</LogoTyp>
          <FreeAccountTyp>You are about to change your password</FreeAccountTyp>
          {Object.entries(error).length > 0 && (
            <>
              <Alert severity="error">{error.message}</Alert> <Box p={0.75} />
            </>
          )}

          <TextField
            variant="outlined"
            size="medium"
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && handleSubmit()}
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
          <TextFieldErrorTyp>
            {isSubmitCicked && !password ? 'This field is required.' : ''}
          </TextFieldErrorTyp>

          <Box p={0.75} />
          <TextField
            variant="outlined"
            size="medium"
            placeholder="Confirm Password"
            type={'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <TextFieldErrorTyp>
            {isSubmitCicked && !confirmPassword
              ? 'This field is required.'
              : ''}
          </TextFieldErrorTyp>

          <AgreeTyp>Didn't ask for password reset? </AgreeTyp>
          <Link
            to={'/'}
            style={{
              textDecoration: 'none',
              color: 'rgba(0, 0, 0, 0.87)',
            }}
          >
            <PolicyTyp>Return to Login</PolicyTyp>
          </Link>
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress color="primary" size={28} />
            </Box>
          ) : (
            <StyledButton onClick={handleSubmit}>Reset Password</StyledButton>
          )}
        </FormWrapper>
      </FormParentWrapper>
    </ImageWrapper>
  );
}

SignUp.propTypes = {};

export default SignUp;
