const chineseNumbers = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
const number2Chinese = (num: number): string => {
  return chineseNumbers[num - 1];
};

export {number2Chinese};
