<template>
    <section class="section">
        <!--<Template :config="$store.state.application.slugComponents" />-->
        Welcome to Nuxt CMS
    </section>
</template>

<script>
    import Template from '../components/Template';

    export default {
        name: 'HomePage',
        layout: 'default',
        components: {
            Template
        }
    };
</script>
