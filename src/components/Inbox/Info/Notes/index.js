import React from 'react';
import PropTypes from 'prop-types';
import { Chip, Box, styled, Typography, Avatar } from '@material-ui/core';
import {
  LinkColor,
  HeadingColor,
  HoverColor,
  HomeIconDefaultColor,
  BackgroundColor,
  LightTextColor,
} from '../../../constants/theme';
import AddIcon from '@material-ui/icons/Add';

const globalTyp = {
  display: 'inline',
  fontSize: 11,
  color: LightTextColor,
};
const LabelAreaWrapper = styled(Box)({
  padding: '5px 15px 0px 15px',
  background: BackgroundColor,
});
const NoteWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  paddingBottom: 12,
});
const NoteTyp = styled(Typography)({
  fontSize: 16,
  fontWeight: 600,
});

const ManageNoteTyp = styled(Typography)({
  fontSize: 14,
  color: LinkColor,
});

const EmptyWrapper = styled(Box)({
  width: '100%',
  height: 2,
  background: HomeIconDefaultColor,
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
  fontSize: 12,
});
function Notes(props) {
  return (
    <LabelAreaWrapper>
      <NoteWrapper>
        <NoteTyp>Notes</NoteTyp>
        <ManageNoteTyp>Add Notes</ManageNoteTyp>
      </NoteWrapper>
      <NoteInfoTyp>Mon Dec 21, 2020 11:19pm · </NoteInfoTyp>
      <ButtonTyp>Edit</ButtonTyp>
      <NoteInfoTyp> · </NoteInfoTyp>
      <ButtonTyp>Delete</ButtonTyp>
      <NoteContentTyp>
        This customer is very important, PLease take care of him
      </NoteContentTyp>
      <EmptyWrapper />
    </LabelAreaWrapper>
  );
}
Notes.propTypes = {};

export default Notes;
