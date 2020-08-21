module.exports = (api, options, config) => {
    api.extendPackage({
        dependencies: {
            'element-ui': '^2.8.2'
        }
    });

    api.render('./template', options);

    api.injectImports(config.entryFile, 'import \'@/plugin/element\';');

    if (!options.full_element) {
        api.extendPackage(pkg => {
            const pluginComponent = ['component', {
                libraryName: 'element-ui',
                styleLibraryName: 'theme-chalk'
            }];

            pkg.babel = pkg.babel || {};
            pkg.babel.plugins = pkg.babel.plugins || [];
            pkg.babel.plugins.push(pluginComponent);
            return pkg;
        });

        api.extendPackage({
            dependencies: {
                'babel-plugin-component': '^1.1.1'
            }
        });
    }
};
