const express = require('express');
const router = express.Router();
const FireBase = require('./firebase');

// router.use(function timeLog(req, res, next) {
//     next();
// });

router.get('/api/slug', (req, res) => {
    sendJson(res, FireBase.localSlugs);
});

router.post('/api/slug', (req, res) => {
    const newSlugRef = FireBase.db.ref("slug/" + req.body.slug.replace('/', 'index'));
    newSlugRef.set(req.body).then(() => sendJson(res, FireBase.localSlugs));
});

router.delete('/api/slug', (req, res) => {
    const newSlugRef = FireBase.db.ref("slug/" + req.body.slug);
    newSlugRef.remove().then(() => sendJson(res, FireBase.localSlugs));
});

router.post('/api/template', (req, res) => {
    const newTemplate = FireBase.db.ref("template/" + req.body.name);
    newTemplate.set(req.body).then(() => sendJson(res, FireBase.localTemplates));
});

router.get('/api/template', (req, res) => {
    sendJson(res, FireBase.localTemplates);
});


router.delete('/api/template', (req, res) => {
    const newTemplateRef = FireBase.db.ref("template/" + req.body.template);
    newTemplateRef.remove().then(() => sendJson(res, FireBase.localTemplates));
});

router.post('/api/layout', (req, res) => {
    FireBase.layoutsRef.push(req.body.name).then(() => sendJson(res, FireBase.localLayouts));
});

router.get('/api/layout', (req, res) => {
    sendJson(res, FireBase.localLayouts);
});

router.get('/api/config', (req, res) => {

    if (!FireBase.localSlugs) FireBase.localSlugs = {};
    let slug = FireBase.localSlugs[req.query.slug] || {
        layout: 'default',
        template: 'default',
        is404: true
    };

    let config = {
        layout: slug.layout,
        components: FireBase.localTemplates[slug.template],
        slugs: FireBase.localSlugs,
        is404: slug.is404,
        layouts: FireBase.localLayouts,
        templates: FireBase.localTemplates
    };
    sendJson(res, config);
});

function sendJson(res, data) {
    res.send(JSON.stringify(data));
}

module.exports = router;
