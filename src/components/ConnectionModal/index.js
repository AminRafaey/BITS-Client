import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

function ConnectionModal(props) {
  const { open, setOpen } = props;
  return (
    <div>
      <Modal open={open} setOpen={setOpen} />
    </div>
  );
}
ConnectionModal.propTypes = {};

export default ConnectionModal;
