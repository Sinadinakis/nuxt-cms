export default async function (context) {
    const data = await context.$axios.$get('http://localhost:3000/api/slug');
    context.store.dispatch('application/updateSlugs', data);
    context.layout = getLayout(data, context.params.pathMatch || 'index');
}

const getLayout = function (data, route) {
    let layout = 'default';
    if (data[route] && data[route].layout) layout = data[route].layout;
    return layout;
};
