<template>
    <div class="columns">
        <div v-for="(component) in config"
             class="column">
            <component
                v-for="(item, index) in component"
                :is="item"
                :key="index"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Columns',
        props: {
            config: {
                type: Array,
                require: true
            }
        }
    };
</script>
