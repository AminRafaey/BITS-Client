export const isColorCodeValid = (colorCode) => {
  if (colorCode) {
    return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(colorCode);
  }
};
