const _ = require('lodash');
const { log, warn } = require('@vue/cli-shared-utils');

const defaultOptions = {
    files: ['scss/**/*.scss', 'src/**/*.vue', 'src/**/*.scss'],
    customSyntax: 'postcss-syntax',
    syntax: 'scss',
    // 是否启用 默认启用
    enable: true
};

module.exports = (api, options) => {
  api.chainWebpack(webpackConfig => {
    const stylelint = (options.pluginOptions && options.pluginOptions.stylelint) || {};
    const opt = _.assign({}, defaultOptions, stylelint);

    if (!opt.enable) {
      log();
      warn('styelint 检查插件以被禁用 可设置enable: true 开启');
      return;
    }

    delete opt.enable;

    if (stylelint.files) {
      opt.files = _.union(defaultOptions.files, stylelint.files);
    }

    webpackConfig
      .plugin('stylelint')
      .use(require('stylelint-webpack-plugin'), [opt]);
  });
};
