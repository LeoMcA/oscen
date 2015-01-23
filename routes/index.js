var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var models = require('../models');
var middleware = require('./middleware');

router.use(middleware.navbar);

router.get('/', function(req, res) {
  res.render('index', { navbar: res.locals.navbar, title: 'Express' });
});

router.get('/login', function(req, res) {
  res.render('login', { navbar: res.locals.navbar });
});

router.post('/login', function(req, res) {
  models.User.findOrCreate({
    where: { email: req.body.email },
    defaults: { password: req.body.password }
  }).spread(function(user, created) {
    if(created) {
      req.session.userId = user.id;
      res.redirect('/');
    } else {
      bcrypt.compare(req.body.password, user.values.password, function(err, same){
        if(same) {
          req.session.userId = user.id;
          if(req.session.redirect) res.redirect(req.session.redirect);
          else res.redirect('/');
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
