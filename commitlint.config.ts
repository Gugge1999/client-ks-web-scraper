export default {
  extends: ["@commitlint/config-angular"],
  rules: {
    "type-enum": [2, "always", ["feat", "fix", "docs", "style", "refactor", "test", "chore"]],
    "scope-enum": [2, "always", ["flera af", "config"]],
  },
};
