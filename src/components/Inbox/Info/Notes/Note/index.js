import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TextArea } from '../../../../HOC';
import { Box, styled, Typography } from '@material-ui/core';
import { BackgroundColor, LightTextColor } from '../../../../constants/theme';

const globalTyp = {
  display: 'inline',
  fontSize: 12,
  color: LightTextColor,
};
const NoteWrapper = styled(Box)({
  padding: '5px 15px 10px 5px',
  background: BackgroundColor,
});

const NoteInfoTyp = styled(Typography)({
  ...globalTyp,
});
const ButtonTyp = styled(Typography)({
  ...globalTyp,
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
});
const NoteContentTyp = styled(Typography)({
  fontSize: 14,
  paddingBottom: 12,
});
function Note(props) {
  const { selectedLead, setSelectedLead, content, date, index } = props;
  const [showTextArea, setShowTextArea] = useState(false);
  useEffect(() => {
    content.length === 0 && setShowTextArea(true);
  }, [date]);

  const handleTextAreaBlur = (e) => {
    e.target.value.length !== 0
      ? setSelectedLead({
          ...selectedLead,
          notes: selectedLead.notes.map((n, i) =>
            i === index ? { ...n, content: e.target.value } : n
          ),
        })
      : setSelectedLead({
          ...selectedLead,
          notes: selectedLead.notes.filter((n, i) => i !== index),
        });
    setShowTextArea(false);
  };
  return (
    <NoteWrapper>
      <NoteInfoTyp>{`${
        new Date(date).toString().split('GMT')[0]
      } · `}</NoteInfoTyp>
      <ButtonTyp onClick={() => setShowTextArea(true)}>Edit</ButtonTyp>
      <NoteInfoTyp> · </NoteInfoTyp>
      <ButtonTyp
        onClick={() =>
          setSelectedLead({
            ...selectedLead,
            notes: selectedLead.notes.filter((n, i) => i !== index),
          })
        }
      >
        Delete
      </ButtonTyp>
      {showTextArea ? (
        <TextArea
          rowsMax={10}
          defaultValue={content}
          autoFocus={true}
          onBlur={handleTextAreaBlur}
          onKeyDown={(e) =>
            e.ctrlKey && e.key === 'Enter' && handleTextAreaBlur(e)
          }
        />
      ) : (
        <NoteContentTyp>{content}</NoteContentTyp>
      )}
    </NoteWrapper>
  );
}
Note.propTypes = {
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  selectedLead: PropTypes.object.isRequired,
  setSelectedLead: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default Note;
