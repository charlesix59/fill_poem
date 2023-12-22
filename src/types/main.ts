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

interface WordCatalogType {
  [key: string]: Array<string>;
}

interface WordMeaning {
  pronunciation: string;
  explains: Array<string>;
}

export type {
  TunesCatalog,
  CiTuneType,
  CiFormat,
  CiTuneItem,
  CilinWord,
  WordCatalogType,
  WordMeaning,
};
export {ReturnType};
