<template>
    <section class="section">
        <no-ssr>
            <div class='container'>

                <nuxt-link to="/"
                           class="button is-light">
                    <b-icon icon="arrow-left"></b-icon>
                    <span>home</span>
                </nuxt-link>

                <Template :config="template"
                          class="template" />

                <h3>Edit:</h3>

                <div class="field is-grouped">
                    <div class="control has-icons-left">
                        <div class="select is-small">
                            <select v-model='templateSelected'
                                    @change='editTemplate'>
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

                <Editor />

            </div>
        </no-ssr>
    </section>
</template>

<script>
    import Template from '../components/Template';
    import Editor from '../components/Editor';
    import draggable from 'vuedraggable';
    import _clone from 'lodash/cloneDeep';

    export default {
        name: 'EditorPage',
        layout: 'empty',
        components: {
            Template,
            draggable,
            Editor
        },
        data() {
            return {
                currentColumnItem: undefined,
                isCardModalActive: false,
                showAddColumnChild: false,
                selectedTemplate: 0,
                selectedColumnChildTemplate: 0,
                selectedColumnChildTemplateIndex: null,
                selectedRows: 0,
                maxSelectedRows: 11,
                template: {
                    name: undefined,
                    components: []
                },
                templateSelected: undefined
            };
        },
        methods: {
            editTemplate() {
                this.template = _clone(this.$store.state.application.templates[this.templateSelected]);
            },
            addRow() {
                let column = {name: 'Columns', components: []};
                for (let row = 1; row <= this.selectedRows; row++) {
                    column.components.push([]);
                }
                this.template.components.push(column);
            },
            addComponent() {
                this.template.components.push({name: this.selectedTemplate});
            },
            addChildComponent() {
                this.currentColumnItem.components[this.selectedColumnChildTemplateIndex].push(this.selectedColumnChildTemplate);
            },
            removeComponent(item, slot) {
                this.template.components.splice(slot, 1);
            },
            async saveTemplate() {
                let {data} = await this.$axios.post('http://localhost:3000/api/template', this.template);
                this.$store.dispatch('application/updateTemplates', data);
            },
            removeColumnChildComponent(item, slot, parentSlot) {
                if (item.components.length === 2) {
                    this.template.components.splice(parentSlot, 1);
                }
                item.components.splice(slot, 1);
            },
            removeColumnChildItem(item, i, slot) {
                item.components[i].splice(slot, 1);
            },
            async removeTemplate() {
                let {data} = await this.$axios.delete('http://localhost:3000/api/template', {data: {template: this.templateSelected}});
                this.$store.dispatch('application/updateTemplates', data);
                location.reload(true);
            },
        }
    };
</script>

<style scoped>

    .editor {
        /*position: fixed;*/
        /*left: 0;*/
        /*right: 0;*/
        /*bottom: 0;*/
        /*height: 400px;*/
        /*background: white;*/
        /*z-index: 10;*/
        /*overflow: auto;*/
        /*display: flex;*/
    }

    .template {
        box-shadow: 0 0 20px #c8cdd6;
        padding: 10px;
        margin: 40px 0;
    }

    .setup {
        margin: 20px 0;
    }

    .row {
        background: #F5F5F5;
        padding: 5px;
        margin: 10px 0;
        cursor: move;
    }

    .column-line {
        background: #e9e9e9;
        margin: 5px 0;
        padding: 4px;
        font-size: .9rem;
    }

    .card {
        padding: 30px;
    }

    .card:hover {
        box-shadow: 0 0 10px #F5F5F5;
    }
</style>
