import catalog from '../data/Pingshui_Catalog.json';
import {TunesCatalog} from '../types/main';

const getTunesCatalog = (): TunesCatalog => {
  return catalog as TunesCatalog;
};

export {getTunesCatalog};
