var cognitiveServices = require('./services/cognitive-services');
var faceApi = cognitiveServices.faceApi;

faceApi
    .call(faceApi.methods.detect, {
        url: 'https://media.mercola.com/assets/images/foodfacts/avocado-og.jpg'
    })
    .then(function (response) {
        console.log(response);
    });