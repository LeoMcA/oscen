var middleware = {};

middleware.navbar = function(req, res, next) {
  var links = [{ title: 'Login / Signup', href: '/login' }];
  if(req.session.email){
    links = [{ title: 'Logout', href: '/logout' }];
  }
  res.render('navbar', { layout: false, links: links }, function(err, html) {
    req.session.navbar = html;
    next();
  });
}

middleware.checkPrivilege = function(req, res, next) {
  if(req.session.email) next();
  else res.redirect('/login');
}

module.exports = middleware;