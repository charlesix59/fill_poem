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
