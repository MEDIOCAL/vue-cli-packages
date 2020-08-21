const { Rules, INDENT } = require('./rules/const');

module.exports = {
  extends: [
    require.resolve('./rules/base'),
    'plugin:vue/essential'
  ],
  rules: {
    // 字符串拼接时  使用 es6 模板
    'prefer-template': Rules.ERROR,
    // @see http://eslint.cn/docs/4.0.0/rules/consistent-return
    'consistent-return': Rules.ERROR,
    // @see http://eslint.cn/docs/4.0.0/rules/no-underscore-dangle
    'no-underscore-dangle': ['error', {
      allowAfterThis: true,
      allowAfterSuper: true
    }],
    // @see http://eslint.cn/docs/4.0.0/rules/no-multi-assign
    'no-multi-assign': Rules.ERROR,
    // @see http://eslint.cn/docs/4.0.0/rules/no-plusplus
    'no-plusplus': Rules.OFF,
    // 如果一个变量重来没有被分配 使用常量
    'prefer-const': Rules.ERROR,
    // @see http://eslint.cn/docs/4.0.0/rules/no-shadow
    'no-shadow': Rules.ERROR,
    'vue/require-default-prop': Rules.OFF,
    'vue/max-attributes-per-line': [Rules.ERROR, {
      singleline: 5,
      multiline: {
        max: 1,
        allowFirstLine: false
      }
    }],
    'vue/html-self-closing': Rules.OFF,
    'vue/attribute-hyphenation': Rules.OFF
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'vue/script-indent': [
          'error',
          INDENT,
          {
            baseIndent: 1,
            switchCase: 1
          }
        ],
        indent: 'off'
      }
    }
  ]
};
