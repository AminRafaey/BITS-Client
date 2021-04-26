import React from 'react';
import PropTypes from 'prop-types';
import { WhatsAppIcon } from '../../../resources';
import { useLeadsState } from '../../../Context/Lead';
import { useSocketState } from '../../../Context/Socket';
import { sendTextMesage } from '../../../api/send';
import {
  Toolbar as MuiToolbar,
  Typography,
  IconButton,
  Tooltip,
  makeStyles,
  styled,
  Box,
  Fade,
} from '@material-ui/core';
import { HeadingColor, DarkBackgroundColor } from '../../constants/theme';

const ToolbarWrapper = styled(Box)({
  marginTop: 23,
});
const ItemTyp = styled(Typography)({
  color: HeadingColor,
  fontSize: 14,
});

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    height: 58,
    color: HeadingColor,
    backgroundColor: DarkBackgroundColor,
  },
  title: {
    flex: '1 1 100%',
  },
}));

export default function Toolbar(props) {
  const classes = useToolbarStyles();
  const { numSelected, message } = props;
  const leadsState = useLeadsState();
  const socket = useSocketState();
  return (
    <ToolbarWrapper>
      <MuiToolbar className={classes.root}>
        <ItemTyp className={classes.title}>{numSelected} selected</ItemTyp>
        <Tooltip
          title="Send WhatsApp"
          placement={'top'}
          arrow
          interactive
          TransitionComponent={Fade}
        >
          <IconButton
            aria-label="Send WhatsApp"
            onClick={() =>
              sendTextMesage(
                leadsState.filter((a) => a.selected).map((a) => a.mobileNumber),
                message,
                socket
              )
            }
          >
            <WhatsAppIcon />
          </IconButton>
        </Tooltip>
      </MuiToolbar>
    </ToolbarWrapper>
  );
}

Toolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
};
