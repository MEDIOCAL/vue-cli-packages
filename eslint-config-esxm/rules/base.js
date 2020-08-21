const { Rules } = require('./const');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  globals: {
    FormData: false,
    debugger: false,
    Image: false,
    $: false,
    fhRenderer: true,
    AMap: true,
    AMapUI: true,
    Clipboard: true,
    _paq: true
  },
  extends: [
    'eslint-config-standard',
    'eslint-config-ali'
  ].map(require.resolve),
  rules: {
    // 代码长度 最大是200
    'max-len': [Rules.ERROR, 200, 2],
    // allow async-await
    'generator-star-spacing': Rules.OFF,
    /**
     * 对象后面强制需要 跟一个逗号 该规则 只有多行时 起作用
     * let foo = {
     *  bar: 'baz',
     *  qux: 'quz',
     * }
     */
    'comma-dangle': ['error', {
      arrays: 'only-multiline',
      objects: 'only-multiline',
      imports: 'ignore',
      functions: 'ignore',
      exports: 'ignore'
    }],
    // 允许对象属性中 不写驼峰 主要是用于 给后端 传值或者显示后端传输回来的值
    camelcase: [Rules.ERROR, {
      properties: 'never'
    }],
    'no-unused-vars': ['error', {
      caughtErrors: 'none',
      argsIgnorePattern: '^_|h',
      ignoreRestSiblings: true
    }],
    // 集团的下边3个规则会触发 校验占时没有找到原因先off 之后在排查
    'no-async-promise-executor': Rules.OFF,
    'no-misleading-character-class': Rules.OFF,
    'require-atomic-updates': Rules.OFF,
    // 规则和vuex 使用冲突
    'no-param-reassign': Rules.OFF,
    'no-console': isProduction ? 'error' : 'off',
    'no-debugger': isProduction ? 'error' : 'off'
  }
};
