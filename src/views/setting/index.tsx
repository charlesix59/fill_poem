import React from "react";
import Realm, {ObjectSchema} from "realm";
import {createRealmContext} from "@realm/react";
import Setting from "./setting";

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
const realmConfig: Realm.Configuration = {
  schema: [Settings],
};
const {RealmProvider, useRealm, useQuery} = createRealmContext(realmConfig);

function SettingWarp(): React.JSX.Element {
  return (
    <RealmProvider>
      <Setting useRealm={useRealm} useQuery={useQuery} />
    </RealmProvider>
  );
}
export default SettingWarp;
