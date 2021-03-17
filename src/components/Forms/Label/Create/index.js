import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Chip } from '../../../HOC';
import { Box, styled, Grid, Typography, withStyles } from '@material-ui/core';
import { DarkBackgroundColor, GrayColor } from '../../../constants/theme';
import { colors } from '../../../constants/AvatarColor';

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

function CreateLabel(props) {
  return (
    <CreateLabelInnerWrapper>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <FieldWrapper>
            <FieldLabelNameTyp>Preview</FieldLabelNameTyp>
            <Chip avatarBackground="#FF6377" label="Important" />
          </FieldWrapper>
        </Grid>
        <Grid item xs={3}>
          <FieldWrapper>
            <FieldLabelNameTyp>Label Name</FieldLabelNameTyp>
            <TextField placeholder="Name(Required)" />
          </FieldWrapper>
        </Grid>
        <Grid item xs={6}>
          <FieldWrapper>
            <FieldLabelNameTyp>Description</FieldLabelNameTyp>
            <TextField placeholder="Description(Optional)" />
          </FieldWrapper>
        </Grid>
        <Grid item xs={2}>
          <Grid container>
            <Box mt={4} width="100%" />
            {colors.map((c, index) => (
              <Grid item xs={3} key={c}>
                <ColorBoxWrapper
                  style={{
                    background: c,
                    ...(index === 1 && { borderRadius: '50%' }),
                  }}
                ></ColorBoxWrapper>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={12}>
          <ButtonsWrapper>
            {' '}
            <StyledButton color="default" mr={1}>
              Cancel
            </StyledButton>
            <Button>Create Label</Button>{' '}
          </ButtonsWrapper>
        </Grid>
      </Grid>
    </CreateLabelInnerWrapper>
  );
}
CreateLabel.propTypes = {};
export default CreateLabel;
