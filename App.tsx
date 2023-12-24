import React from "react";
import Layout from "./src/layout";
import {Settings} from "./src/types/setting";
import Realm from "realm";
import {createRealmContext} from "@realm/react";

const realmConfig: Realm.Configuration = {
  schema: [Settings],
};
const {RealmProvider, useRealm, useQuery} = createRealmContext(realmConfig);

function App(): React.JSX.Element {
  return (
    <RealmProvider>
      <LayoutWarp />
    </RealmProvider>
  );
}

function LayoutWarp(): React.JSX.Element {
  const data = useQuery(Settings);
  console.log(data);
  const realm = useRealm();
  if (data.length === 0) {
    realm.write(() => {
      realm.create("Settings", {
        _id: new Realm.BSON.ObjectId(),
        name: "rainbowExplain",
        value: "true",
      });
      realm.create("Settings", {
        _id: new Realm.BSON.ObjectId(),
        name: "primaryColor",
        value: "#FFA07A",
      });
      realm.create("Settings", {
        _id: new Realm.BSON.ObjectId(),
        name: "sideColor",
        value: "#1CA2E1",
      });
    });
  }
  return <Layout />;
}
export default App;
