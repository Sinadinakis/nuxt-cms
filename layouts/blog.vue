<template>
    <div>
        Blog
        <nav
            class="navbar header has-shadow is-primary"
            role="navigation"
            aria-label="main navigation"
        >
            <div class="navbar-brand">
                <div class="navbar-burger">
                    <span/>
                    <span/>
                    <span/>
                </div>
            </div>
        </nav>

        <section class="main-content columns">
            <aside class="column is-2 section">
                <p class="menu-label is-hidden-touch">
                    General
                </p>

            </aside>

            <div class="container column is-10">
                <nuxt/>
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
                        to: '/'
                    },
                    {
                        title: 'Renatex',
                        icon: 'lightbulb',
                        to: '/renatex'
                    }
                ]
            };
        }
    };
</script>
