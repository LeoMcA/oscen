var express = require('express');
var router = express.Router();
var models = require('../models');

router.use(middleware.navbar);

router.get('/add', function(req, res) {
  res.render('song/add', { navbar: req.session.navbar });
});

module.exports = router;
