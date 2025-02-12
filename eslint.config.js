// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import angularEslint from "angular-eslint";

export default tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [eslint.configs.recommended, ...tseslint.configs.strict, ...tseslint.configs.stylistic, ...angularEslint.configs.tsAll],
    processor: angularEslint.processInlineTemplates,
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
      "@angular-eslint/prefer-signals": "error",
      "@angular-eslint/prefer-on-push-component-change-detection": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-extraneous-class": "off",
      "@typescript-eslint/no-empty-object-type": [
        "error",
        {
          allowInterfaces: "always",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [...angularEslint.configs.templateRecommended, ...angularEslint.configs.templateAccessibility],
    rules: {
      "@angular-eslint/template/prefer-self-closing-tags": "warn",
    },
  },
);
