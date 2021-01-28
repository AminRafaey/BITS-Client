import React from 'react';
import { CampaignMultiSelect, TypeArea } from '../../components';
import {
  withStyles,
  Box,
  styled,
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  IconButton,
  ListItem,
  Grid,
} from '@material-ui/core';

const CampaignSelectWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
});
const TypeAreaWrapper = styled(Box)({});
function QuickSend(props) {
  return (
    <div>
      <CampaignSelectWrapper>
        <CampaignMultiSelect />
      </CampaignSelectWrapper>
      <TypeAreaWrapper>
        <TypeArea />
      </TypeAreaWrapper>
    </div>
  );
}

export default QuickSend;
