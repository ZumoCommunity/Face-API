var nconf = require('nconf');

var service = {};

nconf
    .argv()
    .env()
    .file({ file: 'appsettings.json' })
    .defaults({
        'FaceApiKey': ''
    });

service.FaceApiKey = nconf.get('FaceApiKey');

module.exports = service;