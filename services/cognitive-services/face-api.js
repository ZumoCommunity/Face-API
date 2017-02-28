var Promise = require('promise');

var url = require('url');
var http = require('https');

var configService = require('./../config-service');

var service = {};

service.methods = {
    detect: 'https://westus.api.cognitive.microsoft.com/face/v1.0/detect'
};

service.call = function (requestUrl, requestBody) {
    return new Promise(function(resolve, reject) {
        var faceDetectUrl = url.parse(requestUrl);

        var requestParams = {
            protocol: faceDetectUrl.protocol,
            hostname: faceDetectUrl.hostname,
            port: faceDetectUrl.port,
            path: faceDetectUrl.path,
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': configService.FaceApiKey
            }
        };

        var body = typeof (requestBody) == 'string' ?
            requestBody :
            JSON.stringify(requestBody);

        var request = http.request(requestParams, function(response) {
            var buffer = [];

            response.on('data', function(data) {
                buffer.push(data);
            });

            response.on('end', function() {
                var text = Buffer.concat(buffer).toString();
                resolve(text);
            });
        });

        request.on('error', function(error) {
            reject(error);
        });

        request.write(body);
        request.end();
    });
};

module.exports = service;