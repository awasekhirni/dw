var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var loopback = require('loopback');

var outputPath = path.resolve(__dirname, '../common/models');
var ds = loopback.createDataSource('postgresql', {
  "host": "localhost",
  "port": 5432,
  "database": "onlinepos",
  "user": "postgres",
  "password": "postgres"
});

ds.discoverModelDefinitions({ schema: 'public'}, function (err, models) {
  console.log(models);
  models.forEach(function (def) {
    console.log(def.name);
    ds.discoverAndBuildModels(def.name,{schema:'public',relations: true}, function(err, models){
      if (err) console.log('Err: ' + err);
      if (models) {
        Object.keys(models).forEach(function (key) {
          console.log('working on', key);
        });
      }
    });

  });
});

