"use strict";
const port = 3000;
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const fs = require('fs');
//to use mongo db
const mongojs = require('mongojs');
//mongo db collections
const db = mongojs('demandes', ['services']);
//custom function in function/functions.js file
const functions = require('./functions/functions.js');
// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Set static path
app.use('/public', express.static(path.join(__dirname, 'public')));

//let pages = ['index'];
var services='';

app.get('/', function (req, res) {
  db.services.find().sort({service_id:-1},function(err, docs){
    if(err)
      throw err;
    services = docs;
    //console.log(services)
    res.render('index',{
      title: 'Index',
      services:services
    });
  });
});

app.post('/insert', function(req, res){
  let _res = res;
  if(req.body.service_name!='' && req.body.service_id!=''){
    var newService = {
      service_name:req.body.service_name,
      service_id:req.body.service_id,
      service_date:new Date().toLocaleString()
    }
    db.services.insert(newService, function(err, response){
      if(err){
        console.log(err);
      }

      var dirYear = String(new Date().getFullYear());// aaaa
      var dirMonth = functions.getMonthString();// mois
      var dirDemande = newService.service_id+' - '+newService.service_name;//00000 - nom_demande
      //creating every folder if folder doesn't exist
      if(!fs.existsSync(dirYear)){
        fs.mkdirSync(dirYear);
        if(!fs.existsSync(dirYear+'/'+dirMonth)){
          fs.mkdirSync(dirYear+'/'+dirMonth);
          if(!fs.existsSync(dirYear+'/'+dirMonth+'/'+dirDemande)){
            fs.mkdirSync(dirYear+'/'+dirMonth+'/'+dirDemande);
          }
        }
      }
      else{
        if(!fs.existsSync(dirYear+'/'+dirMonth)){
          fs.mkdirSync(dirYear+'/'+dirMonth);
          if(!fs.existsSync(dirYear+'/'+dirMonth+'/'+dirDemande)){
            fs.mkdirSync(dirYear+'/'+dirMonth+'/'+dirDemande);
          }
        }
        else{
          if(!fs.existsSync(dirYear+'/'+dirMonth+'/'+dirDemande)){
            fs.mkdirSync(dirYear+'/'+dirMonth+'/'+dirDemande);
          }
        }
      }
      _res.redirect('/');
    });
  }
  else{
    _res.redirect('/create');
  }

});
app.get('/create', function (req, res) {
  res.render('create',{
    title: 'Create'
  });
});
app.get('/test', function (req, res) {
  res.render('test',{
    title: 'Page des tests'
  });
});
app.get('/album', function (req, res) {
  res.render('album',{
    title: 'Create an album'
  });
});
app.get('/map', function (req, res) {
  res.render('map',{
    title: 'Carte mémoire de Montréalais'
  });
});
/*
db.services.find(function(err, docs){
  if(err) throw err;
  let names = [];
  docs.forEach(function(el){
    names.push(el.service_id+' - '+el.service_name);
  });
});
*/
app.listen(port, function () {
  console.log('Example app listening on port '+port+'!')
});
