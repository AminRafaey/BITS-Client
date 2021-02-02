import React from 'react';
import PropTypes from 'prop-types';
import { Chip, Box, styled, Typography, Avatar } from '@material-ui/core';
import {
  LinkColor,
  HeadingColor,
  HoverColor,
  HomeIconDefaultColor,
  BackgroundColor,
} from '../../../constants/theme';
import AddIcon from '@material-ui/icons/Add';

const LabelAreaWrapper = styled(Box)({
  padding: '5px 15px 0px 15px',
  background: BackgroundColor,
});
const LabelWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  paddingBottom: 12,
});
const LabelTyp = styled(Typography)({
  fontSize: 16,
  fontWeight: 600,
});

const ManageLabelTyp = styled(Typography)({
  fontSize: 14,
  color: LinkColor,
});

const CircleWrapper = styled(Box)({
  width: 5,
  height: 5,
  borderRadius: '50%',
});
const SuggestTyp = styled(Typography)({
  fontSize: 14,
  paddingBottom: 12,
});
const ChipWrapper = styled(Box)({
  paddingBottom: 12,
});
const EmptyWrapper = styled(Box)({
  width: '100%',
  height: 2,
  background: HomeIconDefaultColor,
});
function LabelArea(props) {
  return (
    <LabelAreaWrapper>
      <LabelWrapper>
        <LabelTyp>Labels</LabelTyp>
        <ManageLabelTyp>Manage Label</ManageLabelTyp>
      </LabelWrapper>
      <ChipWrapper>
        {' '}
        <Chip
          avatar={<CircleWrapper style={{ background: '#4A7F0F' }} />}
          label="New Customer"
          onDelete={() => {}}
          variant="outlined"
        />
      </ChipWrapper>
      <ChipWrapper>
        <Chip
          avatar={<AddIcon />}
          label="Add Label"
          onDelete={() => {}}
          variant="outlined"
        />
      </ChipWrapper>
      <SuggestTyp>Suggested Labels</SuggestTyp>
      <ChipWrapper>
        {' '}
        <Chip
          avatar={<CircleWrapper style={{ background: '#FF6377' }} />}
          label="Important"
          onDelete={() => {}}
          variant="outlined"
        />
      </ChipWrapper>
      <ChipWrapper>
        <Chip
          avatar={<CircleWrapper style={{ background: '#3A79E7' }} />}
          label="New Customer"
          onDelete={() => {}}
          variant="outlined"
        />
      </ChipWrapper>
      <EmptyWrapper />
    </LabelAreaWrapper>
  );
}
LabelArea.propTypes = {};

export default LabelArea;
