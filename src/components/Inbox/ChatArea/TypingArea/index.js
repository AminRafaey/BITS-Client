import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TemplateMultiSelect from '../../../QuickSend/TemplateMultiSelect';
import { useSocketState } from '../../../../Context/Socket';
import { sendTextMesage } from '../../../../api/send';
import { styled, Box } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { HeadingColor, GrayColor } from '../../../constants/theme';
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
  height: '95%',
});

const TextAreaWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  padding: '0px 10px',
  height: 'calc(100% - 77px)',
});

const TemplateSelectWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '0px 10px 0px',
});

const FotterWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '3px 10px',
  borderTop: `1px solid ${GrayColor}`,
});

const SendWrapper = styled(Box)({
  cursor: 'pointer',
});
function TypingArea(props) {
  const {
    currentChatJid,
    setSelectedTemplate,
    message,
    setMessage,
    selectedMedia,
    setSelectedMedia,
  } = props;
  const [textAreaVal, setTextAreaVal] = useState('');
  const socket = useSocketState();

  useEffect(() => {
    setTextAreaVal(message);
  }, [message]);

  const handleSend = () => {
    if (selectedMedia.file === undefined) {
      sendTextMesage([currentChatJid.split('@')[0]], message, socket);
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
  };

  return (
    <TypingAreaWrapper>
      <TemplateSelectWrapper>
        <TemplateMultiSelect
          type={'inbox'}
          setSelectedTemplate={setSelectedTemplate}
        />
      </TemplateSelectWrapper>
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
        {' '}
        <SendWrapper onClick={() => handleSend()}>
          <SendIcon />
        </SendWrapper>
      </FotterWrapper>
    </TypingAreaWrapper>
  );
}

TypingArea.propTypes = {
  currentChatJid: PropTypes.string.isRequired,
  setSelectedTemplate: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  selectedMedia: PropTypes.object.isRequired,
  setSelectedMedia: PropTypes.func.isRequired,
};

export default TypingArea;
