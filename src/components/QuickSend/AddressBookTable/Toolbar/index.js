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
} from '@material-ui/core';
import {
  HoverColor,
  HeadingColor,
  BackgroundColor,
} from '../../../constants/theme';
import { WhatsAppIcon } from '../../../../resources';

const ItemTyp = styled(Typography)({
  color: '#FFFFFF',
  fontSize: 14,
});

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: BackgroundColor,
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
  );
}

Toolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
