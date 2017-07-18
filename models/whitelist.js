const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const whitelist = new Schema({
  source:       String,
  protocol:     String,
  destination:  String
});

whitelist.index({source:1, protocol:1, destination:1}, {unique:true});

whitelist.statics.addPacket = function(packet) {
  let object = {
    source:       packet.source,
    protocol:     packet.protocol,
    destination:  packet.destination
  };
  object = new this(object);
  object.save();
};

module.exports = mongoose.model('Whitelist', whitelist);