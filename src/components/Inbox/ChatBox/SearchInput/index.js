import React from 'react';
import PropTypes from 'prop-types';
import { useChatState } from '../../../../Context/Chat';
import { Box, styled, TextField, withStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import { HeadingColor, HomeIconDefaultColor } from '../../../constants/theme';

const SearchInputWrapper = styled(Box)({
  marginTop: 8,
  marginBottom: 8,
  display: 'flex',
  height: 40,
  borderRadius: 22,
  width: '90%',
  background: HeadingColor,
  paddingRight: 12,
});

const IconWrapper = styled(Box)({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  marginLeft: 5,
});
const StyledAutoComplete = withStyles({
  root: {
    width: '100%',
    '& .MuiFormControl-root': {
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
export default function SearchInput(props) {
  const { searchString, setSearchString } = props;
  const chatState = useChatState();

  return (
    <SearchInputWrapper>
      <IconWrapper>
        <SearchIcon style={{ color: HomeIconDefaultColor }} />
      </IconWrapper>
      <StyledAutoComplete
        freeSolo
        size="small"
        closeIcon={false}
        disableClearable
        options={chatState.map((option) => option.name)}
        inputValue={searchString}
        onInputChange={(event, newInputValue) => {
          setSearchString(newInputValue);
        }}
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

SearchInput.propTypes = {
  searchString: PropTypes.string.isRequired,
  setSearchString: PropTypes.func.isRequired,
};
