import React, { createRef, useState } from 'react';
import KeywordSelect from './KeywordSelect';
import { Radio } from '../../HOC';
import { handleMediaChange } from '../utility';
import {
  styled,
  Typography,
  withStyles,
  Box,
  Grid,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { HoverColor, HeadingColor } from '../../constants/theme';

const textAreaStyle = {
  width: '100%',
  minHeight: '160px',
  resize: 'none',
  borderRadius: '42px',
  border: `0px solid #ffff`,
  padding: '1.5rem',
  outlineWidth: '0px',
};

const LabelTyp = styled(Typography)({
  display: 'inline',
  paddingLeft: 52,
  paddingRight: 55,
  fontSize: 14,
});

const RadioGroupWrapper = styled(Box)({
  display: 'inline',
});
const RadioParentWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});
const TextAreaWrapper = styled(Box)({});
const BrowseWrapper = styled(Box)({
  marginLeft: '49px',
  marginTop: '5px',
  width: 'fit-content',
  background: HeadingColor,
  borderRadius: 5,
  '&:hover': {
    background: HoverColor,
  },
});

const BrowseTyp = styled(Typography)({
  color: 'rgba(0, 0, 0, 0.85)',
  fontSize: 14,
  padding: '4px 16px 4px',
});
const MediaErorTyp = styled(Typography)({
  paddingLeft: '49px',
  paddingTop: '15px',
  fontSize: 14,
});
const StyledFormControlLabel = withStyles({
  label: {
    fontSize: 14,
  },
})(FormControlLabel);

const StyledAlert = withStyles({
  standardError: {
    background:
      'linear-gradient(to right top, #ffcccc, #ffc6c6, #ffc0c0, #ffb9b9, #ffb3b3)',
  },
})(Alert);
export default function Template(props) {
  const { message, setMessage } = props;
  const templateTextAreaRef = createRef();
  const [selectedMediaType, setSelectedMediaType] = useState('image');
  const [selectedMedia, setSelectedMedia] = useState('');
  const [mediaError, setMediaError] = useState('');
  return (
    <React.Fragment>
      <KeywordSelect
        setMessage={setMessage}
        templateTextAreaRef={templateTextAreaRef}
      />
      <Grid container>
        <Grid item xs={7}>
          <TextAreaWrapper>
            <textarea
              style={textAreaStyle}
              value={message}
              ref={templateTextAreaRef}
              placeholder="Type your message here..."
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </TextAreaWrapper>
        </Grid>
      </Grid>
      <RadioParentWrapper>
        <LabelTyp>Attachment</LabelTyp>
        <RadioGroupWrapper>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="position"
              name="position"
              onChange={(e) => setSelectedMediaType(e.target.value)}
              value={selectedMediaType}
            >
              <StyledFormControlLabel
                value="image"
                control={<Radio color="primary" default />}
                label="Image"
              />
              <StyledFormControlLabel
                value="video"
                control={<Radio color="primary" />}
                label="Video"
              />
              <StyledFormControlLabel
                value="pdf"
                control={<Radio color="primary" />}
                label="Pdf"
              />
            </RadioGroup>
          </FormControl>
        </RadioGroupWrapper>
      </RadioParentWrapper>
      <BrowseWrapper>
        <input
          name="file"
          type="file"
          id="media"
          onChange={(e) =>
            handleMediaChange(
              e,
              setSelectedMedia,
              setMediaError,
              selectedMediaType,
              16999
            )
          }
          style={{ display: 'none' }}
          accept={
            selectedMediaType === 'image'
              ? '.png,.jpg,.jpeg'
              : selectedMediaType === 'video'
              ? '.mpeg,.mp4,.quicktime,.webm,.3gpp,.3gpp2,.3gpp-tt,.H261,.H263,.H263-1998,.H263-2000,.H264'
              : '.pdf'
          }
        />

        <label htmlFor="media" style={{ color: 'white', cursor: 'pointer' }}>
          <BrowseTyp>
            {'Browse ' +
              selectedMediaType.charAt(0).toUpperCase() +
              selectedMediaType.slice(1)}
          </BrowseTyp>
        </label>
      </BrowseWrapper>
      <Grid container>
        <Grid item xs={7}>
          {mediaError && (
            <MediaErorTyp>
              <StyledAlert severity="error">{mediaError}</StyledAlert>
            </MediaErorTyp>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
