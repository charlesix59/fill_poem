import word from "../data/Ci_Word_Tune.json";
import {CilinWord, ReturnType} from "../types/main";

const getWord = async (char: string): Promise<CilinWord> => {
  return (word as any)[char] as CilinWord;
};

/**
 * 平仄对比
 * @param char 对比字符
 * @param {平|仄} tar 目标平仄
 * @returns success：相同，error：不同，info：char为多音字
 */
const checkTune = async (char: string, tar: string): Promise<string> => {
  const wordInfo = await getWord(char);
  if (!wordInfo) {
    return ReturnType.INFO;
  }
  if (wordInfo.tune === "多") {
    return ReturnType.INFO;
  }
  if (wordInfo.tune === tar) {
    return ReturnType.SUCCESS;
  }
  return ReturnType.ERROR;
};

/**
 * 韵律对比
 * @param char 对比字符
 * @param tar 目标韵律的字符
 * @returns success：相同，error：不同，info：char为多音字
 */
const checkRhyme = async (char: string, tar: string) => {
  const wordInfo = await getWord(char);
  const tarInfo = await getWord(tar);
  if (!(wordInfo && tarInfo)) {
    return ReturnType.INFO;
  }
  if (wordInfo.rhyme === "多" || tarInfo.rhyme === "多") {
    return ReturnType.INFO;
  }
  if (wordInfo.rhyme === tarInfo.rhyme) {
    return ReturnType.SUCCESS;
  }
  return ReturnType.ERROR;
};

export {getWord, checkTune, checkRhyme};
