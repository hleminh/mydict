const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = require('./UserSchema');
const passport = require('passport');
const passportJWT = require("passport-jwt");
const jwt = require('jsonwebtoken');
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

const saveEntry = (entry, userId, callback) => {
  userModel.findById(userId, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      var saveEntry = {
        kind: entry.kind + '_entries',
        item: entry._id,
      };
      console.log(saveEntry);
      if (doc.entries.indexOf(saveEntry) == -1) {
        doc.entries.push(saveEntry);
        console.log(doc.entries);
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
      var deleteEntry;
      for (element in doc.entries){
        if (entryId == doc.entries[element].item){
          deleteEntry = doc.entries[element];
        }
      }
      doc.entries.splice(doc.entries.indexOf(deleteEntry), 1);
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
  userModel.findById(userId).populate('entries.item').exec((err, doc) => {
    if (err) {
      callback(err);
    } else {
      console.log(doc);
      callback(null, doc.entries);
    }
  });
};

module.exports = {
  createUser,
  serializeUser,
  saveEntry,
  getEntries,
  deleteEntry,
}
