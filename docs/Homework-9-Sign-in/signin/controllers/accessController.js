// access controller, user can only access his own info page, for route '/'
function accessControl(req, res, next) {
  if (!!req.query.username) {
    if (req.session.user.username == req.query.username) {
      if (!!req.session.accessErr) {
        // if accessError is true, show the user's info page with warnings
        delete req.session.accessErr;
        res.render('info', { user: req.session.user, accessErr: true });
      } else res.render('info', { user: req.session.user, accessErr: false });
    } else {
      // user can only access his own info page
      req.session.accessErr = true;
      res.redirect('/?username=' + req.session.user.username);
    }
  } else res.redirect('/?username=' + req.session.user.username); // one has logged in, it will jump to his own info page automatically if he tries to access index page
}

module.exports = accessControl;
