module.exports = (api) => {
    const stylelint = {
        plugins: [
            'stylelint-scss'
        ],
        extends: [
            'stylelint-config-standard',
            'stylelint-config-ali'
        ],
        rules: {
            // 不允许命名的颜色
            'color-named': 'never',
            // 考虑到大多数习惯下 会习惯小写所以我们颜色值更改为全小写
            'color-hex-case': 'lower',
            'selector-max-class': 3,
            'max-nesting-depth': 3,
            'number-leading-zero': 'never',
            'at-rule-no-unknown': [true, {
                ignoreAtRules: [
                'at-root',
                'content',
                'debug',
                'each',
                'else',
                'else if',
                'error',
                'extend',
                'for',
                'function',
                'if',
                'import',
                'include',
                'media',
                'mixin',
                'return',
                'warn',
                'while'
                ]
            }],
            'scss/at-mixin-pattern': ['^[a-z]+([a-z0-9]?|[a-z0-9\\-]*[a-z0-9])$', {
                message: 'should be written in lowercase with hyphens(-)'
            }],
            'scss/selector-no-redundant-nesting-selector': true,
            'block-closing-brace-newline-after': ['always', {
                ignoreAtRules: ['if', 'else']
            }],
            'selector-class-pattern': ['^[a-z]+([a-z0-9]?|[a-z0-9\\-_]*[a-z0-9])$', {
                message: '应以小写及连字符(-|--|_)书写'
            }],
            'selector-pseudo-element-no-unknown': [true, {
                ignorePseudoElements: ['v-deep']
            }]
        }
    };
  
    api.extendPackage({
        scripts: {
            stylelint: 'stylelint --fix scss/**/*.scss src/**/*.scss src/**/*.vue'
        },
        stylelint,
        devDependencies: {
            "stylelint-config-ali": "^0.1.1",
            "stylelint": "^10.0.1",
            "stylelint-config-standard": "^18.3.0",
            "stylelint-scss": "^3.6.0"
        }
    });
  
  
    // add stylelint hook
    api.extendPackage(pkg => {
      pkg['lint-staged'] = pkg['lint-staged'] || {};
      pkg['lint-staged']['*.{scss,vue}'] = ['npm run stylelint', 'git add'];
      return pkg;
    });
  
    api.onCreateComplete(async () => {
      await require('./lint')(api);
    });
  };
  