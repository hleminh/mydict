const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const http = require('http');
const config = require('./config.json');
const entryController = require('./modules/entry/EntryController');
const userController = require('./modules/user/UserController');

var app = express();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({secret: 'secret', resave: false, saveUninitialized: false}));
app.use(passport.initialize());

app.use('/entry', entryController);
app.use('/user', userController);


const server = http.createServer(app);

server.listen(config.port, () => {
  console.log(`App listen on ${config.port}`);
});

mongoose.connect(config.connectionDatabase, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connect to db success');
    // loadData('seed_jpn_vie.txt', 'jpn_vie_entries');
  }
});

loadData = (fileName, modelName) => {
  var fs = require('fs');
  var LineInputStream = require('line-input-stream');
  var stream = LineInputStream(fs.createReadStream(fileName, {flags: 'r'}));

  var entrySchema = require('./modules/entry/EntrySchema');

  var Entry = mongoose.model(modelName, entrySchema);

  stream.setDelimiter('}');

  mongoose.connection.on('open', function(err, conn) {

    var bulk = Entry.collection.initializeOrderedBulkOp();
    var counter = 0;

    stream.on('error', function(err) {
      console.log(err);
    });

    stream.on('line', function(line) {
      var row = line.split('}');
      var columns = row[0].split('|');
      var obj;
      if (columns[4] === undefined || columns[4].toString() === "") {
        obj = {
          id: columns[0],
          origin: columns[1],
          kana: columns[2],
          definition: columns[3],
          priority: 0
        };
      } else {
        obj = {
          id: columns[0],
          origin: columns[1],
          kana: columns[2],
          definition: columns[3],
          priority: columns[4]
        };
      }

      console.log(columns[0]);
      console.log("\"" + columns[4] + "\"");

      bulk.insert(obj);
      counter++;

      if (counter % 200000 === 0) {
        stream.pause();
        bulk.execute(function(err, result) {
          if (err)
            throw err;
          bulk = Entry.collection.initializeOrderedBulkOp();

          stream.resume();
        });
      }
    });

    stream.on('end', function() {
      if (counter % 200000 != 0) {
        bulk.execute(function(err, result) {
          if (err)
            throw err;
          console.log("done");
        });
      }
    });
  });
};
