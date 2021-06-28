import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Button,
  TextField,
  Chip,
  SecondaryButton,
  TextArea,
} from '../../../HOC';
import { isColorCodeValid } from '../utility';
import {
  createLabel,
  updateLabel as updateLabelApi,
} from '../../../../api/Label';
import {
  useLabelState,
  useLabelDispatch,
  addLabel,
  updateLabel,
} from '../../../../Context/Label';
import {
  Box,
  styled,
  Grid,
  Typography,
  CircularProgress,
  InputAdornment,
} from '@material-ui/core';
import { DarkBackgroundColor } from '../../../constants/theme';
import { colors } from '../../../constants/AvatarColor';
import { initLabel } from '../../../constants/InitialValues';

const CircleWrapper = styled(Box)({
  width: 15,
  height: 15,
});
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

const NameErrorTyp = styled(Typography)({
  color: '#f44336',
  margin: '4px 14px 0px',
  fontSize: '0.75rem',
});

function CreateLabel(props) {
  const history = useHistory();
  const search = useLocation().search;
  const edit = new URLSearchParams(search).get('edit');
  const _id = new URLSearchParams(search).get('_id');

  const labelState = useLabelState();
  const labelDispatch = useLabelDispatch();
  const [label, setLabel] = useState(initLabel);
  const [nameError, setNameError] = useState(false);
  const [colorError, setColorError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (edit && _id) {
      const label = labelState[_id];
      label &&
        setLabel({
          ...label,
        });
    }
  }, []);

  const handleSubmit = () => {
    if (!label.title) {
      setNameError(true);
      return;
    }
    if (!isColorCodeValid(label.color)) {
      setColorError(true);
      return;
    }
    setLoading(true);
    if (edit && _id) {
      updateLabelApi(label)
        .then((res) => {
          updateLabel(labelDispatch, {
            _id: res._id,
            updatedLabel: res,
          });
          setLabel(initLabel);
          setLoading(false);
          history.push('/manageLabels');
        })
        .catch((err) => {
          setLoading(false);
          // err.message && setError(err);
        });
    } else {
      createLabel(label)
        .then((res) => {
          const { _id, ...label } = res;
          addLabel(labelDispatch, { _id, label });
          setLabel(initLabel);
          setLoading(false);
        })
        .catch((err) => setLoading(false));
    }
  };
  return (
    <CreateLabelInnerWrapper>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <FieldWrapper>
            <FieldLabelNameTyp>Preview</FieldLabelNameTyp>
            <Chip
              avatarBackground={
                isColorCodeValid(label.color) ? label.color : ''
              }
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
        <Grid item xs={4}>
          <FieldWrapper>
            <FieldLabelNameTyp>Description</FieldLabelNameTyp>
            <TextArea
              placeholder="Description(Optional)"
              value={label.description}
              onChange={(e) =>
                setLabel({ ...label, description: e.target.value })
              }
            />
          </FieldWrapper>
        </Grid>
        <Grid item xs={2}>
          <FieldWrapper>
            <FieldLabelNameTyp>Color</FieldLabelNameTyp>
            <TextField
              placeholder="#CCCCCC"
              value={label.color}
              error={colorError}
              onChange={(e) => {
                colorError &&
                  isColorCodeValid(e.target.value) &&
                  setColorError(false);
                setLabel({ ...label, color: e.target.value });
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CircleWrapper
                      style={{
                        ...(isColorCodeValid(label.color) && {
                          background: label.color,
                        }),
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
            <NameErrorTyp>
              {colorError ? 'In-valid color code.' : ''}
            </NameErrorTyp>
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
            <SecondaryButton mr={1} onClick={() => setLabel(initLabel)}>
              Cancel
            </SecondaryButton>
            {loading ? (
              <CircularProgress size={24} color="primary" />
            ) : (
              <Button onClick={handleSubmit}>
                {edit ? 'Update' : 'Create'}
              </Button>
            )}
          </ButtonsWrapper>
        </Grid>
      </Grid>
    </CreateLabelInnerWrapper>
  );
}
CreateLabel.propTypes = {};
export default CreateLabel;
