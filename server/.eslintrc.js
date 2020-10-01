module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "arrow-body-style": "off",
    "consistent-return": "off",
    "no-async-promise-executor": "off",
    "no-param-reassign": "off",
    "quote-props": "off",
    "quotes": ["off", "single", { "allowTemplateLiterals": true }],
    "prefer-promise-reject-errors": "off",
  },
};
