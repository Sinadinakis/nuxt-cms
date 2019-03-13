<template>
    <section class="section">

        <Template :config="config"/>

        <Editor/>

    </section>
</template>

<script>
    import {mapState} from 'vuex';

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
            return context.layout;
        },
        components: {},
        computed: {
            ...mapState(['application'])
        }
    };
</script>
