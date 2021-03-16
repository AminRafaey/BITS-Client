import React from 'react';
import { Button } from '../../../HOC';
import {
  Card,
  CardActions,
  CardContent,
  withStyles,
  styled,
  Box,
  Typography,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const TitleTyp = styled(Typography)({
  fontSize: 14,
  background: '#F6F8F8',
  height: 40,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 16,
  borderTopLeftRadius: 3,
  borderTopRightRadius: 3,
});
const ContentTyp = styled(Typography)({
  fontSize: 14,
  padding: '24px 0px 8px 16px',
});
const ButtonWrapper = styled(Box)({
  padding: '0px 0px 4px 8px',
});
const StyledCardContent = withStyles({
  root: {
    padding: 0,
  },
})(CardContent);

function ImportCard() {
  return (
    <Card style={{ maxWidth: '90%' }} variant="outlined">
      <StyledCardContent>
        <TitleTyp>Faster CSV Contacts Import</TitleTyp>

        <ContentTyp color="textSecondary">
          Import upto 10,000 contacts from a CSV file
        </ContentTyp>
      </StyledCardContent>
      <CardActions>
        <ButtonWrapper>
          <Button
            size="small"
            variant="contained"
            color="default"
            startIcon={<CloudUploadIcon />}
          >
            Upload CSV File
          </Button>
        </ButtonWrapper>
      </CardActions>
    </Card>
  );
}

ImportCard.propTypes = {};
export default ImportCard;
