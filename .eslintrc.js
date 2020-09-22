module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  rules: {
    // ES options
    semi: [2, 'always'],
    indent: 0,
    'spaced-comment': 0,
    camelcase: 0,
    'no-console': ['warn', { 'allow': ['warn', 'error'] }],
    'space-before-function-paren': 0,
    'jsx-quotes': 0,
    'no-class-assign': 0,
    'brace-style': 0,
    'object-curly-spacing': 0,
    'no-return-assign': 0,
    'no-trailing-spaces': 0,
    'no-param-reassign': 0,
    curly: [0, 'multi'],
    'comma-dangle': ['error', {
      objects: 'always-multiline',
      arrays: 'always-multiline',
    }],
    'import/prefer-default-export': 0,

    // Vue options
    'vue/html-indent': ['error', 2, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: true,
      ignores: [],
    }],
    'vue/max-attributes-per-line': ['warn', {
      singleline: 3,
      multiline: {
        max: 1,
        allowFirstLine: false,
      },
    }],
    'vue/script-indent': ['error', 2, { baseIndent: 1 }],
    'vue/require-default-prop': 'off',
    'vue/require-v-for-key': ['error'],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/mustache-interpolation-spacing': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/no-v-html': 0,
    'vue/no-unused-components': ['warn'],

    // Typescript options
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'comma',
        requireLast: true,
      },
    }],
  },
};
