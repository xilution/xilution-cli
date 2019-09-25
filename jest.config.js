module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  rootDir: ".",
  testMatch: ["<rootDir>/test/unit/**/*.spec.ts"],
  transform: {
    "\\.ts$": "ts-jest",
  },
};
