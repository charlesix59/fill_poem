module.exports = {
  root: true,
  extends: "@react-native",
  plugins: ["prettier"],
  rules: {
    quotes: [1, "double"],
    "prettier/prettier": [
      "error",
      {
        doubleQuote: true,
        parser: "flow",
      },
    ],
  },
};
