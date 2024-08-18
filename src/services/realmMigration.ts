import Realm from "realm";
import {DarftSchema} from "../types/edit";
import {isJson} from "../utils/comman";

const migration = (oldRealm: Realm, newRealm: Realm) => {
  // 在数据库 1版本及其之前，草稿内容由字符串拼接产生，无法记录填写的文字的位置信息。
  // v2之后改为由数组记录，则可以记忆位置信息。此处需要将raw字符串改为数组json字符串
  if (oldRealm.schemaVersion <= 1) {
    const newDarfts: Realm.Results<DarftSchema> = newRealm.objects(DarftSchema);
    newDarfts.forEach(item => {
      if (isJson(item.content)) {
        return;
      }
      item.content = JSON.stringify(item.content.split(""));
    });
  }
};

export default migration;
