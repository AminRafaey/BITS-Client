import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LabelMultiSelect from '../../../Forms/BulkLabelOp';
import { Checkbox } from '../../../HOC';
import { useLabelState } from '../../../../Context/Label';
import { Chip, Box, styled, Typography, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { LinkColor, HoverColor } from '../../../constants/theme';

const LabelAreaWrapper = styled(Box)({
  padding: '5px 15px 0px 5px',
});

const LabelWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  paddingBottom: 12,
});

const LabelTyp = styled(Typography)({
  fontSize: 15,
  fontFamily: 'medium',
});

const ManageLabelTyp = styled(Typography)({
  fontSize: 14,
  color: LinkColor,
  '&:hover': {
    cursor: 'pointer',
    textDecoration: 'underline',
  },
});

const CircleWrapper = styled(Box)({
  width: 5,
  height: 5,
  borderRadius: '50%',
});

const SuggestTyp = styled(Typography)({
  fontSize: 14,
  padding: '12px 0px 8px',
});

const ChipWrapper = styled(Box)({
  padding: 4,
  display: 'inline-flex',
});

const AddIconWrapper = styled(Box)({
  '& :hover': {
    cursor: 'pointer',
    background: HoverColor,
  },
});

const CheckboxWrapper = styled(Box)({});

const StyledChip = withStyles({
  label: {
    fontSize: 14,
  },
})(Chip);

const StyledAddLabelChip = withStyles({
  root: {
    height: 28,
    '& .MuiChip-avatar': {
      height: '100%',
      width: 'fit-content',
      display: 'flex',
      alignItems: 'center',
    },
  },
})(Chip);

function LabelArea(props) {
  const { selectedLead, setSelectedLead } = props;
  const labelState = useLabelState();
  const [showLabelSelect, setShowLabelSelect] = useState(false);
  const [personInfo, setPersonInfo] = useState({
    labels: [...selectedLead.labels],
  });

  useEffect(() => {
    JSON.stringify(personInfo.labels) !== JSON.stringify(selectedLead.labels) &&
      setSelectedLead({
        ...selectedLead,
        labels: personInfo.labels.map((l) => l._id),
      });
  }, [personInfo]);

  return (
    <LabelAreaWrapper>
      <LabelWrapper>
        <LabelTyp>Labels</LabelTyp>
        <Link to={'addlabel'} style={{ textDecoration: 'none' }}>
          <ManageLabelTyp>Manage Labels</ManageLabelTyp>
        </Link>
      </LabelWrapper>{' '}
      {selectedLead.labels.map((l) => (
        <ChipWrapper key={l}>
          <StyledChip
            size="small"
            avatar={
              <CircleWrapper style={{ background: labelState[l]['color'] }} />
            }
            label={labelState[l]['title']}
            onDelete={() => {
              showLabelSelect && setShowLabelSelect(false);
              setSelectedLead({
                ...selectedLead,
                labels: selectedLead.labels.filter((_id) => _id !== l),
              });
            }}
            variant="outlined"
          />
        </ChipWrapper>
      ))}
      {showLabelSelect ? (
        <Box p={0.5} pt={1.5}>
          <LabelMultiSelect
            personInfo={personInfo}
            setPersonInfo={setPersonInfo}
            setShowLabelSelect={setShowLabelSelect}
            type={'inbox'}
          />
        </Box>
      ) : (
        <Box p={0.5}>
          <StyledAddLabelChip
            size="small"
            avatar={
              <AddIconWrapper
                onClick={() => {
                  JSON.stringify(personInfo.labels) !==
                    JSON.stringify(selectedLead.labels) &&
                    setPersonInfo({
                      ...personInfo,
                      labels: [...selectedLead.labels],
                    });
                  setShowLabelSelect(true);
                }}
              >
                <AddIcon style={{ borderRadius: '50%' }} />
              </AddIconWrapper>
            }
            label="Add Labels"
            variant="outlined"
          />
        </Box>
      )}
      <SuggestTyp>Suggested Labels</SuggestTyp>
      {Object.keys(labelState)
        .sort((a, b) => labelState[b]['count'] - labelState[a]['count'])
        .filter((l) => {
          if (selectedLead.labels.find((s) => s === l)) {
            return false;
          }
          return true;
        })
        .filter((l, i) => i < 3)
        .map((l) => (
          <ChipWrapper key={l} display="flex" alignItems="center">
            <CheckboxWrapper>
              <Checkbox
                onChange={(e) => {
                  showLabelSelect && setShowLabelSelect(false);
                  if (e.target.checked) {
                    setTimeout(
                      () =>
                        setSelectedLead({
                          ...selectedLead,
                          labels: [...selectedLead.labels, l],
                        }),
                      500
                    );
                  }
                }}
              />
            </CheckboxWrapper>
            <StyledChip
              size="small"
              avatar={
                <CircleWrapper style={{ background: labelState[l]['color'] }} />
              }
              label={labelState[l]['title']}
              variant="outlined"
            />
          </ChipWrapper>
        ))}
    </LabelAreaWrapper>
  );
}
LabelArea.propTypes = {
  selectedLead: PropTypes.object.isRequired,
  setSelectedLead: PropTypes.func.isRequired,
};

export default LabelArea;
