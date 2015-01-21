var express = require('express');
var router = express.Router();
var models = require('../../models');
var middleware = require('./middleware');

router.use(middleware.checkPrivilege);
router.use(middleware.navbar);

router.get('/list', function(req, res) {
  if(!req.params.page) req.params.page = 0;
  models.User.findAndCountAll({
    offset: req.params.page * 10,
    limit: 10
  }).then(function(result) {
    res.render('user/list', { navbar: res.locals.navbar, page: req.params.page, count: result.count, users: result.rows });
  });
});

router.get('/get/:id', function(req, res) {
  models.User.find(req.params.id).then(function(user) {
    res.render('user/get', { navbar: res.locals.navbar, user: user });
  });
});

router.get('/edit/:id', function(req, res) {
  models.User.find(req.params.id).then(function(user) {
    res.render('user/edit', { navbar: res.locals.navbar, user: user });
  });
});

router.post('/edit/:id', function(req, res) {
  models.User.find(req.params.id).then(function(user) {
    user.updateAttributes({
      name: req.body.name
    }).then(function(user) {
      res.redirect('/user/get/'+user.id);
    });
  });
});

router.get('/delete/:id', function(req, res) {
  models.User.find(req.params.id).then(function(user) {
    res.render('user/delete', { navbar: res.locals.navbar, user: user });
  });
});

router.post('/delete/:id', function(req, res) {
  models.User.find(req.params.id).then(function(user) {
    user.destroy().then(function() {
      res.redirect('/user/list');
    });
  });
});

module.exports = router;
