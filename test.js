function _getFieldMaxValue(field, arr) {
  let maxValue = 0;

  if (arr.length) {
    maxValue = arr.reduce((max, obj) => {
        return (obj[field] > max) ? obj[field] : max;
    }, 0);
  }

  return maxValue;
}

console.log(_getFieldMaxValue('id', []));
