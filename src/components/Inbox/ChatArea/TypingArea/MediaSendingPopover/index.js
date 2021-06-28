import React, { useState } from 'react';
import { Tooltip } from '../../../../HOC';
import { Image, Video, Document, Clip } from '../../../../../resources';

import {
  Popover,
  styled,
  Box,
  Typography,
  withStyles,
  Grid,
} from '@material-ui/core';

const iconStyle = {
  height: 40,
  width: 40,
  borderRadius: '50%',
  marginInline: 30,
};

const MediaPopoverWrapper = styled(Box)({});

const ContentWrapper = styled(Box)({
  padding: 16,
  paddingRight: 32,
  display: 'flex',
  justifyContent: 'space-around',
});

const MediaIconWrapper = styled(Box)({});

const StyledPopover = withStyles({
  paper: {
    overflow: 'unset',
    filter: 'drop-shadow(0px 0px 2px rgba(0, 0, 0, .2))',
  },
})(Popover);
export default function MediaPopover(props) {
  const {} = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <MediaPopoverWrapper>
      <MediaIconWrapper aria-describedby={id} onClick={handleClick}>
        <Clip />
      </MediaIconWrapper>
      <StyledPopover
        classes={{ paper: 'MediaPopover' }}
        PaperProps={{ elevation: 2 }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <ContentWrapper>
          <Tooltip title={'Browse Image'}>
            <Image style={{ ...iconStyle }} />
          </Tooltip>
          <Video style={{ ...iconStyle }} />
          <Document style={{ ...iconStyle }} />
        </ContentWrapper>
      </StyledPopover>
    </MediaPopoverWrapper>
  );
}

MediaPopover.propTypes = {};
