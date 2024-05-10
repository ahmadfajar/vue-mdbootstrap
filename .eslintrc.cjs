module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript',
    '@typescript-eslint/eslint-plugin',
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "constructor-super": "error",
    "eol-last": "warn",
    "guard-for-in": "warn"
  }
}
