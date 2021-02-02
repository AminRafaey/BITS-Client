import React from 'react';
import PropTypes from 'prop-types';
import { styled, Box, Grid, Typography } from '@material-ui/core';

const CardWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});
const TitleTyp = styled(Typography)({
  fontSize: 14,
});
function IconCard(props) {
  const { item } = props;
  return (
    <Grid item xs={4}>
      <CardWrapper>
        {item.icon}
        <TitleTyp>{item.title}</TitleTyp>
      </CardWrapper>
    </Grid>
  );
}

IconCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default IconCard;
