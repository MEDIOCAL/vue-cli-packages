module.exports = (api, options) => {
    if (options.mock) {
        api.render('./template', options);
    } else {
        api.extendPackage({
            vue: {
                pluginOptions: {
                    mock: {
                        enable: false
                    }
                }
            }
        });
    }
};
