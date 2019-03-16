export default async function (context) {
    context.config = await context.$axios.$get('http://localhost:3000/api/config', {
        params: {slug: context.params.pathMatch || 'index'}
    });

    context.store.dispatch('application/updateSlugs', context.config.slugs);
    context.store.dispatch('application/updateCurrentSlugComponents', context.config.components);
    context.store.dispatch('application/updateIs404', context.config.is404);
    context.store.dispatch('application/updateLayouts', context.config.layouts);
    context.store.dispatch('application/updateTemplates', context.config.templates);
}
