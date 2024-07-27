import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import markdown from "eslint-plugin-markdown";
import globals from "globals";
import customRules from "./build/rules-custom.mjs";
import * as path from "node:path";
import * as fs from "node:fs";
import * as url from "node:url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const getInstalledVersion = (_path, name) => {
  const folders = fs.readdirSync(_path);
  for (const [, item] of Object.entries(folders)) {
    if (item.startsWith(name + "@")) {
      return item;
    }
  }
  return null;
};

export default [
  {
    files: ["**/*.ts"],
    ignores: ["build/*.*", "dist/*.*"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { modules: true },
        ecmaVersion: "latest",
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      prettier,
      "@typescript-eslint": ts,
      ts,
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      ...ts.configs["eslint-recommended"].rules,
      ...ts.configs["recommended"].rules,
      ...customRules,
      indent: ["error", 2],
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "ts/return-await": 2,
    },
  },
  {
    files: ["eslint.config.mjs", "prettier.config.cjs", "build/rules-*.mjs"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      prettierPlugin,
    },
    rules: {
      ...customRules,
      camelcase: "off",
      "object-curly-spacing": "off",
      indent: ["error", 2],
      quotes: ["error", "double"],
      semi: ["error", "always"],
    },
  },
  {
    files: ["**/*.md"],
    plugins: {
      markdown,
    },
    processor: "markdown/markdown",
    settings: {
      sharedData: "Hello",
    },
  },
];
