module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  rootDir: ".",
  testMatch: ["<rootDir>/__tests__/unit/**/*.spec.ts"],
  transform: {
    "\\.ts$": "ts-jest",
  },
};
