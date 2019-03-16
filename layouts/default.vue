<template>
    <div>
        <nav
            class="navbar header has-shadow is-primary"
            role="navigation"
            aria-label="main navigation"
        >
            <div class="navbar-brand">
                <div class="navbar-burger">
                    <span />
                    <span />
                    <span />
                </div>
            </div>
        </nav>

        <section class="main-content columns">
            <aside class="column is-3 section">

                <ul class="menu-list">
                    <li
                        v-for="(item, key) of items"
                        :key="key"
                    >
                        <nuxt-link
                            :to="item.to"
                            exact-active-class="is-active"
                        >
                            <font-awesome-icon
                                :icon="item.icon" />

                            {{ item.title }}
                        </nuxt-link>
                    </li>
                </ul>
            </aside>

            <div class="container column is-10">
                <nuxt />
            </div>
        </section>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                items: [
                    {
                        title: 'Home',
                        icon: 'home',
                        to: {path: '/'}
                    },
                    {
                        title: 'Template Editor',
                        icon: 'edit',
                        to: {path: '/editor'}
                    },
                    {
                        title: 'Slugs',
                        icon: 'link',
                        to: {path: '/slugs'}
                    }
                ]
            };
        }
    };
</script>
