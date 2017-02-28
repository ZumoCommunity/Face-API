var Promise = require('promise');

var cognitiveServices = require('./services/cognitive-services');
var faceApi = cognitiveServices.faceApi;

var promises = [];

promises.push(faceApi
    .call(faceApi.methods.detect, {
        url: ''
    }));
promises.push(faceApi
    .call(faceApi.methods.detect, {
        url: ''
    }));
promises.push(faceApi
    .call(faceApi.methods.detect, {
        url: ''
    }));
promises.push(faceApi
    .call(faceApi.methods.detect, {
        url: ''
    }));
promises.push(faceApi
    .call(faceApi.methods.detect, {
        url: ''
    }));
promises.push(faceApi
    .call(faceApi.methods.detect, {
        url: ''
    }));

Promise.all(promises).then(function(responses){ 
    var array = responses.map(function(item){
        return JSON.parse(item);
    }).map(function(item){
        return item[0].faceId;
    });

    console.log('photos');
    console.log(array);

    faceApi.call(faceApi.methods.group,{ faceIds: array }).then(function(response){
        var q = JSON.parse(response);
        console.log('groups');
        console.log(q.groups);
    });
});