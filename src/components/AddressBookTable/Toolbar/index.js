import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Toolbar as MuiToolbar,
  Typography,
  IconButton,
  Tooltip,
  makeStyles,
  styled,
  Box,
} from '@material-ui/core';
import {
  HoverColor,
  HeadingColor,
  BackgroundColor,
} from '../../constants/theme';
import { WhatsAppIcon } from '../../../resources';

const ToolbarWrapper = styled(Box)({
  marginTop: 6,
});
const ItemTyp = styled(Typography)({
  color: '#FFFFFF',
  fontSize: 14,
});

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: BackgroundColor,
    height: '58px',
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
  const { numSelected } = props;

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
          <Tooltip title="Send WhatsApp">
            <IconButton aria-label="Send WhatsApp">
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
};
