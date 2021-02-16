import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

function ConnectionModal(props) {
  const { openModal, setOpenModal } = props;
  return (
    <div>
      <Modal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}
ConnectionModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};

export default ConnectionModal;
