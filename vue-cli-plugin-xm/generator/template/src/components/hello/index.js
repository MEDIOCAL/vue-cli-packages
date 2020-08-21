import Hello from './src/Hello.vue';

Hello.install = function(vue) {
    vue.component(Hello.name, Hello);
};

export default Hello;
