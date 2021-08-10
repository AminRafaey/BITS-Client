import React from 'react';
import { Link } from 'react-router-dom';
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
    <Grid item xs={12} md={6} lg={4}>
      <Link
        to={item.defaultPath}
        style={{
          textDecoration: 'none',
          width: '100%',
          color: 'rgba(0, 0, 0, 0.87)',
        }}
      >
        <CardWrapper>
          {item.icon}
          <TitleTyp>{item.title}</TitleTyp>
        </CardWrapper>
      </Link>
    </Grid>
  );
}

IconCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default IconCard;
