import React from 'react';
import PropTypes from 'prop-types';
import { Chip, Box, styled, Typography, withStyles } from '@material-ui/core';
import {
  LinkColor,
  HomeIconDefaultColor,
  BackgroundColor,
} from '../../../constants/theme';
import AddIcon from '@material-ui/icons/Add';

const LabelAreaWrapper = styled(Box)({
  padding: '5px 15px 0px 5px',
  background: BackgroundColor,
});
const LabelWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  paddingBottom: 12,
});
const LabelTyp = styled(Typography)({
  fontSize: 15,
  fontWeight: 600,
});

const ManageLabelTyp = styled(Typography)({
  fontSize: 13,
  color: LinkColor,
});

const CircleWrapper = styled(Box)({
  width: 5,
  height: 5,
  borderRadius: '50%',
});
const SuggestTyp = styled(Typography)({
  fontSize: 13,
  paddingBottom: 12,
});
const ChipWrapper = styled(Box)({
  paddingBottom: 12,
});

const StyledChip = withStyles({
  label: {
    fontSize: 13,
  },
})(Chip);
function LabelArea(props) {
  return (
    <LabelAreaWrapper>
      <LabelWrapper>
        <LabelTyp>Labels</LabelTyp>
        <ManageLabelTyp>Manage Label</ManageLabelTyp>
      </LabelWrapper>
      <ChipWrapper>
        {' '}
        <StyledChip
          size="small"
          avatar={<CircleWrapper style={{ background: '#4A7F0F' }} />}
          label="New Customer"
          onDelete={() => {}}
          variant="outlined"
        />
      </ChipWrapper>
      <ChipWrapper>
        <StyledChip
          size="small"
          avatar={<AddIcon />}
          label="Add Label"
          onDelete={() => {}}
          variant="outlined"
        />
      </ChipWrapper>
      <SuggestTyp>Suggested Labels</SuggestTyp>
      <ChipWrapper>
        {' '}
        <StyledChip
          size="small"
          avatar={<CircleWrapper style={{ background: '#FF6377' }} />}
          label="Important"
          onDelete={() => {}}
          variant="outlined"
        />
      </ChipWrapper>
      <ChipWrapper>
        <StyledChip
          size="small"
          avatar={<CircleWrapper style={{ background: '#3A79E7' }} />}
          label="New Customer"
          onDelete={() => {}}
          variant="outlined"
        />
      </ChipWrapper>
    </LabelAreaWrapper>
  );
}
LabelArea.propTypes = {};

export default LabelArea;
