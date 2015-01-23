var express = require('express');
var router = express.Router({ strict: true });
var bcrypt = require('bcrypt');
var models = require('../../models');
var middleware = require('../middleware');

var paginate = function(page, count) {
  var pages = Math.floor(count / 10) + 1;
  console.log(pages, pages+1)
  var html = '<nav><ul class="pagination"><li';
  if(page == 1) html += ' class="disabled"';
  html += '><a href="?p=' + (page - 1)  + '" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
  for(var x = 1; x < (pages + 1); x++) {
    html += '<li><a href="?p=' + x + '"';
    if(x == page) html += ' class="active"';
    html += '>' + x + '</a></li>';
  }
  html += '<li';
  if(count < 10 || (count % (page * 10)) == 0) html += ' class="disabled"';
  html += '><a href="?p=' + (x + 1) + '" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li></ul></nav>';
  return html;
}

router.use(function(req, res, next) {
  res.locals.layout = 'admin/layout';
  var links = [{ title: 'Logout', href: '/logout' }];
  res.render('admin/navbar', { layout: false, links: links }, function(err, html) {
    res.locals.navbar = html;
  });
  links = [models.User, models.Track, models.Song];
  res.render('admin/sidebar', { layout: false, links: links }, function(err, html) {
    res.locals.sidebar = html;
  });
  next();
});

router.get('/', function(req, res) {
  res.render('admin/dashboard');
});

router.get('/:model/', function(req, res) {
  var model = models[req.params.model];
  if(!req.params.page) req.params.page = 1;
  model.findAndCountAll({
    offset: (req.params.page - 1) * 10,
    limit: 10
  }).then(function(result) {
    res.render('admin/list', { headers: model.adminList(), rows: result.rows, pagination: paginate(req.params.page, result.count) });
  });
});

router.get('/:model/:id', function(req, res) {
  var model = models[req.params.model];
  model.find(req.params.id).then(function(instance) {
    res.render('admin/instance', {});
  });
});

module.exports = router;
