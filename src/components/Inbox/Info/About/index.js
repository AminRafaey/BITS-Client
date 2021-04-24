import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CreateLead from '../../../Forms/Lead/Create';
import { Button, Tooltip } from '../../../HOC';
import { useLeadsState } from '../../../../Context/Lead';
import { styled, Box, Typography, Avatar } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import { LinkColor, HeadingColor, HoverColor } from '../../../constants/theme';
import { colors } from '../../../constants/AvatarColor';
import PublicIcon from '@material-ui/icons/Public';
import BusinessIcon from '@material-ui/icons/Business';

const iconStyling = {
  width: 17,
  height: 17,
};
const globalTypStyle = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  fontSize: 14,
  fontWeight: 400,
  paddingLeft: 6,
};
const AboutWrapper = styled(Box)({
  padding: '5px 0px 0px 5px',
});
const ProfileWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingBottom: 12,
});
const NameTyp = styled(Typography)({
  fontSize: 15,
  fontFamily: 'Medium',
  paddingTop: 10,
});
const FlexWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  paddingBottom: 12,
});
const EmailTyp = styled(Typography)({
  ...globalTypStyle,
  color: LinkColor,
});
const InfoTyp = styled(Typography)({
  ...globalTypStyle,
  whiteSpace: 'pre-line',
});

const EditOuterWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: 12,
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

function About(props) {
  const { selectedLead, setSelectedLead } = props;

  const [openCreateLabelModal, setOpenCreateLabelModal] = useState(false);
  const leadsState = useLeadsState();

  return (
    <AboutWrapper>
      {Object.entries(selectedLead).length > 0 && (
        <React.Fragment>
          <ProfileWrapper>
            <Avatar
              style={{
                color: '#ffff',
                width: 70,
                height: 70,
                background:
                  colors[
                    `${selectedLead.firstName} ${
                      selectedLead.lastName ? selectedLead.lastName : ''
                    }`
                      .split(' ')
                      .map((char) => char.charCodeAt(0))
                      .join('') % colors.length
                  ],
              }}
            >
              {`${selectedLead.firstName} ${selectedLead.lastName || ''}`
                .split(' ')
                .map((c) => c.charAt(0))
                .join('')}
            </Avatar>

            <NameTyp>{`${selectedLead.firstName} ${selectedLead.lastName}`}</NameTyp>
          </ProfileWrapper>
          <FlexWrapper>
            <EmailIcon style={{ ...iconStyling }} />
            <Tooltip title={selectedLead.email}>
              <EmailTyp>{selectedLead.email}</EmailTyp>
            </Tooltip>
          </FlexWrapper>
          <FlexWrapper>
            {' '}
            <PhoneIcon style={{ ...iconStyling }} />
            <InfoTyp>{selectedLead.phone}</InfoTyp>
          </FlexWrapper>

          <FlexWrapper>
            <BusinessIcon style={{ ...iconStyling }} />
            <InfoTyp>{selectedLead.companyName}</InfoTyp>
          </FlexWrapper>

          <FlexWrapper>
            <LinkIcon style={{ ...iconStyling }} />
            <Tooltip
              title={`${
                new Date(selectedLead.createdAt).toString().split('GMT')[0]
              }`}
            >
              <InfoTyp>{`Customer since:\n ${
                new Date(selectedLead.createdAt).toString().split('GMT')[0]
              }`}</InfoTyp>
            </Tooltip>
          </FlexWrapper>
          <FlexWrapper>
            <LocationOnIcon style={{ ...iconStyling }} />
            <InfoTyp>{selectedLead.address}</InfoTyp>
          </FlexWrapper>
          <FlexWrapper>
            <PublicIcon style={{ ...iconStyling }} />
            <InfoTyp>{selectedLead.country}</InfoTyp>
          </FlexWrapper>

          <EditOuterWrapper>
            {' '}
            <EditWrapper>
              <Button onClick={() => setOpenCreateLabelModal(true)}>
                Edit
              </Button>
            </EditWrapper>
          </EditOuterWrapper>
        </React.Fragment>
      )}
      {openCreateLabelModal && (
        <CreateLead
          openModal={openCreateLabelModal}
          setOpenModal={setOpenCreateLabelModal}
          type={'edit'}
          editingLead={{
            ...selectedLead,
          }}
          setSelectedLead={setSelectedLead}
          selectedLeadIndex={leadsState.findIndex(
            (l) => l._id === selectedLead._id
          )}
          source={'From-Inbox'}
        />
      )}
    </AboutWrapper>
  );
}
About.propTypes = {
  selectedLead: PropTypes.object.isRequired,
  setSelectedLead: PropTypes.func.isRequired,
};

export default About;
