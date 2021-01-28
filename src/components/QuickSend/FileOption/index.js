import React from 'react';
import {
  styled,
  Typography,
  Box,
  Grid,
} from '@material-ui/core';
import { HoverColor, LinkColor } from '../../constants/theme';

const ChooseFileWrapper = styled(Box)({
  background: '#cfd8dc',
  width: '100%',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  marginTop: 15,
});

const BrowseWrapper = styled(Box)({
  marginLeft: '49px',
  width: 'fit-content',
  background: '#ffff',
  '&:hover': {
    background: HoverColor,
  },
});
const BrowseTyp = styled(Typography)({
  color: 'rgba(0, 0, 0, 0.85)',
  fontSize: 14,
  padding: '2px 4px 2px 4px',
});
const FileNameTyp = styled(Typography)({
  color: 'rgba(0, 0, 0, 0.85)',
  fontSize: 14,
  paddingLeft: 20,
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
function FileOption(props) {
  return (
    <Grid container>
      <Grid item xs={5}>
        <ChooseFileWrapper>
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
              <BrowseTyp> {'Browse ' + 'image'}</BrowseTyp>
            </label>
          </BrowseWrapper>
          <FileNameTyp>No File Choosen</FileNameTyp>
        </ChooseFileWrapper>
      </Grid>
      <Grid item xs={3}>
        <DownloadWrapper>
          <DownloadTyp>Download Sample File</DownloadTyp>
        </DownloadWrapper>
      </Grid>
    </Grid>
  );
}

export default FileOption;
