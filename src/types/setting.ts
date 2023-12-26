import {ObjectSchema} from "realm";
import Realm from "realm";

export class Settings extends Realm.Object<Settings> {
  _id!: number;
  name!: string;
  value!: string;
  static schema: ObjectSchema = {
    name: "Settings",
    properties: {
      _id: "int",
      name: "string",
      value: "string",
    },
    primaryKey: "_id",
  };
}

export const settingOrder = {
  RAINBOW_EXPLAIN: 0,
  PRIMARY_COLOR: 1,
  SIDE_COLOR: 2,
  DARK_MODE: 3,
  NO_SIGINATURE: 5,
  AUTHOR: 6,
};
