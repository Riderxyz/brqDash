var util = require('./public/utils/util');
var jwt = require('jsonwebtoken');

// var queueRouter = require('./routers/queue.router');

util.inicializarConfiguracao()
util.inicializarPool();

const restify = require('restify'),
  port = process.env.PORT || 9000;

var server = restify.createServer({
  name: 'OnDemand server'
});

var url = require('url');

server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*")
  res.header("Access-Control-Allow-Headers", "*");
  return next();
})
server.use(restify.plugins.bodyParser());

// queueRouter.applyRoutes(server, '/queue/');

const corsMiddleware = require('restify-cors-middleware')

const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['http://api.myapp.com', 'http://web.myapp.com'],
  allowHeaders: ['API-Token'],
  exposeHeaders: ['API-Token-Expiry']
})

server.pre(cors.preflight)
server.use(cors.actual)

server.listen(port, function () {
  util.inicializarConfiguracao();
  // console.log('running on port ' + port);
  // console.log('started at: ' + (new Date()).getHours() + ':' + (new Date()).getMinutes() + ':' + (new Date()).getSeconds());

});



