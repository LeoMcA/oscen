var express = require('express');
var router = express.Router();
var models = require('../models');
var middleware = require('./middleware');

router.use(middleware.navbar);

router.get('/add', function(req, res) {
  res.render('track/add', { navbar: req.session.navbar });
});

router.post('/add', function(req, res) {
  models.Track.create({
    name: req.body.name
  }).then(function(track) {
    res.redirect('/track/get/'+track.id);
  });
});

router.get('/list', function(req, res) {
  if(!req.params.page) req.params.page = 0;
  models.Track.findAndCountAll({
    offset: req.params.page * 10,
    limit: 10
  }).then(function(result) {
    res.render('track/list', { navbar: req.session.navbar, page: req.params.page, count: result.count, tracks: result.rows });
  });
});

router.get('/get/:id', function(req, res) {
  models.Track.find(req.params.id).then(function(track) {
    res.render('track/get', { navbar: req.session.navbar, track: track });
  });
});

router.get('/edit/:id', function(req, res) {
  models.Track.find(req.params.id).then(function(track) {
    res.render('track/edit', { navbar: req.session.navbar, track: track });
  });
});

router.post('/edit/:id', function(req, res) {
  models.Track.find(req.params.id).then(function(track) {
    track.updateAttributes({
      name: req.body.name
    }).then(function(track) {
      res.redirect('/track/get/'+track.id);
    });
  });
});

router.get('/delete/:id', function(req, res) {
  models.Track.find(req.params.id).then(function(track) {
    res.render('track/delete', { navbar: req.session.navbar, track: track });
  });
});

router.post('/delete/:id', function(req, res) {
  models.Track.find(req.params.id).then(function(track) {
    track.destroy().then(function() {
      res.redirect('/track/list');
    });
  });
});

module.exports = router;
