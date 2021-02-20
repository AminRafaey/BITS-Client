import React from 'react';
import { Button } from '../../HOC';
import { styled, Typography, Box, Grid } from '@material-ui/core';
import { LinkColor, DarkBackgroundColor } from '../../constants/theme';
import { ButtonWrapper, SendWrapper, ScheduleWrapper } from '../ListOption';
export const ChooseFileWrapper = styled(Box)({
  background: DarkBackgroundColor,
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  marginTop: 15,
  marginLeft: 52,
});

export const BrowseWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
});

export const FileNameTyp = styled(Typography)({
  fontSize: 14,
  paddingTop: 4,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
const DownloadTyp = styled(Typography)({
  color: LinkColor,
  fontSize: 14,
  paddingLeft: 20,
  textDecoration: 'underline',
  cursor: 'pointer',
});
const DownloadWrapper = styled(Box)({
  width: '100%',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  marginTop: 15,
});

function FileOption() {
  return (
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
                  onChange={(e) => console.log(e)}
                  style={{ display: 'none' }}
                  accept={'.png,.jpg,.jpeg'}
                />

                <label
                  htmlFor="media"
                  style={{ color: 'white', cursor: 'pointer' }}
                >
                  <Button> {'Browse ' + 'image'}</Button>
                </label>
              </BrowseWrapper>
            </Grid>
            <Grid item xs={5}>
              <FileNameTyp>No File Choosen</FileNameTyp>
            </Grid>
          </Grid>
        </ChooseFileWrapper>
      </Grid>
      <Grid item xs={3}>
        <DownloadWrapper>
          <DownloadTyp>Download Sample File</DownloadTyp>
        </DownloadWrapper>
      </Grid>
      <Grid item xs={4} />
      <Grid item xs={4} />
      <Grid item xs={4}>
        <ButtonWrapper>
          <SendWrapper>
            <Button> {'Send'}</Button>
          </SendWrapper>
          <ScheduleWrapper>
            <Button> {'Schedule'}</Button>
          </ScheduleWrapper>
        </ButtonWrapper>
      </Grid>
    </Grid>
  );
}

export default FileOption;
