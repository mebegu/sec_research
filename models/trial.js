const mongoose = require('mongoose'),
      Schema = mongoose.Schema;
const whitelist = require('./whitelist');

const packet = new Schema({
  no:           Number,
  time:         Number,
  source:       String,
  destination:  String,
  protocol:     String,
  length:       Number,
  info:         String
})
const trial = new Schema({
  no:         {type: Number},
  detail:     {type: String},
  date:       {type: Date, default: Date.now},
  clean:      {type: Boolean},
  packets:    [packet]
});

module.exports = mongoose.model('Trial', trial);