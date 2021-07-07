import React, { useState } from 'react';
import PropTypes from 'prop-types';
import phone from 'phone';
import { useHistory } from 'react-router-dom';
import PhoneNumber from '../PhoneNumber';
import { isEmailValid } from '../Lead';
import { TextField, Alert } from '../../HOC';
import { createAdmin } from '../../../api/Admin';
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

import config from '../../../config.json';

import {
  HoverColor,
  HeadingColor,
  HighlightColor,
  LinkColor,
} from '../../constants/theme';

const ImageWrapper = styled(Box)({
  minWidth: '100%',
  minHeight: '100vh',
  backgroundImage: `url(${config.baseUrl}images/Sign-Up-Page-BG.jpeg)`,
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
  fontWeight: 'bolder',
  paddingTop: 25,
  paddingBottom: 20,
});
const FreeAccountTyp = styled(Typography)({
  display: 'flex',
  justifyContent: 'center',
  color: '#ffff',
  fontSize: 12,
  fontWeight: 'bolder',
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
const MobileNumberTyp = styled(Typography)({
  paddingBlock: 12,
  color: '#ffff',
  fontSize: 12,
  textAlign: 'center',
});

const SignUpWrapper = styled(Box)({
  paddingTop: 20,
  display: 'flex',
  justifyContent: 'center',
});

const SignInHelperTyp = styled(Typography)({
  fontSize: 12,
  color: '#ffff',
});

const SignUpTyp = styled(Typography)({
  color: LinkColor,
  fontSize: 12,
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

const TextFieldErrorTyp = styled(Typography)({
  color: '#f44336',
  margin: '4px 14px 0px',
  fontSize: '0.75rem',
});
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

function SignUp(props) {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [isSubmitCicked, setIsSubmitClicked] = useState(false);
  const [email, setEmail] = useState('aminrafaey543@gmail.com');
  const [password, setPassword] = useState('1234');
  const [userName, setUserName] = useState('amin');
  const [fullName, setFullName] = useState('Amin');
  const [loading, setLoading] = useState(false);
  const [phoneDetails, setPhoneDetails] = useState({});
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    !isSubmitCicked && setIsSubmitClicked(true);
    if (!password || !email || !fullName || !userName || !phoneDetails.phone)
      return;
    const phoneCode = phoneDetails.phoneCode;
    const mobileNumber = phoneDetails.phone;

    if (!isEmailValid(email)) {
      setError({
        name: 'email',
        message: 'Invalid Email',
      });
      return;
    } else if (phone(phoneCode + mobileNumber).length === 0) {
      setError({ name: 'mobileNumber', message: 'Invalid mobile Number' });
      return;
    }

    setLoading(true);

    createAdmin({
      email,
      userName,
      fullName,
      password,
      mobileNumber: phoneCode + mobileNumber,
    })
      .then((res) => {
        setLoading(false);
        history.push(`/validateEmail/?email=${email}&userId=${res.data._id}`);
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
          <FreeAccountTyp>Register your free account</FreeAccountTyp>
          {Object.entries(error).length > 0 && (
            <>
              <Alert severity="error">{error.message}</Alert> <Box p={0.75} />
            </>
          )}
          <PhoneNumber
            personInfo={phoneDetails}
            setPersonInfo={setPhoneDetails}
          />
          <TextFieldErrorTyp>
            {isSubmitCicked && !phoneDetails.phone
              ? 'This field is required.'
              : ''}
          </TextFieldErrorTyp>
          <MobileNumberTyp>
            This will be the mobile number you and your team will use to log in
            to WhatsApp
          </MobileNumberTyp>
          <TextField
            variant="outlined"
            size="medium"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextFieldErrorTyp>
            {isSubmitCicked && !fullName ? 'This field is required.' : ''}
          </TextFieldErrorTyp>
          <Box p={0.75} />
          <TextField
            variant="outlined"
            size="medium"
            placeholder="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextFieldErrorTyp>
            {isSubmitCicked && !userName ? 'This field is required.' : ''}
          </TextFieldErrorTyp>
          <Box p={0.75} />
          <TextField
            variant="outlined"
            size="medium"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && handleSubmit()}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <StyledEmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextFieldErrorTyp>
            {isSubmitCicked && !email ? 'This field is required.' : ''}
            {email && !isEmailValid(email) ? 'Invalid Email' : ''}
          </TextFieldErrorTyp>
          <Box p={0.75} />
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
          <AgreeTyp>By clicking sign up, I agree to Agile BITS's</AgreeTyp>
          <PolicyTyp>Terms of Service & Privacy Policy</PolicyTyp>
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress color="primary" size={28} />
            </Box>
          ) : (
            <StyledButton onClick={handleSubmit}>Sign Up</StyledButton>
          )}
          <SignUpWrapper>
            <SignInHelperTyp>Already have an account?</SignInHelperTyp>
            <SignUpTyp> Sign In</SignUpTyp>
          </SignUpWrapper>
        </FormWrapper>
      </FormParentWrapper>
    </ImageWrapper>
  );
}

SignUp.propTypes = {};

export default SignUp;
