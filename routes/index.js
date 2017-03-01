var Promise = require('promise');

var cognitiveServices = require('./../services/cognitive-services');
var faceApi = cognitiveServices.faceApi;

var _ = require('lodash');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('index');
});

router.post('/', function(req, res) {
    var images = req.body.images;

    var promises = images.map(function(image) {
        return faceApi.call(faceApi.methods.detect, { url: image.url });
    });

    Promise.all(promises)
        .then(function (responses) {
            var faces = [];

            for (var i = 0; i < images.length; i++) {
                images[i].faces = JSON.parse(responses[i]);
                if (Array.isArray(images[i].faces)) {
                    images[i].faces.forEach(function(face) {
                        faces.push(face.faceId);
                    });
                }
            }

            var uniqueFaces = _.uniq(faces);

            return faceApi.call(faceApi.methods.group, { faceIds: uniqueFaces });
        }, function (error) {
            console.log(error);
        })
        .then(function (response) {
            var result = {
                images: images,
                groups: []
            };

            var data = JSON.parse(response);

            data.groups.forEach(function(faces) {
                var group = [];

                faces.forEach(function (faceId) {
                    images.filter(function (image) {
                        return image.faces.filter(function (face) {
                                return face.faceId == faceId;
                            }).length > 0;
                    }).forEach(function (image) {
                        group.push(image);
                    });
                });

                result.groups.push({ imageUrls: group });
            });

            // data.messyGroup.forEach(function(messyGroup) {
            //     console.log(messyGroup);
            // });

            res.json(result);
        }, function (error) {
            console.log(error);
        });
});

module.exports = router;
