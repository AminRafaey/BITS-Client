import React from 'react';
import { IconCard } from '../../components';
import { iconList } from '../constants/HomeIconList';
import {
  styled,
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  withStyles,
} from '@material-ui/core';

function Home(props) {
  return (
    <Grid container spacing={4}>
      {iconList.map((item) => (
        <IconCard item={item} key={item.title} />
      ))}
    </Grid>
  );
}

export default Home;
