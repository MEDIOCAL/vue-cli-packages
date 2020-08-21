const path = require('path');
const { isWindow } = require('@vue/cli-shared-utils');

module.exports = (api, options) => {
    const imp = options.pluginOptions && options.pluginOptions.imp || {};
    // 生成环境引用 sourcemap
    const isPro = process.env.NODE_ENV === 'production';
    
    if (isPro) {
        options.productionSourceMap = imp.productionSourceMap || false;
    }

    const transpileDepRegexs = genTranspileDepRegex(options.transpileDependencies);

    api.chainWebpack(config => {
        config
            .entry('app')
            .delete('./src/main.js')
            .add('./src/app.js')
            .end();
    
        config
            .resolve
            .alias
            .set('@theme', api.resolve('theme'))
            .set('@http', api.resolve('src/config/http.config.js'))
            .set('@router', api.resolve('src/router'))
            .set('@views', api.resolve('src/views'))
    
        config
            .module
            .rule('js')
            .exclude
            .add(filepath => {
                if(transpileDepRegexs.some(dep => {
                    const reg = new RegExp(`${dep}/([a-zA-Z_0-9]+/)?node_modules`);
                    return reg.test(filepath);
                })) {
                    return true;
                }
                return false;
            });

        config.module.noParse(/^(vue|vue-router|vuex|vuex-router-sync|element-ui|lodash|dayjs|js-cookie|store)$/);
    
        config.plugin('lodashPlugin').use(require('lodash-webpack-plugin'));
    });
};

function genTranspileDepRegex(transpileDependencies = []) {
    return transpileDependencies.map(dep => {
        if (typeof dep === 'string') {
            const depPath = path.join('node_modules', dep, '/');
            return isWindow ? depPath.replace(/\\/g, '\\\\') : depPath;
        } else if(dep instanceof RegExp) {
            return dep.source;
        }
    });
}
