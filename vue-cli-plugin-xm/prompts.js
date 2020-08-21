const { chalk } = require('@vue/cli-shared-utils');

module.exports = [
    {
        name: 'vuex',
        type: 'confirm',
        message: '是否使用 vuex'
    }, {
        type: 'confirm',
        name: 'element',
        message: `是否引入 ${chalk.green('element')}`
    }, {
        when: answers => answers.element,
        type: 'confirm',
        name: 'full_element',
        message: `是否完整引入 ${chalk.green('element')}`
    }, {
        when: answers => answers.full_element,
        type: 'confirm',
        name: 'elCustomTheme',
        message: `是否自定义 ${chalk.green('elementui')} 主题`
    }
];
