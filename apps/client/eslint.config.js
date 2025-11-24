import { defineConfig } from "eslint/config";
import reactDom from "eslint-plugin-react-dom";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactX from "eslint-plugin-react-x";
import globals from "globals";

import { makeConfigFromBase } from "../../config/eslint-base.js";

export default makeConfigFromBase(
  defineConfig([
    {
      files: ["**/*.{ts,tsx}"],
      extends: [
        reactDom.configs.recommended,
        reactHooks.configs.flat["recommended-latest"],
        reactRefresh.configs.vite,
        reactX.configs["recommended-type-checked"],
      ],
    },
    {
      files: ["src/**/*.{ts,tsx}"],
      languageOptions: {
        // match it to tsconfig's lib targets
        ecmaVersion: 2022,
        globals: globals.browser,
      },
    },
    {
      files: ["!src/**/*.{ts,tsx}"],
      languageOptions: {
        // match it to tsconfig's lib targets
        ecmaVersion: 2023,
        globals: globals.node,
      },
    },
  ]),
);
