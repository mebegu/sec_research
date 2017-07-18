const express = require('express');
const multer  = require('multer');
const controller = require('./controller');
const trialModel = require('./models/trial');
const whitelistModel = require('./models/whitelist');
const query = require('./tools/query');

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, __dirname+'/upload/');
  },
  filename: function(req, file, cb){

    cb(null, file.originalname);
  }

});
var upload = multer({
  storage: storage
});

const trial = function(req,res,next){
    console.log('Trial request received');
    req.args = {model: trialModel,
            getSelect: {},
            listSelect:{},
            logType: "Trial"
    }
    next();
}

const whitelist = function(req,res,next){
    console.log('Whitelist request received');
    req.args = {model: whitelistModel,
            getSelect: {},
            listSelect:{},
            logType: "Whitelist"
    }
    next();
}

module.exports = function(app) {
  const routes = express.Router();
  routes.post('/upload',  upload.single("file"), controller.upload);
  routes.get('/trial/:id',      trial,  query.get);
  routes.get('/trial/',         trial,  query.list);
  routes.get('/whitelist/:id',  whitelist,  query.get);
  routes.get('/whitelist/',     whitelist,  query.list);
  app.use('/',   routes);
}

