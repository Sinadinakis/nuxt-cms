<template>
    <section class="section">

        <h1>Editor</h1>

        slug:
        <input v-model="config.slug"/>

        layout:
        <input v-model="config.layout"/>

        name:
        <input v-model="config.name"/>

        template:
        <input v-model="config.template"/>

        <button
            class="button is-primary"
            @click="addSlug">Add
        </button>

        <pre>
            {{ config }}
        </pre>

        <div class="tile">

            <button
                class="button is-primary"
                @click="addTemplate">Add Template
            </button>
            <pre>
                {{ template }}
            </pre>
        </div>

        <div class="tile">
            layout:
            <input v-model="layout"/>

            <button
                class="button is-primary"
                @click="addLayout">Add Layout
            </button>
        </div>

        <ul class="menu-list">
            <li
                v-for="(item, key) of application.slugs"
                :key="key"
            >
                <nuxt-link
                    :to="item.slug"
                    exact-active-class="is-active"
                >
                    <span>{{ item.name }}</span>
                </nuxt-link>
                <span class="tags has-addons">
                    <span class="tag">layout: </span><span class="tag is-info">{{ item.layout }}</span>
                </span>
                <span class="button is-warning is-small"
                      @click="editSlug(item)">edit</span>
                <span class="button is-danger is-small"
                      @click="removeSlug(item.slug)">remove</span>
            </li>
        </ul>


    </section>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: 'Editor',
        data() {
            return {
                config: {
                    slug: undefined,
                    layout: undefined,
                    path: undefined,
                    template: undefined
                },
                layout: undefined,
                template: {
                    name: 'default',
                    components: [
                        {
                            name: 'Title'
                        },
                        {
                            name: 'TwoColumns',
                            components: {
                                firstCol: [
                                    {
                                        name: 'Paragraph'
                                    }
                                ],
                                secondCol: [
                                    {
                                        name: 'Paragraph'
                                    }
                                ],
                            }
                        }
                    ]
                }

            };
        },
        methods: {
            async addSlug() {
                let {data} = await this.$axios.post('http://localhost:3000/api/slug', this.config);
                this.$store.dispatch('application/updateSlugs', data);
                this.config = {};
            },
            async editSlug(config) {
                this.config = config;
            },
            async removeSlug(slug) {
                let {data} = await this.$axios.delete('http://localhost:3000/api/slug', {data: {slug: slug}});
                this.$store.dispatch('application/updateSlugs', data);
            },
            async addTemplate() {
                let {data} = await this.$axios.post('http://localhost:3000/api/template', this.template);
                // this.$store.dispatch('application/updateTemplates', data);
            },
            async addLayout() {
                let {data} = await this.$axios.post('http://localhost:3000/api/layout', {name: this.layout});
                debugger;
                // this.$store.dispatch('application/updateTemplates', data);
            }
        },
        computed: {
            ...mapState(['application'])
        }
    };
</script>
