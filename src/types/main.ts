interface TunesCatalog {
  [key: string]: Array<TunesCatalogItem>;
}

interface TunesCatalogItem {
  name: string;
  tunes: string;
}

interface CiTuneType {
  desc: string;
  formats: Array<CiFormat>;
}

interface CiFormat {
  sketch: string;
  author: string;
  desc?: string;
  tunes: Array<CiTuneItem>;
}

interface CiTuneItem {
  tune: string;
  rhythm?: string;
  index?: number;
}

interface CilinWord {
  tune: string;
  rhyme: string;
}

enum ReturnType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
}

export type {TunesCatalog, CiTuneType, CiFormat, CiTuneItem, CilinWord};
export {ReturnType};
