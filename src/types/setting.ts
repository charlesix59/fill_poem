import Realm, {ObjectSchema} from "realm";

export class Settings extends Realm.Object<Settings> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  value!: string;
  static schema: ObjectSchema = {
    name: "Settings",
    properties: {
      _id: "objectId",
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
};
