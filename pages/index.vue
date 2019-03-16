<template>
    <section class="section">
        <Template :config="$store.state.application.slugComponents" />
    </section>
</template>

<script>
    import Template from '../components/Template';

    export default {
        name: 'HomePage',
        layout(context) {
            return context.config.layout;
        },
        components: {
            Template
        }
    };
</script>
