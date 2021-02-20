import React, { createRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import KeywordSelect from './KeywordSelect';
import { Radio, Button } from '../../HOC';
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
import { ErrorAlert } from '../../constants/theme';
import { ChooseFileWrapper, FileNameTyp, BrowseWrapper } from '../FileOption';
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

const MediaErorWrapper = styled(Box)({
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
    background: ErrorAlert,
  },
})(Alert);
export default function Template(props) {
  const { message, setMessage, selectedMedia, setSelectedMedia } = props;
  const [textAreaVal, setTextAreaVal] = useState('');
  const [mediaError, setMediaError] = useState('');
  const templateTextAreaRef = createRef();
  const [selectedMediaType, setSelectedMediaType] = useState('image');
  useEffect(() => {
    setTextAreaVal(message);
  }, [message]);
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
              value={textAreaVal}
              ref={templateTextAreaRef}
              placeholder="Type your message here..."
              onChange={(e) => {
                setTextAreaVal(e.target.value);
              }}
              onBlur={(e) => setMessage(e.target.value)}
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
      <Grid container>
        <Grid item xs={5}>
          <ChooseFileWrapper>
            <Grid container>
              <Grid item xs={5}>
                <BrowseWrapper>
                  <input
                    name="file"
                    type="file"
                    id="media"
                    onChange={(e) =>
                      handleMediaChange(
                        e,
                        setSelectedMedia,
                        selectedMediaType,
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

                  <Button>
                    <label
                      htmlFor="media"
                      style={{ color: 'white', cursor: 'pointer' }}
                    >
                      {'Browse ' +
                        selectedMediaType.charAt(0).toUpperCase() +
                        selectedMediaType.slice(1)}
                    </label>
                  </Button>
                </BrowseWrapper>
              </Grid>
              <Grid item xs={7}>
                <FileNameTyp>
                  {selectedMedia.file
                    ? selectedMedia.file.name
                    : 'No File Choosen'}
                </FileNameTyp>
              </Grid>
            </Grid>
          </ChooseFileWrapper>
        </Grid>

        <Grid item xs={7}>
          {mediaError && (
            <MediaErorWrapper>
              <StyledAlert severity="error">{mediaError}</StyledAlert>
            </MediaErorWrapper>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

Template.propTypes = {
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  selectedMedia: PropTypes.object.isRequired,
  setSelectedMedia: PropTypes.func.isRequired,
};
