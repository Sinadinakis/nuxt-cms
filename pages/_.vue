<template>
    <section class="section">

        <Template :config="$store.state.application.slugComponents"
                  v-if='!$store.state.application.is404' />
        <div v-else>
            This page is notfound
        </div>

    </section>
</template>

<script>
    import Editor from '../components/Editor';
    import Template from '../components/Template';

    export default {
        name: 'HomePage',
        data() {
            return {
                config: {
                    name: 'default',
                    components: [
                        {
                            name: 'Title'
                        },
                        {
                            name: 'Columns',
                            components: [
                                ['Paragraph', 'Paragraph'],
                                ['Paragraph', 'Paragraph']
                            ]
                        }
                    ]
                }
            };
        },
        layout(context) {
            return context.config.layout;
        },
        components: {
            Editor,
            Template
        }
    };
</script>
