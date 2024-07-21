const genFourBitNumber = () => {
  return formatNumber(Math.floor(Math.random() * 10000), 4);
};

const formatNumber = (number: number, bit?: number) => {
  const numberString = number.toString();
  if (bit) {
    return numberString.padStart(bit, "0");
  }
  return numberString;
};

export {genFourBitNumber};
