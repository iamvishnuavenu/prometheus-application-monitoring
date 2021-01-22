var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var itemRouter = require('./routers/item');

var prometheus = require('./util/prometheus'); 
var app = express();

var PORT = 8080;
var HOST_NAME = 'mongodb';
var DATABASE_NAME = 'shoppingList';

mongoose.connect('mongodb://' + HOST_NAME + '/' + DATABASE_NAME);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(prometheus.requestCounters);  
app.use(prometheus.responseCounters);

/**
 * Enable metrics endpoint
 */
prometheus.injectMetricsRoute(app);

/**
 * Enable collection of default metrics
 */
prometheus.startCollection()


app.use('/api', itemRouter);
app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
  
});
