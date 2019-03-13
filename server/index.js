const express = require('express');
const consola = require('consola');
const {Nuxt, Builder} = require('nuxt');
const app = express();
const admin = require('firebase-admin');
app.use(express.json());

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');
config.dev = !(process.env.NODE_ENV === 'production');

const serviceAccount = require('./nuxt-cms-api-firebase.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://nuxt-cms-api.firebaseio.com'
});

const db = admin.database();
const slugsRef = db.ref("slugs");
const layoutsRef = db.ref("layout");
const templatesRef = db.ref("templates");

let localSlugs = {};
let localLayouts = {};
let localTemplates = {};

app.get('/api/slug', (req, res) => {
    res.send(JSON.stringify(localSlugs));
});

app.post('/api/slug', (req, res) => {
    const newSlugRef = db.ref("slugs/" + req.body.slug.replace('/', 'index'));
    newSlugRef.set(req.body).then(() => res.send(JSON.stringify(localSlugs)));
});

app.delete('/api/slug', (req, res) => {
    const newSlugRef = db.ref("slugs/" + req.body.slug);
    newSlugRef.remove().then(() => res.send(JSON.stringify(localSlugs)));
});

app.post('/api/template', (req, res) => {
    const newTemplate = db.ref("templates/" + req.body.name);
    newTemplate.set(req.body).then(() => res.send(JSON.stringify(localTemplates)));
});

app.get('/api/template', (req, res) => {
    res.send(JSON.stringify(localTemplates));
});

app.post('/api/layout', (req, res) => {
    layoutsRef.push(req.body.name).then(() => res.send(JSON.stringify(localLayouts)));
});

app.get('/api/layouts', (req, res) => {
    res.send(JSON.stringify(localLayouts));
});

layoutsRef.on('value', data => {
    localLayouts = data.val();
});

slugsRef.on('value', data => {
    localSlugs = data.val();
});

templatesRef.on('value', data => {
    localTemplates = data.val();
});

async function start() {
    const nuxt = new Nuxt(config);
    const {host, port} = nuxt.options.server;

    if (config.dev) {
        const builder = new Builder(nuxt);
        await builder.build();
    } else {
        await nuxt.ready();
    }

    app.use(nuxt.render);

    app.listen(port, host);
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    });
}

start();
