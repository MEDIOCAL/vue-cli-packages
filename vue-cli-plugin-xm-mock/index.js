const fs = require('fs');
const freeMock = require('freemockjs');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { log, warn } = require('@vue/cli-shared-utils');

module.exports = (api, options) => {
    api.configureDevServer(app => {
        const mock = (options.pluginOptions && options.pluginOptions.mock) || {};
        const opt = _.assign({}, { enable: true }, mock);

        if (!opt.enable) {
            log();
            warn('mock 以被禁用 可设置enable: true 开启');
            return;
        }

        // 如果mock 文件不存在 不运行插件
        const mockConfigFile = api.resolve('mock.config.js');
        if (fs.existsSync(mockConfigFile)) {
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use(freeMock(mockConfigFile));
        }
    });
};
