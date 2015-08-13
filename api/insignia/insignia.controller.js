'use strict';

var _ = require('lodash');
var Insignia = require('./insignia.model');
var fs = require('fs');

// Get list of insignias
exports.index = function(req, res) {
  Insignia.getInsignias(function (err, insignias) {
    if(err) { return handleError(res, err); }
    return res.json(200, insignias);
  });
};

// Get a single insignia
exports.show = function(req, res) {
  Insignia.getInsigniaID(req.params.id, function (err, insignia) {
    if(err) { return handleError(res, err); }
    if(!insignia) { return res.send(404); }
    return res.json(insignia);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}