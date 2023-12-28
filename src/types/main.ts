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
  rhythm?: string; // {句|韵} 是否是最后一个字，并且最后一个字是否是韵
  index?: number; // 在填词界面给每个item编号
  shift?: boolean; // 是否换阙
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
