const chineseNumbers = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
const number2Chinese = (num: number): string => {
  return chineseNumbers[num - 1];
};

// 中文匹配正则
const reg = /^[\u4E00-\u9FA5]+$/;

const verifyCharIsChinese = (char: string) => {
  if (reg.test(char)) {
    return true;
  }
  return false;
};

const extractDate = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const extractDateTime = (date: Date): string => {
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};

export {number2Chinese, verifyCharIsChinese, extractDate, extractDateTime};
