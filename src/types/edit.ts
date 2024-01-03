import Realm, {ObjectSchema} from "realm";

interface DarftType {
  name: string;
  content: string;
  lastEditTime: Date;
  createTime: Date;
  ciFormat: number;
}

class DarftSchema extends Realm.Object<DarftSchema> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  content!: string;
  lastEditTime!: Date;
  createTime!: Date;
  ciFormat!: number;
  static schema: ObjectSchema = {
    name: "DarftSchema",
    properties: {
      _id: "objectId",
      name: "string",
      content: "string",
      lastEditTime: "date",
      createTime: "date",
      ciFormat: "int",
    },
    primaryKey: "_id",
  };
}

interface CheckedLetter {
  letter: string;
  tune: string;
  match: string;
  rhymeMatch?: string;
  rhyme?: string;
}

export type {DarftType, CheckedLetter};
export {DarftSchema};
