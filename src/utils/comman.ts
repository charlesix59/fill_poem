import {PermissionsAndroid, Platform} from "react-native";
import {getTuneByName} from "../api/tunes";
import {checkRhyme, checkTune} from "../api/check";
import {ReturnType} from "../types/main";
import {CheckedLetter} from "../types/edit";

const chineseNumbers = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
const number2Chinese = (num: number): string => {
  return chineseNumbers[num - 1];
};

// 中文匹配正则
const regCN = /^[\u4E00-\u9FA5]+$/;

/** 检查是否是中文 */
const verifyCharIsChinese = (char: string) => {
  if (regCN.test(char)) {
    return true;
  }
  return false;
};

/** 将Date转化为 yy-mm-dd 格式 */
const extractDate = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

/** 将Date转化为 yy-mm-dd hh:mm 格式  */
const extractDateTime = (date: Date): string => {
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};

/** 获取权限照片存储 */
async function hasAndroidPermission() {
  const getCheckPermissionPromise = () => {
    if ((Platform.Version as number) >= 33) {
      return Promise.all([
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        ),
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ),
      ]).then(
        ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
          hasReadMediaImagesPermission && hasReadMediaVideoPermission,
      );
    } else {
      return PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    }
  };

  const hasPermission = await getCheckPermissionPromise();
  if (hasPermission) {
    return true;
  }
  const getRequestPermissionPromise = () => {
    if ((Platform.Version as number) >= 33) {
      return PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]).then(
        statuses =>
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
            PermissionsAndroid.RESULTS.GRANTED,
      );
    } else {
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
    }
  };

  return await getRequestPermissionPromise();
}

/**
 * 词校验
 * @param ciName 词牌名
 * @param {string} content 包含标点符号的诗的内容
 * @returns 解析的结果，会返回一个与最相似的词牌格式逐个校验后的数组，如果为空则说明没有匹配的词格
 */
const verifyCi = async (
  ciName: string,
  content: string,
): Promise<CheckedLetter[]> => {
  const ciFormat = getTuneByName(ciName);
  const pureContent = content.replaceAll(/[，。,.]/g, "");
  const contentArr = pureContent.split("");
  let maxMatchResult: CheckedLetter[] = [];
  let maxMatchChar = 0;
  let targetRhythmLetter = "";
  for (const format of ciFormat.formats) {
    if (format.tunes.length !== contentArr.length) {
      continue;
    }
    let matchNumber = 0;
    let matchResult = [];
    for (let index = 0; index < contentArr.length; index++) {
      const letter = contentArr[index],
        target = format.tunes[index];
      // 检查平仄
      const result = await checkTune(letter, target.tune);
      const temp: CheckedLetter = {
        letter: letter,
        tune: target.tune,
        match: result,
        rhyme: target.rhythm,
      };
      if (result === ReturnType.SUCCESS) {
        matchNumber++;
      }
      // 检查韵
      if (target.rhythm === "韵") {
        if (!targetRhythmLetter) {
          targetRhythmLetter = letter;
        }
        const rhymeResult = await checkRhyme(letter, targetRhythmLetter);
        temp.rhymeMatch = rhymeResult;
      }
      matchResult.push(temp);
    }
    if (matchNumber > maxMatchChar) {
      maxMatchChar = matchNumber;
      maxMatchResult = matchResult;
    }
  }
  return maxMatchResult;
};

/** 转化为无标点空格的字符串 */
const transIntoPureString = (str: string): string => {
  if (!str) {
    return str;
  }
  const pureContent = str.replaceAll(/[，。,.\s]/g, "");
  return pureContent;
};

const transArrNullItemIntoSpace = (arr: Array<string>): string => {
  let res = "";
  arr.forEach(str => {
    if (!str) {
      res += "";
    } else {
      res += str;
    }
  });
  return res;
};

/** 判断是不是韵字 */
const isRhythmWord = (rhythm?: string) => {
  if (rhythm === "韵" || rhythm === "重") {
    return true;
  }
  return false;
};

/**
 * 判断是否是json字符串
 * @param str 待判断的字符串
 * @returns 如果是json则返回true，否则返回false
 */
const isJson = (str: string) => {
  if (typeof str === "string") {
    try {
      const obj = JSON.parse(str);
      if (typeof obj === "object" && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error("isJson: json解析错误" + str, e);
      return false;
    }
  }
  throw new Error("isJson: 输入不是字符串");
};

export {
  number2Chinese,
  verifyCharIsChinese,
  extractDate,
  extractDateTime,
  hasAndroidPermission,
  verifyCi,
  transIntoPureString,
  isRhythmWord,
  isJson,
  transArrNullItemIntoSpace,
};
