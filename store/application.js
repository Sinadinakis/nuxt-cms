export const state = () => ({
    slugs: undefined,
    components: [],
    slugComponents: undefined,
    is404: false,
    layouts: undefined,
    templates: undefined
});

export const actions = {
    updateSlugs({commit}, value) {
        commit('updateSlugs', value);
    },
    updateCurrentSlugComponents({commit}, value) {
        commit('updateCurrentSlugComponents', value);
    },
    updateComponents({commit}, value) {
        commit('updateComponents', value);
    },
    updateIs404({commit}, value) {
        commit('updateIs404', value);
    },
    updateLayouts({commit}, value) {
        commit('updateLayouts', value);
    },
    updateTemplates({commit}, value) {
        commit('updateTemplates', value);
    }
};

export const mutations = {
    updateSlugs(state, value) {
        state.slugs = value;
    },
    updateComponents(state, value) {
        state.components.push(value);
    },
    updateCurrentSlugComponents(state, value) {
        state.slugComponents = value;
    },
    updateIs404(state, value) {
        state.is404 = value;
    },
    updateLayouts(state, value) {
        state.layouts = value;
    },
    updateTemplates(state, value) {
        state.templates = value;
    }
};
export const getters = {};
