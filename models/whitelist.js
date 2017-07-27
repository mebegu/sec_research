const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const whitelist = new Schema({
  source:       String,
  protocol:     String,
  destination:  String,
  trial: String
});

whitelist.index({source:1, protocol:1, destination:1}, {unique:true});

whitelist.statics.addPacket = function(packet, ip, trial) {
  let object = {
    source:       packet.source,
    protocol:     packet.protocol,
    destination:  packet.destination,
    trial: trial
  };
  if(object.source === ip){
    object.source = "local"
  }else if(object.destination === ip){
    object.destination = "local"
  }
  object = new this(object);
  object.save();
};

module.exports = mongoose.model('Whitelist', whitelist);