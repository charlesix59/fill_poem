const generateRandomHexColor = (): string => {
  // 生成随机的 R、G、B 分量
  let {red, green, blue} = generateRandomNumber();
  // 将 R、G、B 转换为 HEX 格式
  let redHex = red.toString(16).padStart(2, "0");
  let greenHex = green.toString(16).padStart(2, "0");
  let blueHex = blue.toString(16).padStart(2, "0");

  // 组合成 HEX 颜色字符串
  var color = "#" + redHex + greenHex + blueHex;
  return color;
};

const generateRandomNumber = (): {red: number; green: number; blue: number} => {
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);

  if (red + green + blue > 400) {
    return generateRandomNumber();
  }
  return {red, green, blue};
};

/** 判断字符是否是Hex */
function isHexColor(colorString: string): boolean {
  // HEX 颜色的正则表达式
  var hexColorRegExp = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

  // 使用正则表达式测试颜色字符串
  return hexColorRegExp.test(colorString);
}

export {generateRandomHexColor, isHexColor};
