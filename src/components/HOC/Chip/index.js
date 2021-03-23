import React from 'react';
import { withStyles, Chip as MuiChip, Box, styled } from '@material-ui/core';

const CircleWrapper = styled(Box)({
  width: 5,
  height: 5,
  borderRadius: '50%',
});
const StyledChip = withStyles({
  label: {
    fontSize: 14,
  },
})(MuiChip);

const Chip = (props) => {
  const { avatarBackground, ...other } = props;
  return (
    <StyledChip
      size="small"
      variant="outlined"
      avatar={<CircleWrapper style={{ background: avatarBackground }} />}
      {...other}
    />
  );
};
Chip.defaultProps = {
  avatarBackground: '#B60205',
};
export default Chip;
