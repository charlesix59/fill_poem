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

export {generateRandomHexColor};
