import Vue from 'vue';
<%_ if (options.full_element) { _%>
    import Element from 'element-ui';
    <%_ if(options.elCustomTheme) { _%>
        import '@theme/element.scss';
    <%_ } _%>

    Vue.use(Element);

<%_ } else { _%>

    import { Button } from 'element-ui';
    import { Link } from 'element-ui';

    <%_ if (!options.elCustomTheme) { _%>

        import 'element-ui/lib/theme-chalk/index.css';

    <%_ } _%>

    const Components = [
        Button,
        Link
    ];

    Components.forEach(component => {
        Vue.use(component);
    });

<%_ } _%>
