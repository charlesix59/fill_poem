import catalog from "../data/Pingshui_Catalog.json";
import tunes from "../data/Ci_Tunes.json";
import {CiTuneType, TunesCatalog} from "../types/main";

const getTunesCatalog = (): TunesCatalog => {
  return catalog as TunesCatalog;
};

const getTuneByName = (name: string): CiTuneType => {
  return (tunes as any)[name] as CiTuneType;
};

export {getTunesCatalog, getTuneByName};
