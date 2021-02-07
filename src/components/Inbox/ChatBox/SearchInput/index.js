/* eslint-disable no-use-before-define */
import React from 'react';
import { Box, styled, TextField, withStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import { HeadingColor } from '../../../constants/theme';

const SearchInputWrapper = styled(Box)({
  marginTop: 8,
  marginBottom: 8,
  display: 'flex',
  height: 40,
  borderRadius: 22,
  width: 'fit-content',
  background: HeadingColor,
  paddingRight: 12,
});

const IconWrapper = styled(Box)({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
});
const StyledAutoComplete = withStyles({
  root: {
    '& .MuiFormControl-root': {
      width: 230,
      marginTop: 0,
      marginBottom: 0,
      '& .MuiInputBase-root .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
    },
    '& .MuiInputBase-root': {
      background: HeadingColor,
    },
  },
})(Autocomplete);
export default function SearchInput() {
  return (
    <SearchInputWrapper>
      <IconWrapper>
        <SearchIcon />
      </IconWrapper>
      <StyledAutoComplete
        freeSolo
        id="free-solo-2-demo"
        size="small"
        closeIcon={false}
        disableClearable
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />
    </SearchInputWrapper>
  );
}

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
];
