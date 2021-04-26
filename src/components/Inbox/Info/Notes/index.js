import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note';
import { EmptyWrapper } from '../index';
import { Box, styled, Typography } from '@material-ui/core';
import { LinkColor } from '../../../constants/theme';
const NoteWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  paddingBottom: 12,
});
const NoteTyp = styled(Typography)({
  fontSize: 15,
  fontFamily: 'medium',
});

const ManageNoteTyp = styled(Typography)({
  fontSize: 14,
  color: LinkColor,
  '&:hover': {
    cursor: 'pointer',
    textDecoration: 'underline',
  },
});

const NotesWrapper = styled(Box)({
  padding: '5px 15px 0px 5px',
});

function Notes(props) {
  const { selectedLead, setSelectedLead } = props;
  return (
    <NotesWrapper>
      <NoteWrapper>
        <NoteTyp>Notes</NoteTyp>
        <ManageNoteTyp
          onClick={() =>
            setSelectedLead({
              ...selectedLead,
              notes: [
                { content: '', createdAt: new Date().toString() },
                ...selectedLead.notes,
              ],
            })
          }
        >
          Add Notes
        </ManageNoteTyp>
      </NoteWrapper>
      {selectedLead.notes.map((n, i) => (
        <React.Fragment key={i}>
          {i !== 0 && <EmptyWrapper />}
          <Note
            selectedLead={selectedLead}
            setSelectedLead={setSelectedLead}
            content={n.content}
            date={n.createdAt}
            index={i}
          />
        </React.Fragment>
      ))}
    </NotesWrapper>
  );
}
Notes.propTypes = {
  selectedLead: PropTypes.object.isRequired,
  setSelectedLead: PropTypes.func.isRequired,
};

export default Notes;
