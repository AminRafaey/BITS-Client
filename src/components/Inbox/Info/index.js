import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import About from './About';
import LabelArea from './LabelArea';
import Notes from './Notes';
import CreateLead from '../../Forms/Lead/Create';
import { Button } from '../../HOC';
import {
  useLeadsState,
  useLeadsDispatch,
  addLead,
} from '../../../Context/Lead';
import { getLeadByPhone, updateLeadWithContext } from '../../../api/Lead';
import { styled, Box, CircularProgress, Typography } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { HomeIconDefaultColor, BackgroundColor } from '../../constants/theme';
import { initLeadData } from '../../constants/InitialValues';

const InfoWrapper = styled(Box)({
  height: '100vh',
  overflowY: 'scroll',
  background: BackgroundColor,
});

export const EmptyWrapper = styled(Box)({
  width: '100%',
  height: 1,
  background: HomeIconDefaultColor,
});
const LoaderWrapper = styled(Box)({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
const ButtonWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: 16,
});
const NotAddedInContactTyp = styled(Typography)({
  textAlign: 'center',
});
const IconWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  padding: 8,
});
function Info(props) {
  const { currentChatJid } = props;
  const [loader, setLoader] = useState(true);
  const [notAddedInDB, setNotAddedInDB] = useState(false);
  const [selectedLead, setSelectedLead] = useState({});
  const leadsState = useLeadsState();
  const leadsDispatch = useLeadsDispatch();
  const [openCreateLabelModal, setOpenCreateLabelModal] = useState(false);
  const selectedLeadRef = useRef(null);

  useEffect(() => {
    setLoader(true);
    if (
      !leadsState.find((l) => l.phone === '+' + currentChatJid.split('@')[0])
    ) {
      getLeadByPhone('+' + currentChatJid.split('@')[0])
        .then((res) => {
          if (res) {
            addLead(leadsDispatch, { leadData: res });
            setSelectedLead(res);
          } else {
            setNotAddedInDB(true);
          }
          setLoader(false);
        })
        .catch((err) => {});
    } else {
      setSelectedLead(
        leadsState.find((l) => l.phone === '+' + currentChatJid.split('@')[0])
      );
      setNotAddedInDB(false);
      setLoader(false);
    }
  }, [currentChatJid, leadsState]);

  useEffect(() => {
    selectedLeadRef.current = selectedLead;
  }, [selectedLead]);
  useEffect(() => {
    return () => {
      if (Object.entries(selectedLeadRef.current).length > 0) {
        const orignalData = leadsState.find(
          (l) => l._id === selectedLeadRef.current._id
        );
        if (
          JSON.stringify(orignalData) !==
          JSON.stringify(selectedLeadRef.current)
        ) {
          updateLeadWithContext(
            selectedLeadRef.current,
            leadsDispatch,
            leadsState.findIndex((l) => l._id === selectedLeadRef.current._id)
          );
          selectedLeadRef.current = {};
        }
      }
    };
  }, [currentChatJid]);

  if (loader) {
    return (
      <LoaderWrapper>
        <CircularProgress color="primary" />
      </LoaderWrapper>
    );
  }
  return (
    <InfoWrapper className="scrollElement">
      {notAddedInDB ? (
        <LoaderWrapper>
          <Box>
            <IconWrapper>
              <InfoOutlinedIcon />
            </IconWrapper>
            <NotAddedInContactTyp>
              This lead is not added to your contacts. Click the button to add.
            </NotAddedInContactTyp>
            <ButtonWrapper>
              <Button onClick={() => setOpenCreateLabelModal(true)}>
                Add Contact
              </Button>
            </ButtonWrapper>
          </Box>
          {openCreateLabelModal && (
            <CreateLead
              openModal={openCreateLabelModal}
              setOpenModal={setOpenCreateLabelModal}
              type={'createWithProvidedInfo'}
              editingLead={{
                ...initLeadData,
                phone: '+' + currentChatJid.split('@')[0],
              }}
              source={'From-Inbox'}
            />
          )}
        </LoaderWrapper>
      ) : (
        <React.Fragment>
          <About
            selectedLead={selectedLead}
            setSelectedLead={setSelectedLead}
          />
          <EmptyWrapper />
          <LabelArea
            selectedLead={selectedLead}
            setSelectedLead={setSelectedLead}
          />
          <EmptyWrapper />
          <Notes
            selectedLead={selectedLead}
            setSelectedLead={setSelectedLead}
          />
        </React.Fragment>
      )}
    </InfoWrapper>
  );
}

Info.propTypes = {
  currentChatJid: PropTypes.string.isRequired,
};

export default Info;
