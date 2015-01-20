var express = require('express');
var router = express.Router();
var models = require('../models');
var middleware = require('./middleware');

router.use(middleware.navbar);

router.get('/add', function(req, res) {
  res.render('song/add', { navbar: req.session.navbar });
});

router.post('/add', function(req, res) {
  models.Song.create({
    name: req.body.name
  }).then(function(song) {
    res.redirect('/song/get/'+song.id);
  });
});

router.get('/list', function(req, res) {
  if(!req.params.page) req.params.page = 0;
  models.Song.findAndCountAll({
    offset: req.params.page * 10,
    limit: 10
  }).then(function(result) {
    res.render('song/list', { navbar: req.session.navbar, page: req.params.page, count: result.count, songs: result.rows });
  });
});

router.get('/get/:id', function(req, res) {
  models.Song.find(req.params.id).then(function(song) {
    res.render('song/get', { navbar: req.session.navbar, song: song });
  });
});

router.get('/edit/:id', function(req, res) {
  models.Song.find(req.params.id).then(function(song) {
    res.render('song/edit', { navbar: req.session.navbar, song: song });
  });
});

router.post('/edit/:id', function(req, res) {
  models.Song.find(req.params.id).then(function(song) {
    song.updateAttributes({
      name: req.body.name
    }).then(function(song) {
      res.redirect('/song/get/'+song.id);
    });
  });
});

router.get('/delete/:id', function(req, res) {
  models.Song.find(req.params.id).then(function(song) {
    res.render('song/delete', { navbar: req.session.navbar, song: song });
  });
});

router.post('/delete/:id', function(req, res) {
  models.Song.find(req.params.id).then(function(song) {
    song.destroy().then(function() {
      res.redirect('/song/list');
    });
  });
});

module.exports = router;
