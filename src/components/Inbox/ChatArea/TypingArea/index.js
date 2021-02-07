import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled, Box } from '@material-ui/core';
import TemplateSelect from './TemplateSelect';
import SendIcon from '@material-ui/icons/Send';
import {
  HeadingColor,
  HomeIconDefaultColor,
  HighlightColor,
} from '../../../constants/theme';
const textAreaStyle = {
  resize: 'none',
  border: `0px solid #ffff`,
  outlineWidth: '0px',
  width: '100%',
  height: '100%',
};

const TypingAreaWrapper = styled(Box)({
  background: HeadingColor,
  border: `1px solid ${HomeIconDefaultColor}`,
  marginBottom: 5,
  width: '99%',
  height: '90%',
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
  padding: '0px 10px',
});

const FotterWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '5px 10px',
  borderTop: `1px solid ${HomeIconDefaultColor}`,
  marginTop: 4,
});

const SendWrapper = styled(Box)({
  cursor: 'pointer',
});
function TypingArea(props) {
  const { typingAreaWidth } = props;
  const [textAreaVal, setTextAreaVal] = useState('');
  return (
    <TypingAreaWrapper>
      <TemplateSelectWrapper>
        <TemplateSelect />
      </TemplateSelectWrapper>
      <TextAreaWrapper>
        <textarea
          style={textAreaStyle}
          value={textAreaVal}
          id="templateTextArea"
          placeholder="Type your message here..."
          onChange={(e) => {
            setTextAreaVal(e.target.value);
          }}
        />
      </TextAreaWrapper>
      <FotterWrapper>
        {' '}
        <SendWrapper>
          <SendIcon style={{ color: HighlightColor }} />
        </SendWrapper>
      </FotterWrapper>
    </TypingAreaWrapper>
  );
}

TypingArea.propTypes = {};

export default TypingArea;
