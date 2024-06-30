import {Modal, Toast} from "@ant-design/react-native";
import {apiCheckUpdate} from "../api/request";

/**
 * get update result and show info
 * @param version current version
 * @param silence don't show any info expect has new version if it's true
 */
const checkUpdate = async (version: string, silence: boolean = false) => {
  let toastKey: number = -1;
  if (!silence) {
    toastKey = Toast.loading("请求中...");
  }
  try {
    const res = await apiCheckUpdate(version || "");
    console.log(res);
    if (res.hasUpdate) {
      Modal.alert(
        `有新版本 ${res.latestVersion}`,
        `${res.latestInfo}\n请手动前往官网下载更新`,
        [{text: "明白啦"}],
      );
    } else if (!silence) {
      Modal.alert("版本检查", "已经是最新版本");
    }
  } catch (err) {
    if (!silence) {
      Toast.info({content: `获取版本信息失败:${err}`, duration: 1});
    }
  } finally {
    if (!silence) {
      Toast.remove(toastKey);
    }
  }
};

export {checkUpdate};
