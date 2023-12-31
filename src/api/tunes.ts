import catalog from "../data/Pingshui_Catalog.json";
import tunes from "../data/Ci_Tunes.json";
import {CiFormat, CiTuneType, TunesCatalog} from "../types/main";

/** 获取词谱目录 */
const getTunesCatalog = async (): Promise<TunesCatalog> => {
  return catalog as TunesCatalog;
};

/** 根据词牌名获取详细信息 */
const getTuneByName = (name: string): CiTuneType => {
  return (tunes as any)[name] as CiTuneType;
};

/** 搜索词牌名 */
const searchTuneName = (text: string | undefined): TunesCatalog => {
  const tuneNames = catalog as TunesCatalog;
  if (!text) {
    return tuneNames;
  }
  const res: TunesCatalog = {};
  for (let tuneKey in tuneNames) {
    const arr = [];
    for (let item of tuneNames[tuneKey]) {
      // 已经处理过空值，这里必定是非空的
      if (item.name.includes(text)) {
        arr.push(item);
      }
    }
    if (arr.length > 0) {
      res[tuneKey] = arr;
    }
  }
  return res;
};

/** 根据词牌名字和对应格的下标获取对应词谱格式信息 */
const getCiFormat = async (
  name: string,
  formatkey: number,
): Promise<CiFormat> => {
  return (tunes as any)[name].formats[formatkey] as CiFormat;
};

export {getTunesCatalog, getTuneByName, searchTuneName, getCiFormat};
