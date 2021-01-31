import React from 'react';
import { styled, Box, Grid, Typography } from '@material-ui/core';
const CardWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});
const TitleTyp = styled(Typography)({
  fontSize: 14,
  color: '#2F4050',
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

export default IconCard;
