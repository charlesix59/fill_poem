import {Modal, Toast} from "@ant-design/react-native";
import {apiCheckUpdate} from "../api/request";
import {Linking} from "react-native";

/**
 * 获取版本更细信息
 * @param version 当前版本
 * @param silence 是否静默处理，如果静默处理则不会提示除发现新版本外的其他信息
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
        [
          {
            text: "下次再说",
            style: "destructive",
          },
          {
            text: "前往更新",
            onPress: () => {
              Linking.openURL(
                "https://github.com/charlesix59/fill_poem/releases",
              ).catch(() => {
                Toast.info("打开外部浏览器失败了TAT", 1);
              });
            },
          },
        ],
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
