import React from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Chip } from '../../../HOC';
import { Transition } from '../../../ConnectionModal/Modal';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  styled,
  CircularProgress,
  TextField,
} from '@material-ui/core';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { HoverColor } from '../../../constants/theme';

const NoOptionTyp = styled(Typography)({
  cursor: 'pointer',
  color: 'rgba(0, 0, 0, 0.85)',
});

const OptionWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});
function AddLabel() {
  const [openModal, setOpenModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([
    { title: 'New' },
    { title: 'Important' },
    { title: 'Add', default: true },
  ]);
  const [textFieldVal, setTextFieldVal] = React.useState('');
  const loading = open && options.length === 0;

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Open form dialog</Button>
      <Dialog
        open={openModal}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>Add label to 5 selected contacts</DialogTitle>
        <DialogContent>
          <Autocomplete
            autoHighlight
            openOnFocus
            disableCloseOnSelect
            multiple
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            size="small"
            getOptionLabel={(option) => option.title}
            options={options}
            loading={loading}
            renderOption={(option, { selected, inputValue }) => {
              if (option.default) {
                return (
                  <NoOptionTyp onMouseDown={() => {}}>
                    + Add {textFieldVal}
                  </NoOptionTyp>
                );
              }
              const matches = match(option.title, inputValue);
              const parts = parse(option.title, matches);

              return (
                <OptionWrapper>
                  <Checkbox mr={8} onChange={(e) => {}} />
                  {parts.map((part, index) => {
                    return (
                      <span
                        key={index}
                        style={{ ...(part.highlight && { color: HoverColor }) }}
                      >
                        {part.text}
                      </span>
                    );
                  })}
                </OptionWrapper>
              );
            }}
            noOptionsText={
              <NoOptionTyp
                onMouseDown={() => {
                  setTextFieldVal('');
                }}
              >
                + Add {textFieldVal}
              </NoOptionTyp>
            }
            onChange={(e, value) => {}}
            renderTags={(values) =>
              values.map((v) => <Chip key={v.title} label={v.title} />)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Template"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </DialogContent>
        <DialogActions pr={3}>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AddLabel.propTypes = {};
export default AddLabel;
