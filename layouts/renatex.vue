<template>
    <div>

        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="/">
                    Nuxt CMS
                </a>

                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
                   data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">

                <div class="navbar-end">
                    <div class="navbar-item">
                        <ul class="bd-tabs">
                            <li v-for="(item, key) of application.slugs"
                                :key="key"
                            >
                                <nuxt-link
                                    :to="item.slug"
                                    exact-active-class="is-active"
                                >
                                    {{ item.name }}
                                </nuxt-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>


        <section class="hero is-primary">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Renatex layout
                    </h1>
                    <h2 class="subtitle">
                        Hero and footer
                    </h2>
                </div>
            </div>
        </section>

        <div class="container column is-10">
            <nuxt/>
        </div>

        <footer class="footer">
            <div class="content has-text-centered">
                <p>
                    <strong>Nuxt CMS</strong> by <a href="https://github.com/re2005">Renato Cardoso</a>.
                    The source code is Open Souce
                </p>
            </div>
        </footer>

    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        computed: {
            ...mapState(['application'])
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
