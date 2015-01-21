var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var models = require('../../models');
var middleware = require('../middleware');

router.use(middleware.checkPrivilege);
router.use(middleware.adminNavbar);
router.use(middleware.adminSidebar);

router.get('/', function(req, res) {
  res.render('admin/dashboard', { layout: 'admin/layout', navbar: res.locals.navbar, sidebar: res.locals.sidebar });
});

router.get('/:model', function(req, res) {
  var model = models[req.params.model];
  console.log(model.adminList());
  model.findAndCountAll({
    offset: req.params.page * 10,
    limit: 10
  }).then(function(result) {
    res.render('admin/list', { layout: 'admin/layout', navbar: res.locals.navbar, headers: model.adminList(), rows: result.rows });
  });
});

module.exports = router;
