/**
 * ESLint Configuration
 */
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
    "plugin:react/jsx-runtime",
  ],
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    project: "./tsconfig.eslint.json",
  },
  env: { browser: true, node: true, es6: true },
  settings: {
    // "import/resolver": {
    //   node: {
    //     extensions: [".ts", ".tsx"],
    //   },
    // },
    react: {
      version: "detect",
    },
  },
  rules: {
    /**
     * 未使用変数に関するチェックを行う。
     * => 関数の引数が未使用の場合の警告を抑止する
     */
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "react/display-name": "off",
    "react/prop-types": "off",
    "@typescript-eslint/consistent-type-imports": "warn",

    "@typescript-eslint/no-misused-promises": [
      "error",
      { checksVoidReturn: false },
    ],
  },
};
