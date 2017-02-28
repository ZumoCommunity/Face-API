var url = require('url');
var http = require('https');

var faceDetectUrl = url.parse('https://westus.api.cognitive.microsoft.com/face/v1.0/detect');

var requestParams = {
    protocol: faceDetectUrl.protocol,
    hostname: faceDetectUrl.hostname,
    port: faceDetectUrl.port,
    path: faceDetectUrl.path,
    method: 'POST',
    headers: {
        'Ocp-Apim-Subscription-Key': ''
    }
};

var requestBody = {
    url: 'https://media.mercola.com/assets/images/foodfacts/avocado-og.jpg'
};

var request = http.request(requestParams, function(response) {
    var buffer = [];
    response.on('data', function(data) {
        buffer.push(data);
    });
    response.on('end', function() {
        var text = Buffer.concat(buffer).toString();
        console.log(text);
    });
});

request.on('error', function(error) {
    console.log(error);
});

request.write(JSON.stringify(requestBody));
request.end();