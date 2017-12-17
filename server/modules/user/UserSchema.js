const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const usersSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  avatar: {
    type: String
  },
  admin: {
    type: Boolean,
    default: false
  },
  entries:{
    type: [Schema.Types.ObjectId],
    refPath: 'entries.kind',
  }
}, {timestamps: {createAt: 'create_at', updateAt: 'update_at'}});

usersSchema.pre('save', function(next) {
  let user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
})

module.exports = usersSchema;
