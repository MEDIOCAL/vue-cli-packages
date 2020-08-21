module.exports = (api, options, config) => {
    const { entryFile } = config;

    api.injectImports(entryFile, 'import store from \'./store\';');
    api.injectRootOptions(entryFile, 'store');

    api.extendPackage({
        dependencies: {
            vuex: '^3.0.1'
        }
    });

    api.render('./template');
};