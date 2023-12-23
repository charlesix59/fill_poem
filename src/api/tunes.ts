import catalog from "../data/Pingshui_Catalog.json";
import tunes from "../data/Ci_Tunes.json";
import {CiTuneType, TunesCatalog} from "../types/main";

const getTunesCatalog = async (): Promise<TunesCatalog> => {
  return catalog as TunesCatalog;
};

const getTuneByName = (name: string): CiTuneType => {
  return (tunes as any)[name] as CiTuneType;
};

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
  console.log(res);
  return res;
};

export {getTunesCatalog, getTuneByName, searchTuneName};
