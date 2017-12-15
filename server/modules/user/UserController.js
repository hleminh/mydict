Router.post('/login', passport.authenticate('local', { session: false }), (req, res, next) => {
  let token = userModel.serializeUser(req.user, 60 * 60 * 24 * 3);
  return res.send({user: req.user, token: token});
});

Router.post('/register', function(req, res, next) {
  let newUser = {
    username: req.body.username,
    password: req.body.password
  }

  userModel.createUser(newUser, (err, doc) => {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      passport.authenticate('local', function(err, user, info) {
        if (err) {
          res.status(400);
          return next(err);
        }
        if (!user) {
          return res.send(info);
        } else {
          let token = userModel.serializeUser(user, 60 * 60 * 24 * 3);
          return res.send({user: user, token: token});
        }
      })(req, res, next);
    }
  });
});

module.exports = Router;
