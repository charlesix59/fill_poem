import pingshui from "../data/Pingshui_Rhyme.json";
import cilin from "../data/Cilin_Rhyme.json";
import words from "../data/Word_Explain.json";
import {WordCatalogType, WordMeaning} from "../types/main";

const getPingshuiCatalog = async (): Promise<WordCatalogType> => {
  const res: WordCatalogType = {};
  for (let i in pingshui) {
    const arr = [];
    for (let j in (pingshui as any)[i]) {
      arr.push(j);
    }
    res[i] = arr;
  }
  return res;
};

const getCilinCatalog = async (): Promise<WordCatalogType> => {
  const res: WordCatalogType = {};
  for (let i in cilin) {
    const arr = [];
    for (let j in (cilin as any)[i]) {
      arr.push(j);
    }
    res[i] = arr;
  }
  return res;
};

const getWordsByPart = (
  type: string,
  part1: string,
  part2: string,
): Array<string> => {
  if (type === "shi") {
    return (pingshui as any)[part1][part2];
  } else {
    return (cilin as any)[part1][part2];
  }
};

const getWordMeanings = async (word: string): Promise<WordMeaning[]> => {
  return (words as any)[word];
};

const searchWord = async (type: string, word: string): Promise<string[][]> => {
  const wordSet = type === "shi" ? pingshui : cilin;
  const res: Array<Array<string>> = [];
  for (let part1 in wordSet) {
    for (let part2 in (wordSet as any)[part1]) {
      for (let char of (wordSet as any)[part1][part2]) {
        if (char === word) {
          res.push([part1, part2]);
        }
      }
    }
  }
  return res;
};

export {
  getPingshuiCatalog,
  getCilinCatalog,
  getWordsByPart,
  getWordMeanings,
  searchWord,
};
