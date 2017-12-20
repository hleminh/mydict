const mongoose = require('mongoose');
const entrySchema = require('./EntrySchema');
const hepburn = require('hepburn');

const getAllEntriesFromDBWithCategoryWithPageWithLimit = (category, page, limit, callback) => {
  console.log('getAllEntriesFromDBWithCategoryWithPageWithLimit');
  if (page == 0)
    page = 1;
  if (limit == 0)
    limit = 12;
  var entryModel;
  if (category == 'jpn_vie') {
    entryModel = mongoose.model('jpn_vie_entries', entrySchema);
  }
  if (category == 'vie_jpn') {
    entryModel = mongoose.model('vie_jpn_entries', entrySchema);
  }
  entryModel.find({}).skip((page - 1) * limit).limit(limit).lean().exec((err, doc) => {
    if (err) {
      throw(err);
      callback(err);
    } else {
      callback(null, doc);
    }
  });
}

const getEntriesFromDBWithCategoryWithFilterWithKata = (category, filter, kata, callback) => {
  console.log('getEntriesFromDBWithCategoryWithFilterWithKata');
  var entryModel;
  if (category == 'jpn_vie') {
    entryModel = mongoose.model('jpn_vie_entries', entrySchema);
    if (kata === "true"){
      filter = hepburn.toKatakana(filter);
    } else{
      filter = hepburn.toHiragana(filter);
    }
    console.log(`kana filter: |${filter}|`);
  }
  if (category == 'vie_jpn') {
    entryModel = mongoose.model('vie_jpn_entries', entrySchema);
    console.log(`vnmese filter: |${filter}|`);
  }
  entryModel.find({
    $text: {
      $search: "\"" + filter + "\""
    }
  }).lean().sort([
    ['priority', -1]
  ]).exec((err, doc) => {
    if (err) {
      throw err;
      callback(err);
    } else {
      callback(null, doc);
    }
  });
}

const getAllExistingIdWithCategory = (category, callback) =>{
  console.log('getAllExistingIdWithCategory');
  var entryModel;
  if (category == 'jpn_vie') {
    entryModel = mongoose.model('jpn_vie_entries', entrySchema);
  }
  if (category == 'vie_jpn') {
    entryModel = mongoose.model('vie_jpn_entries', entrySchema);
  }
  entryModel.findOne().select('id -_id').sort([
    ['_id', -1]
  ]).lean().exec((err, doc) => {
    if (err){
      console.log(err);
      callback(err);
    }
    else{
      console.log(doc);
      callback(null, doc);
    }
  })
}

const createNewEntryWithCategory = (category, newEntry, callback) => {
  console.log('createNewEntryWithCategory');
  console.log(category);
  console.log(newEntry);
  getAllExistingIdWithCategory(category, (error, result) => {
    var entryModel;
    if (category == 'jpn_vie') {
      entryModel = mongoose.model('jpn_vie_entries', entrySchema);
    }
    if (category == 'vie_jpn') {
      entryModel = mongoose.model('vie_jpn_entries', entrySchema);
    }
    var trueNewEntry = {
      origin: newEntry.origin,
      kana: newEntry.kana,
      definition: newEntry.definition,
      id: parseInt(result.id) + 1,
    }
    entryModel.create(trueNewEntry, (err, doc) => {
      if (err) {
        callback(err);
      } else {
        callback(null, doc);
      }
    });
  })
};

const updateEntryWithCategoryById = (category, id, fields, callback) => {
  console.log('updateEntryWithCategoryById')
  console.log(category);
  console.log(id);
  console.log(fields);
  var entryModel;
  if (category == 'jpn_vie') {
    entryModel = mongoose.model('jpn_vie_entries', entrySchema);
  }
  if (category == 'vie_jpn') {
    entryModel = mongoose.model('vie_jpn_entries', entrySchema);
  }
  entryModel.findOneAndUpdate({
    _id: id,
  }, fields, {new: true}, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      console.log(doc);
      callback(null, doc);
    }
  });
}

const deleteEntryWithCategoryById = (category, id, callback) => {
  var entryModel;
  if (category == 'jpn_vie') {
    entryModel = mongoose.model('jpn_vie_entries', entrySchema);
  }
  if (category == 'vie_jpn') {
    entryModel = mongoose.model('vie_jpn_entries', entrySchema);
  }
  entryModel.remove({
    _id: id
  }, function(err, doc) {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  });
}

const getEntryWithCategoryById = (category, id, callback) => {
  var entryModel;
  if (category == 'jpn_vie') {
    entryModel = mongoose.model('jpn_vie_entries', entrySchema);
  }
  if (category == 'vie_jpn') {
    entryModel = mongoose.model('vie_jpn_entries', entrySchema);
  }
  entryModel.findOne({
    id: id
  }, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  })
}

module.exports = {
  createNewEntryWithCategory,
  updateEntryWithCategoryById,
  deleteEntryWithCategoryById,
  getEntryWithCategoryById,
  getAllEntriesFromDBWithCategoryWithPageWithLimit,
  getEntriesFromDBWithCategoryWithFilterWithKata
};
