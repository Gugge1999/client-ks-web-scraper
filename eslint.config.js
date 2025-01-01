// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [eslint.configs.recommended, ...tseslint.configs.strict, ...tseslint.configs.stylistic, ...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "scraper",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "scraper",
          style: "kebab-case",
        },
      ],
      eqeqeq: "error",
      curly: ["error", "all"],
      "no-nested-ternary": "error",
      "no-else-return": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@angular-eslint/prefer-signals": "error",
      "@typescript-eslint/no-extraneous-class": "off",
    },
  },
  {
    files: ["**/*.html"],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      "@angular-eslint/template/prefer-self-closing-tags": "warn",
    },
  },
);
