import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Card,
  styled,
  Box,
  Typography,
  CardContent,
  withStyles,
} from '@material-ui/core';
import { Button } from '../../components/HOC';
import { BackgroundColor } from '../../components/constants/theme';

const EmailValidationWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  background: BackgroundColor,
  minHeight: '100vh',
});
const ActionWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginTop: 16,
  justifyContent: 'center',
});
const ContentTyp = styled(Typography)({
  fontSize: 14,
  display: 'inline',
});

const EmailTyp = styled(Typography)({
  fontSize: 14,
  fontFamily: 'Medium',
  display: 'inline',
  paddingLeft: 2,
});
const TitleTyp = styled(Typography)({
  fontSize: 14,
  color: 'rgba(0, 0, 0, 0.54)',
  paddingBottom: 16,
});
const StyledCard = withStyles({
  root: {
    maxWidth: '50%',
    height: 'fit-content',
    borderTop: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
})(Card);

function EmailValidation() {
  const search = useLocation().search;
  const email = new URLSearchParams(search).get('email');
  const userId = new URLSearchParams(search).get('userId');

  const handleResendEmail = () => {};

  return (
    <EmailValidationWrapper>
      <StyledCard variant="outlined">
        <CardContent>
          <TitleTyp>Please Confirm your email address</TitleTyp>
          <ContentTyp>
            You’re almost there! We just need to make sure it’s you. We have
            sent an email to
          </ContentTyp>
          <EmailTyp>{email ? email : ''}</EmailTyp>
          <Box pt={2} />
          <ContentTyp>
            Please check your inbox for confirmation email. Click the link in
            your email to complete your verification.
          </ContentTyp>
          <ActionWrapper>
            <ContentTyp>Didn't receive the email? </ContentTyp>
            <Button onClick={handleResendEmail} style={{ marginLeft: 24 }}>
              Send it again
            </Button>
          </ActionWrapper>
        </CardContent>
      </StyledCard>
    </EmailValidationWrapper>
  );
}

export default EmailValidation;
