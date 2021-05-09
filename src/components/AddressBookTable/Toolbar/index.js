import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InfoAlert from '../../Assets/InfoAlert';
import { WhatsAppIcon } from '../../../resources';
import { useSocketState } from '../../../Context/Socket';
import { sendTextMesage, sendMedia } from '../../../api/send';
import {
  Toolbar as MuiToolbar,
  Typography,
  IconButton,
  Tooltip,
  makeStyles,
  styled,
  Box,
  Fade,
} from '@material-ui/core';
import { HeadingColor, DarkBackgroundColor } from '../../constants/theme';
import { useLeadsState } from '../../../Context/Lead';
import { useConnectStatusState } from '../../../Context/ConnectStatus';

const ToolbarWrapper = styled(Box)({
  marginTop: 23,
});
const ItemTyp = styled(Typography)({
  color: HeadingColor,
  fontSize: 14,
});

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    height: 58,
    color: HeadingColor,
    backgroundColor: DarkBackgroundColor,
  },
  title: {
    flex: '1 1 100%',
  },
}));

export default function Toolbar(props) {
  const classes = useToolbarStyles();
  const { numSelected, message, selectedMedia } = props;
  const [openInfoAlert, setOpenInfoAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const socket = useSocketState();
  const leadsState = useLeadsState();
  const connectStatusState = useConnectStatusState();

  const handleSend = () => {
    if (!connectStatusState) {
      setAlertMessage(
        'Disconnected from WhatsApp, please connect again to continue...'
      );
      setOpenInfoAlert(true);
      return;
    }
    if (!message && selectedMedia.file === undefined) {
      setAlertMessage(
        "Message body can't be empty, Please type a message to continue..."
      );
      setOpenInfoAlert(true);
      return;
    }
    if (numSelected === 0) {
      setAlertMessage('Please select one or more contact to continue...');
      setOpenInfoAlert(true);
      return;
    }
    const contantList = leadsState
      .filter((l) => l.selected && l.phone)
      .map((l) => l.phone.replace('+', ''));
    if (selectedMedia.file === undefined) {
      sendTextMesage(contantList, message, socket);
    } else if (selectedMedia.file) {
      const formData = new FormData();
      formData.append('mobileNumbers', JSON.stringify(contantList));
      formData.append('message', message);
      formData.append('file', selectedMedia.file);
      formData.append('mediaType', selectedMedia.type);
      sendMedia(formData, socket);
    }
  };
  return (
    <ToolbarWrapper>
      <MuiToolbar className={classes.root}>
        <ItemTyp className={classes.title}>{numSelected} selected</ItemTyp>
        <Tooltip
          title="Send WhatsApp"
          placement={'top'}
          arrow
          interactive
          TransitionComponent={Fade}
        >
          <IconButton aria-label="Send WhatsApp" onClick={() => handleSend()}>
            <WhatsAppIcon />
          </IconButton>
        </Tooltip>
      </MuiToolbar>
      <InfoAlert
        open={openInfoAlert}
        setOpen={setOpenInfoAlert}
        title={'WhatsApp'}
        message={alertMessage}
      />
    </ToolbarWrapper>
  );
}

Toolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  selectedMedia: PropTypes.object.isRequired,
};
