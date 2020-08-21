module.exports = (api, options, _rootOptions) => {
    api.render('./template', options);
    const version = '^0.0.8';

    api.extendPackage({
        dependencies: {
            'vue-router': '^3.0.3'
        },
        vue: {
            devServer: {
                proxy: {
                    '^/api/mock': {
                        target: 'https://mocks.alibaba-inc.com/mock/preset',
                        changeOrigin: true,
                        pathRewrite: {
                            '^/api/mock': '/'
                        }
                    }
                }
            }
        }
    });

    if (!(process.env.IMP_CLI_TEST === 'TEST')) {
        api.extendPackage({
            vue: {
                transpileDependencies: []
            }
        });
    }

    api.extendPackage(package => {
        package.browerslist = [
            '> 1%',
            'last 1 versions',
            'ie >= 11',
            'Chrome >= 49',
            'Firefox >= 45',
            'Safari >= 10'
        ];
        return package;
    });
    
    api.extendPackage(pkg => {
        const pluginLodash = ['lodash'];
        pkg.babel = pkg.babel || {};
        pkg.babel.plugins = pkg.babel.plugins || [];
        pkg.babel.plugins.push(pluginLodash);
        return pkg;
    });

    const config = {
        version,
        entryFile: 'src/app.js'
    };

    if (options.Vuex) {
        require('./vuex')(api, options, config);
    }

    if (options.element) {
        require('./element')(api, options, config);
    }

    api.postProcessFiles(files => {
        delete files['src/main.js'];
        delete files['src/components/HellowWorld.vue'];
        delete files['src/assets/logo.png'];
    });
};
