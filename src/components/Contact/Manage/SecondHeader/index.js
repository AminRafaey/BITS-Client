import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddLabel from '../../../Forms/Label/Add';
import DeleteAlert from '../DeleteAlert';
import { Button, Checkbox } from '../../../HOC';
import { styled, Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { DarkBackgroundColor } from '../../../constants/theme';

const SecondHeaderWrapper = styled(Box)({
  display: 'flex',
  padding: '8px 4px',
  background: DarkBackgroundColor,
});

const ButtonsWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

function SecondHeader(props) {
  const { handleSelectAllClick, selectedCount } = props;
  const [openAddLabelModal, setOpenAddLabelModal] = useState(false);
  const [openRemoveLabelModal, setOpenRemoveLabelModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  return (
    <SecondHeaderWrapper>
      <Checkbox onChange={handleSelectAllClick} />
      <ButtonsWrapper>
        <Button
          onClick={() => setOpenAddLabelModal(!openAddLabelModal)}
          disabled={selectedCount === 0}
        >
          Add Label
        </Button>
        <AddLabel
          openModal={openAddLabelModal}
          setOpenModal={setOpenAddLabelModal}
          type={'Add'}
          selectedCount={selectedCount}
        />
        <Box pl={1}>
          <Button
            onClick={() => setOpenRemoveLabelModal(!openRemoveLabelModal)}
            disabled={selectedCount === 0}
          >
            Remove Label
          </Button>
          <AddLabel
            openModal={openRemoveLabelModal}
            setOpenModal={setOpenRemoveLabelModal}
            type={'Remove'}
            selectedCount={selectedCount}
          />
        </Box>
        <Box pl={1}>
          <Button>Send Email</Button>
        </Box>
        <Box pl={1}>
          <Button>Send WhatsApp</Button>
        </Box>
        <Box pl={1}>
          <Button
            startIcon={<DeleteIcon />}
            disabled={selectedCount === 0}
            onClick={() => setOpenDeleteModal(!openDeleteModal)}
          >
            Delete
          </Button>
          <DeleteAlert
            open={openDeleteModal}
            setOpen={setOpenDeleteModal}
            selectedCount={selectedCount}
          />
        </Box>
      </ButtonsWrapper>
    </SecondHeaderWrapper>
  );
}

SecondHeader.propTypes = {
  handleSelectAllClick: PropTypes.func.isRequired,
  selectedCount: PropTypes.number.isRequired,
};
export default SecondHeader;
