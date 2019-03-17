const admin = require('firebase-admin');
const serviceAccount = require('./nuxt-cms-api-firebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://nuxt-cms-api.firebaseio.com'
});

const db = admin.database();
const slugsRef = db.ref("slug");
const layoutsRef = db.ref("layout");
const templatesRef = db.ref("template");

layoutsRef.on('value', data => {
    FireBase.localLayouts = data.val();
});

slugsRef.on('value', data => {
    FireBase.localSlugs = data.val();
});

templatesRef.on('value', data => {
    FireBase.localTemplates = data.val();
});

const FireBase = module.exports = {
    localSlugs: {},
    localLayouts: {},
    localTemplates: {},
    db: db,
    slugsRef: slugsRef,
    layoutsRef: layoutsRef,
    templatesRef: templatesRef
};
