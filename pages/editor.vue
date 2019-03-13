<template>
    <section class="section">

        <Template :config="template"/>

        <div v-for="(item,i) in template.components"
             :key="i"
        >
            <div v-if="!item.components"
                 class="row">
                {{ item.name }}
                <span @click="removeComponent(item, i)">remove</span>
            </div>
            <div v-else class="columns">
                <div v-for="(slot, i) in item.components"
                     :key="i"
                     class="column"
                >
                    <div class="row">
                        {{ i }}
                        <span @click="addChildComponent(item, i)">add</span>

                        <div v-for="(childSlot, i) in slot"
                             :key="i"
                        >
                            {{ childSlot }}
                            {{ i }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <b-select v-model="selectedTemplate">
                <option value="0" disabled>select</option>
                <option v-for="(item, i) in components"
                        :key="i"
                >
                    {{ item }}
                </option>
            </b-select>
            <span @click="addComponent">add comp</span>
        </div>

        <div>
            <b-select v-model="selectedRows">
                <option value="0" disabled>select</option>
                <option v-for="(item, i) in maxSelectedRows"
                        :key="i"
                >
                    {{ item }}
                </option>
            </b-select>
            <span @click="addRow">add row</span>
        </div>

        <pre>
            {{ template }}
        </pre>

    </section>
</template>

<script>
    import Template from '../components/Template';

    export default {
        name: 'HomePage',
        layout(context) {
            return context.layout;
        },
        components: {
            Template
        },
        data() {
            return {
                selectedTemplate: 0,
                selectedRows: 0,
                maxSelectedRows: 12,
                template: {
                    name: 'Renatex',
                    components: []
                },
                templates: [
                    {
                        name: 'Title',
                    },
                    {
                        name: 'Paragraph',
                    }
                ]
            };
        },
        computed: {
            components() {
                return this.$store.state.application.components;
            }
        },
        methods: {
            addRow() {
                let column = {name: 'Columns', components: []};
                for (let row = 0; row <= this.selectedRows; row++) {
                    column.components.push([]);
                }
                this.template.components.push(column);
            },
            addComponent() {
                this.template.components.push({name: this.selectedTemplate});
            },
            addChildComponent(item, slot) {
                item.components[slot].push('Title');
            },
            removeComponent(item, slot) {
                item.components[slot].push('Title');
            }
        }
    };
</script>

<style scoped>

    .row {
        background: #F5F5F5;
        padding: 5px;
    }
</style>
