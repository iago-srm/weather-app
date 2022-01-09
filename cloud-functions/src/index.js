"use strict";
exports.__esModule = true;
exports.placeDetails = exports.autoComplete = void 0;
var google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
var googleKey = 'AIzaSyDUcRufXFYP0bx9L1acubRv729tA0ooCpc';
var autoComplete = function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var client = new google_maps_services_js_1.Client({});
    client.placeAutocomplete({ params: { input: req.query.input, language: req.query.language, key: googleKey } }).then(function (result) {
        res.status(200).json(result.data.predictions);
    })["catch"](function (err) {
        res.send('houve um erro' + err.response);
    });
};
exports.autoComplete = autoComplete;
var placeDetails = function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var client = new google_maps_services_js_1.Client({});
    client.placeDetails({ params: { place_id: req.query.place_id, key: googleKey, fields: ['geometry'] } }).then(function (result) {
        var _a;
        res.status(200).json((_a = result.data.result.geometry) === null || _a === void 0 ? void 0 : _a.location);
    })["catch"](function (err) {
        res.send('houve um erro' + err.response);
    });
};
exports.placeDetails = placeDetails;
