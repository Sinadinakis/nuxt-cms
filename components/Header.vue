<template>

    <nav class="navbar has-shadow is-spaced">
        <div class='container'>
            <div class="navbar-brand">
                <nuxt-link class="navbar-item" to="/">
                    <img src="~/assets/nuxt-cms-logo.svg"
                         alt="NuxtCMS - re2005" width="150">
                </nuxt-link>
                <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div id="navbarExampleTransparentExample" class="navbar-menu">
                <div class="navbar-start">
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link" href="#" v-if='Object.keys($store.state.application.slugs).length'>
                            Pages
                        </a>
                        <div class="navbar-dropdown is-boxed">

                            <nuxt-link
                                v-for="(item, key) of $store.state.application.slugs"
                                :key="key"
                                :to="item.slug"
                                exact-active-class="is-active"
                                class="navbar-item"
                            >
                                {{ item.name }}
                            </nuxt-link>

                        </div>
                    </div>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="field is-grouped">
                            <p class="control">
                                <nuxt-link class="button is-link"
                                           to="/template-editor">
                            <span class="icon">
                                <font-awesome-icon icon="edit" />
                            </span>
                                    <span>
                                Template Editor
                            </span>
                                </nuxt-link>
                            </p>
                            <p class="control">
                                <nuxt-link class="button is-primary"
                                           to="/page-editor">
                            <span class="icon">
                                <font-awesome-icon
                                    icon="link" />
                              </span>
                                    <span>Page Creator</span>
                                </nuxt-link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
