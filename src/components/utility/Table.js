export function calculateHeaderCheckboxState(state, rowsPerPage, page) {
  const selectedOnes = state
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .filter((a) => a.selected).length;

  switch (true) {
    case selectedOnes ===
      state.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length:
      return 'checked';
    case selectedOnes > 0:
      return 'indeterminate';
    default:
      return 'uncheced';
  }
}
