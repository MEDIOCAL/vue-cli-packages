/* eslint-disable prefer-promise-reject-errors */
module.exports = async (api) => {
    const cwd = api.resolve('.');
    const { log, error, warn, done, exit, loadModule } = require('@vue/cli-shared-utils');
    const stylelint = loadModule('stylelint', cwd, true) || require('stylelint');
    const formatter = require('stylelint').formatters.string;
    const R = require('ramda');
    return new Promise((resolve, reject) => {
      stylelint
        .lint({
          fix: true,
          context: cwd,
          cwd,
          configBasedir: cwd,
          files: [
            'scss/**/*.scss',
            'src/**/*.scss',
            'src/**/*.vue'
          ],
          customSyntax: 'postcss-syntax',
          syntax: 'scss',
          globbyOptions: {
            cwd
          }
        })
        .then((lint) => {
          const { results } = lint;
          const warnings = results.filter(
            R.both(R.complement(fileHasErrors), fileHasWarnings)
          );
          const errors = results.filter(fileHasErrors);
  
          log();
  
          if (warnings.length > 0) {
            warn(`stylelint 检测时 发现你有${warnings.length}条 不符合规范的 warning:`);
            log(formatter(warnings));
          }
  
          if (errors.length > 0) {
            error(`stylelint 检测时 发现你有${errors.length}条 不符合规范的 样式:`);
            log(formatter(errors));
            reject(false);
          }
  
          if (warnings.length === 0 && errors.length === 0) {
            done('stylelint auto fix successful！');
          }
          resolve(true);
        })
        .catch(msg => {
          error(msg);
          exit(1);
        });
    });
  };
  
  function fileHasErrors(file) {
    return file.errored;
  }
  
  function fileHasWarnings(file) {
    return file.warnings && file.warnings.length;
  }
  