module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    // Always use semicolons
    "semi": ["error", "always"],
    "@typescript-eslint/semi": ["error", "always"],
    
    // Strings with double quotes
    "quotes": ["error", "double"],
    "@typescript-eslint/quotes": ["error", "double"],
    
    // Always require explicit access modifiers
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      {
        accessibility: "explicit",
        overrides: {
          accessors: "explicit",
          constructors: "no-public",
          methods: "explicit",
          properties: "explicit",
          parameterProperties: "explicit"
        }
      }
    ],
    
    // Tabulation with tab of 2 spaces
    "indent": ["error", 2, { SwitchCase: 1 }],
    "@typescript-eslint/indent": ["error", 2],
    
    // Existing rules
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "prefer-const": "error",
    "no-var": "error",
    "no-console": "warn",
  },
  env: {
    node: true,
    es2022: true,
  },
  ignorePatterns: ["dist/", "node_modules/", "*.js", "tsconfig*"],
}; 