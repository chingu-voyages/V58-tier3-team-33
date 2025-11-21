import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import tseslint from "typescript-eslint";

export function makeConfigFromBase(appConfigs = []) {
  return defineConfig([
    { ignores: ["dist/"] },
    js.configs.recommended,
    {
      files: ["**/*.{ts,tsx}"],
      extends: [
        tseslint.configs.recommendedTypeChecked,
        tseslint.configs.stylisticTypeChecked,
        {
          languageOptions: {
            parserOptions: {
              projectService: true,
              tsconfigRootDir: dirname(fileURLToPath(import.meta.url)),
            },
          },
        },
      ],
    },
    ...appConfigs,
    eslintConfigPrettier,
    {
      plugins: {
        "@typescript-eslint": tseslint.plugin,
      },
      rules: {
        "no-console": ["error", { allow: ["error", "warn", "info"] }],
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            args: "after-used",
            argsIgnorePattern: "^_",
            destructuredArrayIgnorePattern: "^_",
          },
        ],
      },
    },
  ]);
}
