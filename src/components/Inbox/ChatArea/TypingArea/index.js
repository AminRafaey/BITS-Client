import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import TemplateMultiSelect from '../../../QuickSend/TemplateMultiSelect';
import { InfoAlert } from '../../../Assets';
import MediaSending from './MediaSending';
import { useSocketState } from '../../../../Context/Socket';
import { useChatDispatch, addMessage } from '../../../../Context/Chat';
import { useLeadsState } from '../../../../Context/Lead';
import { useConnectStatusState } from '../../../../Context/ConnectStatus';
import { sendTextMesage, sendTextMesageOnGroup } from '../../../../api/send';
import { styled, Box } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import {
  HeadingColor,
  GrayColor,
  DarkHoverColor,
  primaryColor,
} from '../../../constants/theme';
import { keywords } from '../../../../Static/Keyword';
const textAreaStyle = {
  resize: 'none',
  border: `0px solid #ffff`,
  outlineWidth: '0px',
  width: '100%',
  height: '100%',
  fontSize: 14,
};

const TypingAreaWrapper = styled(Box)({
  background: HeadingColor,
  border: `1px solid ${GrayColor}`,
  marginRight: 2,
  width: '100%',
  height: '98%',
  display: 'flex',
  flexDirection: 'column',
});

const TextAreaWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  padding: '0px 10px',
  height: '100%',
});

const TemplateSelectWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '0px 10px 0px',
});

const FotterWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '2px 10px',
  borderTop: `1px solid ${GrayColor}`,
});

const SendWrapper = styled(Box)({
  height: 24,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1px 2px',
  '&:hover': {
    background: DarkHoverColor,
  },
  '&:active': {
    background: primaryColor,
  },
});
const TypingAndSendingAreaWrapper = styled(Box)({
  justifyContent: 'space-between',
  flexDirection: 'column',
  display: 'flex',
  height: '100%',
});
function TypingArea(props) {
  const {
    currentChatJid,
    selectedTemplate,
    setSelectedTemplate,
    message,
    setMessage,
    selectedMedia,
    setSelectedMedia,
  } = props;
  const [textAreaVal, setTextAreaVal] = useState('');
  const socket = useSocketState();
  const chatDispatch = useChatDispatch();
  const leadsState = useLeadsState();
  const connectStatusState = useConnectStatusState();
  const [alertMessage, setAlertMessage] = useState('');
  const [openInfoAlert, setOpenInfoAlert] = useState(false);
  const selectedLeadRef = useRef(
    leadsState.find((l) => l.phone === '+' + currentChatJid.split('@')[0])
  );

  useEffect(() => {
    let convertedMsg = message;
    selectedLeadRef.current &&
      keywords.map((k) => {
        convertedMsg = convertedMsg.replaceAll(
          `__${k.title}__`,
          selectedLeadRef.current[k.value]
        );
      });
    setTextAreaVal(convertedMsg);
  }, [message]);

  const handleSend = () => {
    if (!connectStatusState) {
      setAlertMessage(
        'Disconnected from WhatsApp, please connect again to continue...'
      );
      setOpenInfoAlert(true);
      return;
    }
    if (selectedMedia.file === undefined) {
      currentChatJid.split('@')[1] === 's.whatsapp.net'
        ? sendTextMesage([currentChatJid.split('@')[0]], message, socket)
        : sendTextMesageOnGroup(currentChatJid, message, socket);
    } else if (selectedMedia.file) {
      const formData = new FormData();
      formData.append(
        'mobileNumbers',
        JSON.stringify([currentChatJid.split('@')[0]])
      );
      formData.append('message', message);
      formData.append('file', selectedMedia.file);
      formData.append('mediaType', selectedMedia.type);
      sendMedia(formData, socket);
    }

    setTextAreaVal('');
    setMessage('');
  };

  return (
    <TypingAreaWrapper>
      <TemplateSelectWrapper>
        <TemplateMultiSelect
          type={'inbox'}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />
      </TemplateSelectWrapper>
      <TypingAndSendingAreaWrapper>
        <TextAreaWrapper>
          <textarea
            style={textAreaStyle}
            value={textAreaVal}
            id="templateTextArea"
            placeholder="Type a message..."
            onChange={(e) => {
              setTextAreaVal(e.target.value);
            }}
            onBlur={(e) => setMessage(e.target.value)}
          />
        </TextAreaWrapper>
        <FotterWrapper>
          <MediaSending />
          <SendWrapper onClick={() => handleSend()}>
            <SendIcon style={{ height: 24, width: 24 }} />
          </SendWrapper>
        </FotterWrapper>
      </TypingAndSendingAreaWrapper>
      <InfoAlert
        open={openInfoAlert}
        setOpen={setOpenInfoAlert}
        title={'WhatsApp'}
        message={alertMessage}
      />
    </TypingAreaWrapper>
  );
}

TypingArea.propTypes = {
  currentChatJid: PropTypes.string.isRequired,
  selectedTemplate: PropTypes.object.isRequired,
  setSelectedTemplate: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  selectedMedia: PropTypes.object.isRequired,
  setSelectedMedia: PropTypes.func.isRequired,
};

export default TypingArea;
