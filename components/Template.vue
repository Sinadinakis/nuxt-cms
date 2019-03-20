<template>
    <div>
        <component
            v-for="(component, index) in config.components"
            :is="component.name"
            :key="index"
            :config="component.components"
            class="template-line" />
    </div>
</template>

<script>
    import Columns from './Columns';

    export default {
        name: 'Template',
        props: {
            config: {
                type: Object,
                require: true
            }
        },
        components: {
            Columns
        }
    };
</script>

<style>
    .template-line {
        margin: 20px 0;
    }
</style>
