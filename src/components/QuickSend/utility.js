import validateFile from '../utility/FileHelper';

export function insertAtCaret(templateTextAreaRef, text, setMessage) {
  var txtarea = templateTextAreaRef.current;
  var scrollPos = txtarea.scrollTop;
  var strPos = 0;
  var br =
    txtarea.selectionStart || txtarea.selectionStart == '0'
      ? 'ff'
      : document.selection
      ? 'ie'
      : false;
  if (br == 'ie') {
    txtarea.focus();
    var range = document.selection.createRange();
    range.moveStart('character', -txtarea.value.length);
    strPos = range.text.length;
  } else if (br == 'ff') strPos = txtarea.selectionStart;

  var front = txtarea.value.substring(0, strPos);
  var back = txtarea.value.substring(strPos, txtarea.value.length);
  txtarea.value = front + text + back;
  setMessage(front + text + back);
  strPos = strPos + text.length;
  if (br == 'ie') {
    txtarea.focus();
    var range = document.selection.createRange();
    range.moveStart('character', -txtarea.value.length);
    range.moveStart('character', strPos);
    range.moveEnd('character', 0);
    range.select();
  } else if (br == 'ff') {
    txtarea.selectionStart = strPos;
    txtarea.selectionEnd = strPos;
    txtarea.focus();
  }
  txtarea.scrollTop = scrollPos;
}

export function replacekeyWordsWithUserData(templateModel, template) {
  let tempTemplate = template;
  for (let key of Object.keys(templateModel)) {
    tempTemplate = tempTemplate.split(`__${key}__`).join(templateModel[key]);
  }
  return tempTemplate;
}

export function getKeyWords(user) {
  return Object.keys(user);
}

export const handleMediaChange = (e, setMedia, setMediaError, type, size) => {
  const files = e.target.files;
  const errors = validateFile(files, { limit: 1, type: type, size: size });
  if (!errors) {
    setMedia(files[0]);
    setMediaError('');
  } else {
    setMediaError(errors.limit + errors.type + errors.size);
  }
};
