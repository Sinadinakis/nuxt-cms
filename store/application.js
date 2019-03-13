export const state = () => ({
    slugs: undefined,
    components: []
});

export const actions = {
    updateSlugs({commit}, value) {
        commit('updateSlugs', value);
    },
    updateCurrentSlugLayout({commit}, value) {
        commit('updateSlugs', value);
    },
    removeSlug({commit}, slug) {
        commit('removeSlug', slug);
    },
    updateComponents({commit}, value) {
        commit('updateComponents', value);
    },
};

export const mutations = {
    updateSlugs(state, value) {
        state.slugs = value;
    },
    updateComponents(state, value) {
        state.components.push(value);
    }
};
export const getters = {};
