const express = require('express');
const Router = express.Router();
const entryModel = require('./EntryModel');

Router.get('/:category', (req, res) => {
  if (req.query !== {}) {
    console.log('has query');
    var page = (req.query.hasOwnProperty('page'))
      ? parseInt(req.query.page)
      : 0;
    var limit = (req.query.hasOwnProperty('limit'))
      ? parseInt(req.query.limit)
      : 0;
    var filter = (req.query.hasOwnProperty('filter'))
      ? req.query.filter
      : null;
    var kata = (req.query.hasOwnProperty('kata'))
      ? req.query.kata
      : "false";
    if (filter == null) {
      console.log('no filter');
      entryModel.getAllEntriesFromDBWithCategoryWithPageWithLimit(req.params.category, page, limit, (err, result) => {
        if (err) {
          res.status(400);
          res.send(err);
        } else {
          res.status(200);
          res.send(result);
        }
      });
    } else {
      console.log('has filter');
      entryModel.getEntriesFromDBWithCategoryWithFilterWithKata(req.params.category, filter, kata, (err, result) => {
        if (err) {
          res.status(400);
          res.send(err);
        } else {
          res.status(200);
          res.send(result);
        }
      });
    }
  } else {
    console.log('no query');
    entryModel.getAllEntriesFromDBWithCategoryWithPageWithLimit(req.params.category, 0, 0, (err, result) => {
      if (err) {
        res.status(400);
        res.send(err);
      } else {
        res.status(200);
        res.send(result);
      }
    });
  }
});

Router.post("/:category", (req, res) => {
  entryModel.createNewEntryWithCategory(req.params.category, req.body, (err, result) => {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      res.status(200);
      res.send(result);
    }
  });
});

Router.put("/:category/:id", (req, res) => {
  entryModel.updateEntryWithCategoryById(req.params.category, req.params.id, req.body, (err, result) => {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      res.status(200);
      res.send(result);
    }
  });
});

Router.delete("/:category/:id", (req, res) => {
  entryModel.deleteEntryWithCategoryById(req.params.category, req.params.id, (err, result) => {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      res.status(200);
      res.send(result);
    }
  });
});

Router.get("/:category/:id", (req, res) => {
  entryModel.getEntryWithCategoryById(req.params.category, req.params.id, (err, result) => {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      res.status(200);
      res.send(result);
    }
  });
});

module.exports = Router;
