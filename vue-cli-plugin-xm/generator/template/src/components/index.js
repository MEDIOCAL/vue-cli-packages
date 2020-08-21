import Hello from './hello';

const components = [
    Hello
];

export default {
    install(Vue) {
        components.forEach(component => {
            Vue.use(component);
        });
    }
};
