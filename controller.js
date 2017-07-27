const csv=require('csvtojson');
const fs = require('fs');
const utility = require('./tools/utility.js');
const respondQuery = utility.respondQuery;
const trial = require('./models/trial');
const whitelist = require('./models/whitelist');
const difflist = require('./models/difflist');

exports.upload = function(req,res){
    console.log("Experiment loggig started")
    const path          = req.file.path;
    const experiment    = new trial();
    experiment.no       = req.body.no;
    experiment.detail   = req.body.detail;
    experiment.clean   = req.body.clean;
    const total = req.body.total;
    const ip = req.body.localIP;
    let   counter = 0;
    console.log(experiment+"\n"+total+"Packets Exists");

    csv({delimiter: ","})
    .fromFile(path)
    .on('json',(packet)=>{
        console.log(packet)
        if(experiment.clean){
            whitelist.addPacket(packet, ip, experiment.no )
        }else{
            difflist.addPacket(packet, ip, experiment.no )
        }
        experiment.packets.push(packet)
        counter++
        console.log("Packet Added ("+counter+"/"+total+")")

    }).on('done',(err)=>{
        experiment.save();
        fs.unlink(path);
        return respondQuery(res, err, counter+" Packets Proceeded", 'New Experiment', 'Logged');
    })
}

