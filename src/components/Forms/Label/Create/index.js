import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Chip } from '../../../HOC';
import { createLabel } from '../../../../api/Label';
import { useLabelDispatch, addLabel } from '../../../../Context/Label';
import {
  Box,
  styled,
  Grid,
  Typography,
  withStyles,
  CircularProgress,
} from '@material-ui/core';
import { DarkBackgroundColor, GrayColor } from '../../../constants/theme';
import { colors } from '../../../constants/AvatarColor';
import { initLabel } from '../../../constants/InitialValues';

const CreateLabelInnerWrapper = styled(Box)({
  width: '100%',
  minHeight: 100,
  background: DarkBackgroundColor,
  display: 'flex',
  borderRadius: 16,
  padding: '8px 0px 24px 0px',
});

const FieldWrapper = styled(Box)({
  padding: 16,
});

const FieldLabelNameTyp = styled(Typography)({
  fontSize: 15,
  fontFamily: 'medium',
});
const ColorBoxWrapper = styled(Box)({
  padding: '14px 0px',
  borderRadius: 8,
  margin: '8px 4px',
  cursor: 'pointer',
  opacity: 0.7,
  '&:hover': {
    opacity: 1,
  },
});

const ButtonsWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  paddingTop: 24,
});

const StyledButton = withStyles({
  root: {
    background: '#ffff',
    marginRight: 16,
  },
  label: {
    color: 'black',
  },
  contained: {
    '&:hover': {
      background: GrayColor,
    },
  },
})(Button);

const NameErrorTyp = styled(Typography)({
  color: '#f44336',
  margin: '4px 14px 0px',
  fontSize: '0.75rem',
});

function CreateLabel(props) {
  const labelDispatch = useLabelDispatch();
  const [label, setLabel] = useState(initLabel);
  const [nameError, setNameError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!label.title) {
      setNameError(true);
      return;
    }
    setLoading(true);
    console.log(label);
    createLabel(label)
      .then((res) => {
        const { _id, ...label } = res;
        addLabel(labelDispatch, { _id, label });
        setLabel(initLabel);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  };
  return (
    <CreateLabelInnerWrapper>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <FieldWrapper>
            <FieldLabelNameTyp>Preview</FieldLabelNameTyp>
            <Chip
              avatarBackground={label.color}
              label={label.title || 'Label Preview'}
            />
          </FieldWrapper>
        </Grid>
        <Grid item xs={3}>
          <FieldWrapper>
            <FieldLabelNameTyp>Label Name</FieldLabelNameTyp>
            <TextField
              placeholder="Name(Required)"
              error={nameError}
              value={label.title}
              onChange={(e) => {
                nameError && e.target.value && setNameError(false);
                setLabel({ ...label, title: e.target.value });
              }}
            />
            <NameErrorTyp>
              {nameError ? 'This field is required.' : ''}
            </NameErrorTyp>
          </FieldWrapper>
        </Grid>
        <Grid item xs={6}>
          <FieldWrapper>
            <FieldLabelNameTyp>Description</FieldLabelNameTyp>
            <TextField
              placeholder="Description(Optional)"
              value={label.description}
              onChange={(e) =>
                setLabel({ ...label, description: e.target.value })
              }
            />
          </FieldWrapper>
        </Grid>
        <Grid item xs={2}>
          <Grid container>
            <Box mt={4} width="100%" />
            {colors.map((c, index) => (
              <Grid
                item
                xs={3}
                key={c}
                onClick={(e) => setLabel({ ...label, color: c })}
              >
                <ColorBoxWrapper
                  style={{
                    background: c,
                    ...(c === label.color && { borderRadius: '50%' }),
                  }}
                ></ColorBoxWrapper>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={12}>
          <ButtonsWrapper style={{ ...(loading && { paddingRight: 79 }) }}>
            {' '}
            <StyledButton
              color="default"
              mr={1}
              onClick={() => setLabel(initLabel)}
            >
              Cancel
            </StyledButton>
            {loading ? (
              <CircularProgress size={24} color="primary" />
            ) : (
              <Button onClick={handleSubmit}>Create Label</Button>
            )}
          </ButtonsWrapper>
        </Grid>
      </Grid>
    </CreateLabelInnerWrapper>
  );
}
CreateLabel.propTypes = {};
export default CreateLabel;
