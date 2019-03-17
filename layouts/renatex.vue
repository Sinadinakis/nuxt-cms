<template>
    <div class='container'>

        <Header />

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

            <div class="container column is-7">
                <nuxt />
            </div>
        </section>
    </div>
</template>

<script>
    import Header from '@/components/Header';

    export default {
        components: {
            Header
        },
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
                    }
                ]
            };
        },
        mounted() {
            if (process.client) {
                const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
                if ($navbarBurgers.length > 0) {
                    $navbarBurgers.forEach(el => {
                        el.addEventListener('click', () => {
                            const target = el.dataset.target;
                            const $target = document.getElementById(target);
                            el.classList.toggle('is-active');
                            $target.classList.toggle('is-active');
                        });
                    });
                }
            }
        }
    };
</script>

