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
    'arrow-spacing': [ 'warn',{ 'before': true,'after': true } ],
    'no-extra-semi': 'error',
    'semi': [ 'error','never' ],
    'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
    'quotes': [ 'error','single',{ 'avoidEscape': true,'allowTemplateLiterals': true } ]
  },
  ignorePatterns: ['build/', 'node_modules']
}
