<template>
    <div class="container">

        <section class="section">
            <h3 class="title">Add page</h3>

            <div class="field">
                <label class="label">Slug</label>
                <div class="control has-icons-left">
                    <input class="input is-small"
                           placeholder="page-slug"
                           v-model="config.slug">
                    <span class="icon is-small is-left">
                                <font-awesome-icon
                                    icon="link" />
                            </span>
                </div>
            </div>

            <div class="field">
                <label class="label">Name</label>
                <div class="control has-icons-left">
                    <input class="input is-small"
                           placeholder="Page name"
                           v-model="config.name">
                    <span class="icon is-small is-left">
                                <font-awesome-icon
                                    icon="signature" />
                            </span>
                </div>
            </div>

            <div class="field">
                <label class="label">Template</label>
                <div class="control has-icons-left">
                    <div class="select is-small">
                        <select v-model='config.template'>
                            <option value='undefined' disabled>Select...</option>
                            <option v-for='(item, index) in $store.state.application.templates'
                                    :key='index'>
                                {{ item.name }}
                            </option>
                        </select>
                        <div class="icon is-small is-left">
                            <font-awesome-icon
                                icon="file-alt" />
                        </div>
                    </div>
                </div>
            </div>


            <div class="field">
                <label class="label">Layout</label>
                <div class="control has-icons-left">
                    <div class="select is-small">
                        <select v-model='config.layout'>
                            <option value='undefined' disabled>Select...</option>
                            <option v-for='(item, index) in $store.state.application.layouts'
                                    :key='index'>
                                {{ item }}
                            </option>
                        </select>
                        <div class="icon is-small is-left">
                            <font-awesome-icon
                                icon="file-alt" />
                        </div>
                    </div>
                </div>
            </div>

            <button
                class="button is-primary is-small"
                @click="addSlug">Add
            </button>
        </section>

        <section class="section">

            <div class="content is-medium">
                <h3>Other pages</h3>

                <ul class="menu-list">
                    <li
                        v-for="(item, key) of $store.state.application.slugs"
                        :key="key"
                        class='field is-grouped'
                    >
                        <nuxt-link
                            :to="item.slug"
                            exact-active-class="is-active"
                        >
                            <span>{{ item.name }}</span>
                        </nuxt-link>
                        <span class="tags has-addons">
                    <span class="tag">layout: </span><span class="tag is-info">{{ item.layout }}</span>
                    <span class="tag">template: </span><span class="tag is-info">{{ item.template }}</span>
                </span>
                        <div>
                    <span class="button is-warning is-small"
                          @click="editSlug(item)">edit</span>
                            <span class="button is-danger is-small"
                                  @click="removeSlug(item.slug)">remove</span>
                        </div>
                    </li>
                </ul>
            </div>

        </section>
    </div>
</template>

<script>
    export default {
        name: 'EditorComponent',
        data() {
            return {
                config: {
                    slug: undefined,
                    layout: undefined,
                    path: undefined,
                    template: undefined
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
                this.config = {};
                Object.assign(this.config, config);
            },
            async removeSlug(slug) {
                let {data} = await this.$axios.delete('http://localhost:3000/api/slug', {data: {slug: slug}});
                this.$store.dispatch('application/updateSlugs', data);
            },
            async addTemplate() {
                let {data} = await this.$axios.post('http://localhost:3000/api/template', this.template);
            },
            async addLayout() {
                let {data} = await this.$axios.post('http://localhost:3000/api/layout', {name: this.layout});
            }
        }
    };
</script>
