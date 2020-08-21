const { Rules } = require('./rules/const');

module.exports = {
  extends: [
    require.resolve('./essential'),
    'plugin:vue/recommended'
  ],
  rules: {
    'vue/require-default-prop': Rules.OFF,
    'vue/html-self-closing': Rules.OFF,
    'vue/attribute-hyphenation': Rules.ERROR
  }
};
