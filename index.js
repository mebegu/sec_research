const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Grid = require('gridfs-stream');

const router = require('./router');
const config = require('./config.json');


mongoose.Promise = global.Promise;
//Grid.mongo = mongoose.mongo;
const conn = mongoose.connect(config.db);
global.db = mongoose.connection.db;
var gfs;
mongoose.connection.once('open', function () {
  Grid.mongo = mongoose.mongo;
  global.gfs = Grid(mongoose.connection.db);
  console.log('DB connection established! here');

  // all set!
})

app.use(bodyParser.json());
app.use(cors());
router(app);


app.listen(config.port);
