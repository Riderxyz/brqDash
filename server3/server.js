/*jshint esversion: 6 */

var util = require('./public/utils/util');
var config = require('./public/utils/config');
var jwt = require('jsonwebtoken');


// var queueRouter = require('./routers/queue.router');

var url_servico = config.config.URLS.dev;

util.inicializarConfiguracao()
util.inicializarPool();

const restify = require('restify'),
  work = require('./Controller/workitem.controller'),
  port = process.env.PORT || 9700;

var server = restify.createServer({
  name: 'BRQ Dash'
});

var url = require('url');

server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  return next();
});

server.use(restify.plugins.bodyParser());

// queueRouter.applyRoutes(server, '/queue/');

const corsMiddleware = require('restify-cors-middleware')

const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['http://api.myapp.com', 'http://web.myapp.com'],
  allowHeaders: ['API-Token'],
  exposeHeaders: ['API-Token-Expiry']
});



server.pre(cors.preflight);
server.use(cors.actual);

server.get(config.config.ENDPOINTS.getWorkItem, work.getItens);
server.get('/flavio', work.flavio);

server.listen(port, function () {
  util.inicializarConfiguracao();

  console.log('running on port ' + port);
  console.log('started at: ' + (new Date()).getHours() + ':' + (new Date()).getMinutes() + ':' + (new Date()).getSeconds());

});



