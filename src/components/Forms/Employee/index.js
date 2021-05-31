export function validatePassword(password) {
  console.log(password);
  const errors = [];
  if (password.length < 8) {
    errors.push('Your password must be at least 8 characters');
  }
  if (password.search(/[a-z]/i) < 0) {
    errors.push('Your password must contain at least one letter.');
  }
  if (password.search(/[0-9]/) < 0) {
    errors.push('Your password must contain at least one digit.');
  }
  if (errors.length > 0) {
    alert(errors.join('\n'));
    return false;
  }
  return true;
}
