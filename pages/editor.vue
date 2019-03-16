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

                <draggable v-model="template.components"
                           @start="drag=true"
                           @end="drag=false"
                           class="template">

                    <div v-for="(item,index) in template.components"
                         :key="index"
                         class='setup'
                    >
                        <div v-if="!item.components"
                             class="row">
                            {{ item.name }}
                            <span @click="removeComponent(item, index)"
                                  class="button is-small is-danger">remove row</span>
                        </div>

                        <div v-else class="columns">

                            <div v-for="(slot, index2) in item.components"
                                 :key="index2"
                                 class="column"
                            >
                                <div class="row">
                                    {{ index2 + 1}}
                                    <span
                                        @click="currentColumnItem = item; selectedColumnChildTemplateIndex = index2; isCardModalActive = true"
                                        class='button is-info is-small'>add</span>
                                    <span @click="removeColumnChildComponent(item, index2, index)"
                                          class="button is-small is-danger">remove col</span>

                                    <div v-for="(childSlot, i) in slot"
                                         :key="i"
                                    >
                                        {{ childSlot }}
                                        <span @click="removeColumnChildItem(item, index2, i)"
                                              class="button is-small is-danger">remove</span>
                                    </div>
                                </div>
                            </div>
                            <span @click="removeComponent(item, i)"
                                  class="button is-small is-danger">remove row</span>
                        </div>
                    </div>
                </draggable>

                <div class="field is-grouped">
                    <b-select v-model="selectedTemplate"
                              size='is-small'>
                        <option value="0" disabled>select</option>
                        <option v-for="(item, i) in $store.state.application.components"
                                :key="i"
                        >
                            {{ item }}
                        </option>
                    </b-select>
                    <span @click="addComponent"
                          :disabled="selectedTemplate === 0"
                          class="button is-primary is-small">add comp</span>
                </div>

                <div class="field is-grouped">
                    <b-select v-model="selectedRows"
                              size='is-small'>
                        <option value="0" disabled>select</option>
                        <option v-for="(item, i) in maxSelectedRows"
                                :key="i"
                        >
                            {{ item + 1 }}
                        </option>
                    </b-select>
                    <button @click="addRow"
                            :disabled="selectedRows === 0"
                            class="button is-primary is-small">add row
                    </button>
                </div>

                <div class="field is-grouped">
                    <b-input v-model="template.name"
                             size='is-small'
                             placeholder="Template name"
                    />
                    <button @click="saveTemplate"
                            :disabled="!template.name"
                            class="button is-primary is-small">save
                    </button>
                </div>


                <div class="field">
                    <label class="label">Edit current templates:</label>
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


                <b-modal :active.sync="isCardModalActive"
                         :width="400"
                         :height="200"
                         scroll="keep">
                    <div class="card">
                        <h2>Column: {{ selectedColumnChildTemplateIndex + 1 }}</h2>
                        <div class='field is-grouped'>
                            <b-select v-model="selectedColumnChildTemplate"
                                      size='is-small'>
                                <option value="0" disabled>select</option>
                                <option v-for="(item, i) in $store.state.application.components"
                                        :key="i"
                                >
                                    {{ item }}
                                </option>
                            </b-select>
                            <div class='buttons'>
                        <span @click='addChildComponent()'
                              class='button is-warning is-small'>
                            add
                        </span>
                                <span @click='isCardModalActive = false'
                                      class='button is-info is-small'>
                                close
                            </span>
                            </div>
                        </div>
                    </div>
                </b-modal>

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
        layout: 'editor',
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
            },
            removeColumnChildComponent(item, slot, parentSlot) {
                if (item.components.length === 2) {
                    this.template.components.splice(parentSlot, 1);
                }
                item.components.splice(slot, 1);
            },
            removeColumnChildItem(item, i, slot) {
                item.components[i].splice(slot, 1);
            }
        }
    };
</script>

<style scoped>
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

    .card {
        padding: 30px;
    }

    .card:hover {
        box-shadow: 0 0 10px #F5F5F5;
    }
</style>
