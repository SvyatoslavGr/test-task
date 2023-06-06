module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh', 'react'],
  rules: {
    "semi": ["error", "always"],
    "indent": ["error", 2, { "SwitchCase": 1 }],
    'react-refresh/only-export-components': 'warn',
    'react/self-closing-comp': [
      "error",
      {
        "component": true,
        "html": true
      }
    ],
    "react/jsx-max-props-per-line": [
      "error",
      {
        "maximum": 1,
        "when": "always"
      }
    ],
    "react/jsx-first-prop-new-line": ["error", "multiline"],
    "react/jsx-closing-tag-location": ["error", {
      "nonEmpty": "line-aligned",
      "selfClosing": "line-aligned"
    }],
    "react/jsx-closing-bracket-location": ["error", { "selfClosing": "line-aligned", "nonEmpty": "line-aligned" }],
    "jsx-quotes": ["error", "prefer-double"]
  },
};
