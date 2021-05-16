import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Video,
  Document,
  Location,
  Audio,
  DefaultMedia,
} from '../../../../resources';
import { Box, styled, Typography, withStyles } from '@material-ui/core';
import {
  HighlightColor,
  BackgroundColor,
  HoverColor,
  DarkHoverColor,
} from '../../../constants/theme';
import { calculateTimeInFormat, formatBytes } from '../../utility';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const MessageWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
});

const ChatTopWrapper = styled(Box)({
  width: '40%',
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '20px',
});

const MessageBoxWrapper = styled(Box)({
  padding: '6px 10px 2px 6px',
  borderRadius: '6px 0px 6px 6px',
  background: HoverColor,
  fontSize: 14,
  position: 'relative',
});

const DateTyp = styled(Typography)({
  float: 'right',
  color: HighlightColor,
  fontSize: 11,
  marginTop: 2,

  paddingLeft: 25,
});

const HighlightWrapper = styled(Box)({
  display: 'flex',
  width: '100%',
  background: '#607d8b',
  padding: 10,
  borderRadius: 6,
  justifyContent: 'space-between',
});

const StyledInfoOutlinedIcon = withStyles({
  root: {
    fill: BackgroundColor,
    cursor: 'pointer',
    '&:hover': {
      fill: HoverColor,
    },
    '&:active': {
      fill: DarkHoverColor,
    },
  },
})(InfoOutlinedIcon);
const FileSizeTyp = styled(Typography)({
  fontSize: 12,
  display: 'inline',
  wordBreak: 'break-all',
});
const InfoWrapper = styled(Box)({
  padding: '2px 2px 0px 2px',
});
function MediaMsgSen(props) {
  const { type, message, setOpenInfoAlert } = props;
  const MediaTag =
    type === 'image'
      ? Image
      : type === 'video'
      ? Video
      : type === 'document'
      ? Document
      : type === 'location'
      ? Location
      : type === 'audio'
      ? Audio
      : DefaultMedia;
  return (
    <MessageWrapper>
      <ChatTopWrapper>
        <MessageBoxWrapper className="S_tri-right S_left-top">
          <HighlightWrapper>
            <MediaTag />
            <StyledInfoOutlinedIcon onClick={() => setOpenInfoAlert(true)} />
          </HighlightWrapper>

          <InfoWrapper>
            {type === 'extendedText' ? (
              <FileSizeTyp>
                {message.message.extendedTextMessage.text}
              </FileSizeTyp>
            ) : (
              <FileSizeTyp>{`${type} · ${
                message.message[type + 'Message']['fileLength']
                  ? formatBytes(message.message[type + 'Message']['fileLength'])
                  : ''
              }`}</FileSizeTyp>
            )}
            <DateTyp>{calculateTimeInFormat(message.messageTimestamp)}</DateTyp>
          </InfoWrapper>
        </MessageBoxWrapper>
      </ChatTopWrapper>
    </MessageWrapper>
  );
}

MediaMsgSen.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  setOpenInfoAlert: PropTypes.func.isRequired,
};
export default MediaMsgSen;
