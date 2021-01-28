import React from 'react';
import {
  CampaignMultiSelect,
  Template,
  OptionSelection,
} from '../../components';
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
const TemplateWrapper = styled(Box)({});
const OptionSelectionWrapper = styled(Box)({
  marginTop: 40,
});
function QuickSend(props) {
  return (
    <div>
      <CampaignSelectWrapper>
        <CampaignMultiSelect />
      </CampaignSelectWrapper>
      <TemplateWrapper>
        <Template />
      </TemplateWrapper>
      <OptionSelectionWrapper>
        {' '}
        <OptionSelection />{' '}
      </OptionSelectionWrapper>
    </div>
  );
}

export default QuickSend;
