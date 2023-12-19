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
}

export type {TunesCatalog, CiTuneType, CiFormat, CiTuneItem};
