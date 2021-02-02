import React from 'react';
import PropTypes from 'prop-types';
import profile from '../../../../public/images/amin.jpg';
import { styled, Box, Typography } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import {
  LinkColor,
  HeadingColor,
  HoverColor,
  HomeIconDefaultColor,
  BackgroundColor,
} from '../../../constants/theme';
const globalTypStyle = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  fontSize: 14,
  fontWeight: 400,
  paddingLeft: 12,
};
const AboutWrapper = styled(Box)({
  padding: '5px 0px 0px 15px',
  background: BackgroundColor,
});
const ProfileWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingBottom: 12,
});
const NameTyp = styled(Typography)({
  fontSize: 16,
  fontWeight: 600,
});
const FlexWrapper = styled(Box)({
  display: 'flex',
  paddingBottom: 12,
});
const EmailTyp = styled(Typography)({
  ...globalTypStyle,
  color: LinkColor,
});
const InfoTyp = styled(Typography)({
  ...globalTypStyle,
});

const EditOuterWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
});
const EditWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  width: 40,
  cursor: 'pointer',
  borderRadius: 5,
  background: HeadingColor,
  '&:hover': {
    background: HoverColor,
  },
});
const EditTyp = styled(Typography)({
  color: 'rgba(0, 0, 0, 0.85)',
  fontSize: 14,
  '&:hover': {
    color: HeadingColor,
  },
});
const EmptyWrapper = styled(Box)({
  width: '100%',
  height: 2,
  background: HomeIconDefaultColor,
  marginTop: 12,
});
function About(props) {
  return (
    <AboutWrapper>
      <ProfileWrapper>
        <img
          src={profile}
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
          }}
        />

        <NameTyp>Amin</NameTyp>
      </ProfileWrapper>
      <FlexWrapper>
        <EmailIcon />
        <EmailTyp>aminrafaey543@gmail.com</EmailTyp>
      </FlexWrapper>
      <FlexWrapper>
        {' '}
        <PhoneIcon />
        <InfoTyp>03348035644</InfoTyp>
      </FlexWrapper>
      <FlexWrapper>
        <LinkIcon />
        <InfoTyp>Customer since: 24-05-14</InfoTyp>
      </FlexWrapper>
      <FlexWrapper>
        <LocationOnIcon />
        <InfoTyp>Shad Bagh</InfoTyp>
      </FlexWrapper>
      <EditOuterWrapper>
        {' '}
        <EditWrapper>
          <EditTyp> Edit</EditTyp>
        </EditWrapper>
      </EditOuterWrapper>
      <EmptyWrapper />
    </AboutWrapper>
  );
}
About.propTypes = {};

export default About;
