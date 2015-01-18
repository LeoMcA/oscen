var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var models = require('../models');

router.use(function(req, res, next) {
  var links = [{ title: 'Login / Signup', href: '/login' }];
  if(req.session.email){
    links = [{ title: 'Logout', href: '/logout' }];
  }
  res.render('navbar', { layout: false, links: links }, function(err, html) {
    req.session.navbar = html;
    next();
  });
});

router.get('/', function(req, res) {
  res.render('index', { navbar: req.session.navbar, title: 'Express' });
});

router.get('/login', function(req, res) {
  res.render('login', { navbar: req.session.navbar });
});

router.post('/login', function(req, res) {
  models.User.findOrCreate({
    where: { email: req.body.email },
    defaults: { password: req.body.password }
  }).spread(function(user, created) {
    if(created) {
      req.session.email = req.body.email;
      res.redirect('/');
    } else {
      bcrypt.compare(req.body.password, user.values.password, function(err, same){
        if(same) {
          req.session.email = req.body.email;
          res.redirect('/');
        } else res.redirect('/login');
      });
    }
  });
});

router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    res.redirect('back');
  });
});

module.exports = router;
