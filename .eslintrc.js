module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  extends: ["airbnb", "airbnb-typescript", "prettier"],
  rules: {
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "function-declaration",
      },
    ],
    "react/jsx-no-bind": "off",
    "react/jsx-props-no-spreading": "off",
    "react/react-in-jsx-scope": "off",
  },

  overrides: [
    {
      files: ["./src/test/**/*"],
      plugins: ["jest", "jest-dom", "testing-library"],
      env: {
        "jest/globals": true,
      },
      extends: [
        "plugin:jest/recommended",
        "plugin:jest/style",
        "plugin:jest-dom/recommended",
        "plugin:testing-library/react",
      ],
    },
  ],
};
