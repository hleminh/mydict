const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = require('./userSchema');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const passportJWT = require("passport-jwt");
const jwt = require('jsonwebtoken');
const postController = require('../posts/postController');
var LocalStrategy = require('passport-local').Strategy;
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = 'secret';

let userModel = mongoose.model('users', userSchema);

const serializeUser = (user, expire) => {
  var payload = {
    id: user.id
  };
  var token = jwt.sign(payload, jwtOptions.secretOrKey, {
    expiresIn: expire
  });
  return token;
}

const createUser = (user, callback) => {
  userModel.create(user, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  });
};

passport.use(new LocalStrategy(
  function(username, password, done) {
    userModel.findOne({
      "username": username
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }

      bcrypt.compare(password, user.password, (err, isValid) => {
        if (err) {
          return done(err);
        }
        if (!isValid) {
          return done(null, false, {
            message: 'Incorrect password.'
          });
        }
        return done(null, user);
      });
    })
  }));

passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  userModel.findOne({
    "_id": jwt_payload.id
  }, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false);
    } else {
      return next(null, user);
    }
  })
}));

const saveEntry = (entryId, userId, callback) => {
  userModel.findById(userId, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      if (doc.entries.indexOf(entryId) == -1) {
        doc.postId.push(entryId);
        doc.save((err, updatedDoc) => {
          if (err) {
            callback(err);
          } else {
            callback(null, updatedDoc);
          }
        });
      } else {
        callback('Already added');
      }
    }
  });
};

const deleteEntry = (entryId, userId, callback) => {
  userModel.findById(userId, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      doc.postId.splice(doc.postId.indexOf(entryId), 1);
      doc.save((err, updatedDoc) => {
        if (err) {
          callback(err);
        } else {
          callback(null, updatedDoc);
        }
      });
    }
  });
};

const getEntries = (userId, callback) => {
  userModel.findById(userId).populate('entries').(err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc.entries);
    }
  });
};

module.exports = {
  createUser,
  savePost,
  deletePost,
  getPosts,
  getPostsURL,
  serializeUser
}
