const express = require('express');
const Router = express.Router();
const userModel = require('./UserModel');
const passport = require('passport');

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

Router.post('/save/:id', (req, res) => {
  console.log(req.body._id);
  console.log(req.body.kind);
  userModel.saveEntry(req.body, req.params.id, (err, doc) => {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});

Router.post('/unsave/:id', (req, res) => {
  console.log(req.body._id);
  userModel.deleteEntry(req.body._id, req.params.id, (err, doc) => {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});

Router.get('/get/:id', (req, res) => {
  userModel.getEntries(req.params.id, (err, doc) => {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});

// Router.post('/save', passport.authenticate('jwt', { session: false }), (req, res, next) => {
//   userModel.saveEntry(req.body._id, req.user._id, (err, doc) => {
//     if (err) {
//       res.status(400);
//       res.send(err);
//     } else {
//       res.send(doc);
//     }
//   });
// });
//
// Router.post('/unsave', passport.authenticate('jwt', { session: false }), (req, res, next) => {
//   userModel.deleteEntry(req.body._id, req.user._id, (err, doc) => {
//     if (err) {
//       res.status(400);
//       res.send(err);
//     } else {
//       res.send(doc);
//     }
//   });
// });
//
// Router.post('/get', passport.authenticate('jwt', { session: false }), (req, res, next) => {
//   userModel.getEntries(req.user._id, (err, doc) => {
//     if (err) {
//       res.status(400);
//       res.send(err);
//     } else {
//       res.send(doc);
//     }
//   });
// });

module.exports = Router;
