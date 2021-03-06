module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['prettier', 'redux-saga', 'react', 'react-hooks', 'jsx-a11y'],
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // 'scss/dollar-variable-pattern': '^foo',
    // 'scss/selector-no-redundant-nesting-selector': true,

    'prefer-promise-reject-errors': 0,
    'no-nested-ternary': 0,
    'no-prototype-builtins': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'array-callback-return': 0,
    'react/no-array-index-key': 0,
    'react/prefer-stateless-function': 0,
    'class-methods-use-this': 0,
    'consistent-return': 0,
    'no-else-return': 0,
    'import/imports-first': 0,
    'import/newline-after-import': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-unresolved': 2,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    'react/prop-types': 0,
    'jsx-a11y/aria-props': 2,
    'jsx-a11y/heading-has-content': 0,
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        // NOTE: If this error triggers, either disable it or add
        // your custom components, labels and attributes via these options
        // See https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md
        controlComponents: ['Input'],
      },
    ],
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/mouse-events-have-key-events': 2,
    'jsx-a11y/role-has-required-aria-props': 2,
    'jsx-a11y/role-supports-aria-props': 2,
    'max-len': 0,
    'newline-per-chained-call': 0,
    'no-confusing-arrow': 0,
    'no-console': 1,
    'no-unused-vars': 2,
    'no-use-before-define': 0,
    'prefer-template': 2,
    'react/no-access-state-in-setstate': 0,
    'react/jsx-no-bind': 0,
    'react/destructuring-assignment': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-closing-tag-location': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-no-target-blank': 0,
    'react/jsx-uses-vars': 2,
    'react/require-default-props': 0,
    'react/require-extension': 0,
    'react/self-closing-comp': 0,
    'react/sort-comp': 0,
    'redux-saga/no-yield-in-race': 2,
    'redux-saga/yield-effects': 2,
    'require-yield': 0,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './webpack/webpack.prod.babel.js',
      },
      alias: [
        // file
        ["@constants", "./app/constants/CONSTANTS.js"],
        ["@url", "./app/constants/URL.js"],
        ["@api", "./app/constants/API.js"],
        ["@injectSaga", "./app/utils/injectSaga.js"],
        ["@injectReducer", "./app/utils/injectReducer.js"],

        // folder
        ["@commons", "./app/commons/*"],
        ["@containers", "./app/containers/*"],
        ["Pages", "./app/containers/Pages/*"],
        ["@assets", "./app/assets/*"],
      ]
    },
  },
};
