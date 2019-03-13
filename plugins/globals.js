import Vue from 'vue';

export default ({store}) => {

    const components = require.context('@/components/Globals', false, /\.vue$/);

    components.keys().forEach(fileName => {
        const componentConfig = components(fileName);
        const componentName = fileName.split('/').pop().split('.')[0];
        Vue.component(componentName, componentConfig.default || componentConfig);
        if (!process.client) store.dispatch('application/updateComponents', componentName);
    });
};
