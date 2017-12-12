const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrySchema = new Schema({
  id: {
    type: Number,
    require: true,
    unique: true,
  },
  origin: {
    type: String,
    require: true,
  },
  kana: {
    type: String,
    require: true,
  },
  definition: {
    type: String,
    require: true,
  },
  priority: {
    type: Number,
    require: true,
    defaults: 0,
  },
}, {
  timestamps: true
});

entrySchema.index({origin: 'text', kana: 'text'});

module.exports = entrySchema;
