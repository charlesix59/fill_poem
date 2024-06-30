import {checkUpdateResult} from "../types/setting";
import {checkUpdateUrl} from "./constant";

// Simply encapsulate fetch function
const getData = async (url: string, data?: object) => {
  const response = await fetch(url, data || {});
  try {
    return response.json();
  } catch (err) {
    throw err;
  }
};

/**
 * check if there are later version
 * @param curVersion current version read from realm
 */
export const apiCheckUpdate = async (
  curVersion: string,
): Promise<checkUpdateResult> => {
  try {
    return getData(checkUpdateUrl, {
      method: "POST",
      body: JSON.stringify({version: curVersion}),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    throw err;
  }
};
