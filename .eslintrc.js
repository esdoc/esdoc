// this rule is ESLint v3.5.0
module.exports = {
  env: {
    node: true,
    es6: true,
    mocha: true
  },
  parserOptions: {
    'ecmaVersion': 6,
    'sourceType': 'module'
  },
  rules: {
    /* Possible Errors */
    'no-cond-assign': ['error'],
    'no-console': ['off'], // because using console.log for log
    'no-constant-condition': ['error'],
    'no-control-regex': ['error'],
    'no-debugger': ['error'],
    'no-dupe-args': ['error'],
    'no-dupe-keys': ['error'],
    'no-duplicate-case': ['error'],
    'no-empty-character-class': ['error'],
    'no-empty': ['error'],
    'no-ex-assign': ['error'],
    'no-extra-boolean-cast': ['error'],
    'no-extra-parens': ['error'],
    'no-extra-semi': ['error'],
    'no-func-assign': ['error'],
    'no-inner-declarations': ['error'],
    'no-invalid-regexp': ['error'],
    'no-irregular-whitespace': ['error'],
    'no-obj-calls': ['error'],
    'no-prototype-builtins': ['error'],
    'no-regex-spaces': ['error'],
    'no-sparse-arrays': ['error'],
    'no-template-curly-in-string': ['error'],
    'no-unexpected-multiline': ['error'],
    'no-unreachable': ['error'],
    'no-unsafe-finally': ['error'],
    'no-unsafe-negation': ['error'],
    'use-isnan': ['error'],
    'valid-jsdoc': ['off'], // because using ESDoc
    'valid-typeof': ['error'],

    /* Best Practices */
    'accessor-pairs': ['error'], // considering
    'array-callback-return': ['error'],
    'block-scoped-var': ['error'],
    'class-methods-use-this': ['off'], // because too strict
    'complexity': ['error', 23],
    'consistent-return': ['error'],
    'curly': ['error', 'multi-line'],
    'default-case': ['error'], // suppress some errors
    'dot-location': ['error', 'property'],
    'dot-notation': ['error'],
    'eqeqeq': ['error'],
    'guard-for-in': ['error'],
    'no-alert': ['error'],
    'no-caller': ['error'],
    'no-case-declarations': ['error'],
    'no-div-regex': ['error'],
    'no-else-return': ['off'], // because I do not like this rule.
    'no-empty-function': ['off'], // because abstract method should be empty body.
    'no-empty-pattern': ['error'],
    'no-eq-null': ['error'],
    'no-eval': ['error'],
    'no-extend-native': ['error'],
    'no-extra-bind': ['error'],
    'no-extra-label': ['error'],
    'no-fallthrough': ['error'],
    'no-floating-decimal': ['error'],
    'no-global-assign': ['error'],
    'no-implicit-coercion': ['error', {'boolean': false}],
    'no-implicit-globals': ['error'],
    'no-implied-eval': ['error'],
    'no-invalid-this': ['error'],
    'no-iterator': ['error'],
    'no-labels': ['error'],
    'no-lone-blocks': ['error'],
    'no-loop-func': ['error'],
    'no-magic-numbers': ['off', {'ignore': [0, 1, -1, 2, 100], "ignoreArrayIndexes": true }], // because too strict.
    'no-multi-spaces': ['error'],
    'no-multi-str': ['error'],
    'no-new-func': ['error'],
    'no-new-wrappers': ['error'],
    'no-new': ['error'],
    'no-octal-escape': ['error'],
    'no-octal': ['error'],
    'no-param-reassign': ['off'], // because often use param-reassign.
    'no-proto': ['error'],
    'no-redeclare': ['error'],
    'no-return-assign': ['error'],
    'no-script-url': ['error'],
    'no-self-assign': ['error'],
    'no-self-compare': ['error'],
    'no-sequences': ['error'],
    'no-throw-literal': ['error'],
    'no-unmodified-loop-condition': ['error'],
    'no-unused-expressions': ['error'],
    'no-unused-labels': ['error'],
    'no-useless-call': ['error'],
    'no-useless-concat': ['error'],
    'no-useless-escape': ['error'],
    'no-void': ['error'],
    'no-warning-comments': ['warn'], // because `todo` and `fixme` are remain.
    'no-with': ['error'],
    'radix': ['error'],
    'vars-on-top': ['error'],
    'wrap-iife': ['error'],
    'yoda': ['error', 'never'],

    /* Strict Mode */
    'strict': ['error'],

    /* Variables */
    'init-declarations': ['off', 'always'], // because too strict.
    'no-catch-shadow': ['error'],
    'no-delete-var': ['error'],
    'no-label-var': ['error'],
    'no-restricted-globals': ['error'],
    'no-shadow-restricted-names': ['error'],
    'no-shadow': ['off'], // because often use shadowing.
    'no-undef-init': ['error'],
    'no-undef': ['error'],
    'no-undefined': ['error'],
    'no-unused-vars': ['error'],
    'no-use-before-define': ['error', { 'functions': false, 'classes': false }],

    /* Node.js and CommonJS */
    'callback-return': ['off'], // because often use callback without return.
    'global-require': ['error'],
    'handle-callback-err': ['error'],
    'no-mixed-requires': ['error'],
    'no-new-require': ['error'],
    'no-path-concat': ['error'],
    'no-process-env': ['error'],
    'no-process-exit': ['off'], // because often use `process.exist`.
    'no-restricted-modules': ['off'], // because too strict.
    'no-restricted-properties': ['off'], // because too strict.
    'no-sync': ['off'], // because often use synchronous method(e.g. fs.readSyncFile)

    /* Stylistic Issues */
    'array-bracket-spacing': ['error', 'never'],
    'block-spacing': ['error', 'always'],
    'brace-style': ['error', '1tbs', {'allowSingleLine': true}],
    'camelcase': ['error'],
    'comma-dangle': ['error', 'only-multiline'],
    'comma-spacing': ['error',  {'before': false, 'after': true}],
    'comma-style': ['error', 'last'],
    'computed-property-spacing': ['error', 'never'],
    'consistent-this': ['error'],
    'eol-last': ['error'],
    'func-call-spacing': ['error', 'never'],
    'func-names': ['error', 'never'],
    'func-style': ['error', 'declaration', {'allowArrowFunctions': true}],
    'id-blacklist': ['off'], // because too strict.
    'id-length': ['off'], // because too strict.
    'id-match': ['error', '^[A-Za-z_$]+[A-Za-z0-9]*$'],
    'indent': ['error', 2, {'SwitchCase': 1}],
    'jsx-quotes': ['off', 'prefer-single'], // because not use jsx
    'key-spacing': ['error', {'beforeColon': false, 'afterColon': true, 'mode': 'strict'}],
    'keyword-spacing': ['error', {'before': true, 'after': true}],
    'line-comment-position': ['off'], // because write comment at above and beside.
    'linebreak-style': ['error', 'unix'],
    'lines-around-comment': ['off', {'beforeBlockComment': true, 'allowBlockStart': true}], // because do not care this.
    'lines-around-directive': ['error', 'always'],
    'max-depth': ['error', {'max': 4}],
    'max-len': ['error', {code: 160, 'ignoreStrings': true, 'ignoreUrls': true, 'ignoreComments': true, 'ignoreTemplateLiterals': true}],
    'max-lines': ['warn', {max: 1000}],
    'max-nested-callbacks': ['error', {'max': 3}],
    'max-params': ['error', {'max': 5}],
    'max-statements-per-line': ['error', {'max': 1}],
    'max-statements': ['error', {'max': 50}],
    'multiline-ternary': ['error', 'never'],
    'new-cap': ['error', {'newIsCap': true, 'capIsNew': true, 'properties': true}],
    'new-parens': ['error'],
    'newline-after-var': ['off', 'always'], // because do not care this.
    'newline-before-return': ['off'], // because do not care this.
    'newline-per-chained-call': ['error', {'ignoreChainWithDepth': 3}],
    'no-array-constructor': ['error'],
    'no-bitwise': ['error'],
    'no-continue': ['off'], // because often use continue.
    'no-inline-comments': ['off'], // because often use inline comments.
    'no-lonely-if': ['error'],
    'no-mixed-operators': ['error'],
    'no-mixed-spaces-and-tabs': ['error'],
    'no-multiple-empty-lines': ['error'],
    'no-negated-condition': ['error'],
    'no-nested-ternary': ['error'],
    'no-new-object': ['error'],
    'no-plusplus': ['off', {'allowForLoopAfterthoughts': true}], // because use ++/--.
    'no-restricted-syntax': ['off'], // because enough other rules.
    'no-tabs': ['error'],
    'no-ternary': ['off'], // because often use ternary.
    'no-trailing-spaces': ['error', {'skipBlankLines': true}],
    'no-underscore-dangle': ['off', {'allowAfterThis': true, 'allowAfterSuper': true}], // because often use underscore.
    'no-unneeded-ternary': ['error'],
    'no-whitespace-before-property': ['error'],
    'object-curly-newline': ['error', {'multiline': true}],
    'object-curly-spacing': ['error', 'never'],
    'object-property-newline': ['error', {'allowMultiplePropertiesPerLine': true}],
    'one-var-declaration-per-line': ['error', 'initializations'],
    'one-var': ['error', 'never'],
    'operator-assignment': ['error', 'always'],
    'operator-linebreak': ['error', 'after'],
    'padded-blocks': ['error', 'never'],
    'quote-props': ['error', 'as-needed'],
    'require-jsdoc': ['off'], // because not enough detail control.
    'quotes': ['error', 'single', {avoidEscape: true, allowTemplateLiterals: true }],
    'semi': ['error', 'always'],
    'semi-spacing': ['error', {'before': false, 'after': true}],
    'sort-keys': ['off'], // because do not care this.
    'sort-vars': ['off'],  // because do not care this.
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': ['error'],
    'space-unary-ops': ['error'],
    'spaced-comment': ['error'],
    'unicode-bom': ['error', 'never'],
    'wrap-regex': ['off'], // because do not care this.

    /* ESMAScript 2015 */
    'arrow-body-style': ['off', 'as-needed'], // considering
    'arrow-parens': ['off', 'as-needed', { "requireForBlockBody": true }], // considering
    'arrow-spacing': ['off', {'before': true, 'after': true}], // considering
    'constructor-super': ['error'],
    'generator-star-spacing': ['error', {'before': true, 'after': false}],
    'no-class-assign': ['error'],
    'no-confusing-arrow': ['error'],
    'no-const-assign': ['error'],
    'no-dupe-class-members': ['error'],
    'no-duplicate-imports': ['error'],
    'no-new-symbol': ['error'],
    'no-restricted-imports': ['off'], // because too strict.
    'no-this-before-super': ['error'],
    'no-useless-computed-key': ['error'],
    'no-useless-constructor': ['error'],
    'no-useless-rename': ['error'],
    'no-var': ['error'],
    'object-shorthand': ['error', 'consistent'],
    'prefer-arrow-callback': ['error'],
    'prefer-const': ['error', {'destructuring': 'all', 'ignoreReadBeforeAssign': true}],
    'prefer-numeric-literals': ['error'],
    'prefer-reflect': ['error'],
    'prefer-rest-params': ['error'],
    'prefer-spread': ['error'],
    'prefer-template': ['error'],
    'require-yield': ['error'],
    'rest-spread-spacing': ['error', 'never'],
    'sort-imports': ['off'], // because do not care this.
    'symbol-description': ['error'],
    'template-curly-spacing': ['error', 'never'],
    'yield-star-spacing': ['error', {'before': false, 'after': true}],
  }
};
