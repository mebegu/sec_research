const mongoose = require('mongoose'),
      Schema = mongoose.Schema;
const whitelist = require('./whitelist');

const difflist = new Schema({
  source:       String,
  protocol:     String,
  destination:  String,
  trial: String
});

difflist.index({source:1, protocol:1, destination:1}, {unique:true});


difflist.statics.addPacket = function(packet, ip, trial) {
 let object = {
    source:       packet.source,
    protocol:     packet.protocol,
    destination:  packet.destination
  };
  if(object.source === ip){
    object.source = "local"
  }else if(object.destination === ip){
    object.destination = "local"
  }
  let model = this;
  whitelist.findOne(object).exec()
  .then(function(doc){
    if(!doc){
      object.trial = trial;
      object = new model(object);
      object.save()
    }
  });
};

module.exports = mongoose.model('Difflist', difflist);