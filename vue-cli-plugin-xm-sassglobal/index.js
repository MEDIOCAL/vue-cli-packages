const _ = require('lodash');
const autoprefixer = require('autoprefixer');
const semver = require('semver');

const defaultOptions = {
    mixins: 'mixins/mixin.scss',
    theme: 'theme/var.scss'
};

module.exports = (api, options) => {
  const style = (options.pluginOptions && options.pluginOptions.style) || {};
  const opt = _.assign({}, defaultOptions, style);

  // 兼容sass-loader 配置
  const sassLoaderVersion = require('sass-loader/package.json').version;
  const attr = semver.satisfies(sassLoaderVersion, '<8.0.0') ? 'data' : 'prependData';
  const sass = {};
  sass[attr] = [`@import '${opt.mixins}';`, `@import '${opt.theme}';`].join('\n');

  _.merge(options, {
    css: {
      loaderOptions: {
        sass
      }
    }
  });

  // 处理postcss 相关配置
  _.merge(options, {
    css: {
      loaderOptions: {
        postcss: {
          ident: 'postcss',
          plugins: [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              flexbox: 'no-2009'
            })
          ]
        }
      }
    }
  });
};
