interface TunesCatalog {
  [key: string]: Array<TunesCatalogItem>;
}

interface TunesCatalogItem {
  name: string;
  tunes: string;
}

export type {TunesCatalog};
