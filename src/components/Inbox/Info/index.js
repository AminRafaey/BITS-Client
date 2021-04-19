import React, { useEffect, useState } from 'react';
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
import { getLeadByPhone } from '../../../api/Lead';
import { styled, Box, CircularProgress, Typography } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { HomeIconDefaultColor } from '../../constants/theme';
import { initLeadData } from '../../constants/InitialValues';

const InfoWrapper = styled(Box)({
  maxHeight: '100vh',
  overflowY: 'scroll',
});

const EmptyWrapper = styled(Box)({
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
  const leadsState = useLeadsState();
  const leadsDispatch = useLeadsDispatch();
  const [openCreateLabelModal, setOpenCreateLabelModal] = useState(false);

  useEffect(() => {
    setLoader(true);
    if (
      !leadsState.find((l) => l.phone === '+' + currentChatJid.split('@')[0])
    ) {
      getLeadByPhone('+' + currentChatJid.split('@')[0])
        .then((res) => {
          res
            ? addLead(leadsDispatch, { leadData: res })
            : setNotAddedInDB(true);
          setLoader(false);
        })
        .catch((err) => {});
    } else {
      setNotAddedInDB(false);
      setLoader(false);
    }
  }, [currentChatJid, leadsState]);

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
            />
          )}
        </LoaderWrapper>
      ) : (
        <React.Fragment>
          <About currentChatJid={currentChatJid} />
          <EmptyWrapper />
          <LabelArea />
          <EmptyWrapper />
          <Notes />
          <EmptyWrapper />
          <Notes />
          <EmptyWrapper />
          <Notes />
        </React.Fragment>
      )}
    </InfoWrapper>
  );
}

Info.propTypes = {
  currentChatJid: PropTypes.string.isRequired,
};

export default Info;
