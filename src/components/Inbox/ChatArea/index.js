import React from 'react';
import PropTypes from 'prop-types';
import inbox from '../../../public/images/inbox.png';

function ChatArea(props) {
  return (
    <div>
      <img src={inbox} style={{ width: '100%' }} />
    </div>
  );
}

ChatArea.propTypes = {};
export default ChatArea;
