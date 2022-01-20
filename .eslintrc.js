module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'prettier'
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2015
  },
  rules: {
    'no-undef': 'off',
    'no-unused-vars': 'warn',
    'arrow-spacing': ['warn', { 'before': true, 'after': true }],
  },
  ignorePatterns: ['build/', 'node_modules']
}
