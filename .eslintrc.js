module.exports = {
  parserOptions: {
    'ecmaVersion': 6,
    'sourceType': 'module'
  },
  rules: {
    'no-cond-assign': ['error'],
    'no-constant-condition': ['error'],
    'no-control-regex': ['error'],
    'no-dupe-args': ['error'],
    'no-dupe-keys': ['error'],
    'no-duplicate-case': ['error'],
    'no-empty-character-class': ['error'],
    'no-empty': ['error'],
    'no-ex-assign': ['error'],
    'no-extra-boolean-cast': ['error'],
    // 'no-extra-parens': ['error'],
    'no-extra-semi': ['error'],
    'no-func-assign': ['error'],
    'no-inner-declarations': ['error'],
    'no-invalid-regexp': ['error'],
    'no-irregular-whitespace': ['error'],
    'no-obj-calls': ['error'],
    'no-prototype-builtins': ['error'],
    semi: ['error', 'always'],
    quotes: ['error', 'single', {avoidEscape: true, allowTemplateLiterals: true }]
  }
};
