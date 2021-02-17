import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { WhatsAppIcon } from '../../../resources';
import { useAddressBookState } from '../../../Context/AddressBook';
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
import {
  HoverColor,
  HeadingColor,
  BackgroundColor,
} from '../../constants/theme';

const ToolbarWrapper = styled(Box)({
  marginTop: 6,
});
const ItemTyp = styled(Typography)({
  color: HeadingColor,
  fontSize: 14,
});

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: BackgroundColor,
    height: 58,
  },
  highlight: {
    color: HeadingColor,
    backgroundColor: HoverColor,
  },
  title: {
    flex: '1 1 100%',
  },
}));

export default function Toolbar(props) {
  const classes = useToolbarStyles();
  const { numSelected, message } = props;
  const addressBookState = useAddressBookState();
  return (
    <ToolbarWrapper>
      <MuiToolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 && (
          <ItemTyp className={classes.title}>{numSelected} selected</ItemTyp>
        )}

        {numSelected > 0 && (
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
                  addressBookState
                    .filter((a) => a.selected)
                    .map((a) => a.mobileNumber),
                  message
                )
              }
            >
              <WhatsAppIcon />
            </IconButton>
          </Tooltip>
        )}
      </MuiToolbar>
    </ToolbarWrapper>
  );
}

Toolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
};
