function utilController() {
  var fs = require('fs');
  var mysql = require('mysql');
  var callerId = require('caller-id');
  var jwt = require('jsonwebtoken');

  var vm = this;

  var pool;

  vm.config = {};
  //constant('ERRO_NOTFOUND', [501,'Registro não encontrado ']);
  var readDir = require('readdir');
  vm.superSecret = 'ondemandPrintJustForTestNotFotfulluseifyouusemakeitforyourownrisk';
  vm.producao = false;

  const chalk = require('chalk');
  const logObj = console.log;

  // Combine styled and normal strings

  vm.Log = function (_msg, tipo) {
    var msg = ' ' + _msg;
    var datetime = new Date().toLocaleString();
    if (tipo != null)
      try {
        tipo = tipo.toLowerCase()
      } catch (error) {
        // console.log('tipo inválido em log', tipo)
        tipo = 'padrao'
      }
    else
      tipo = 'padrao';

    if (msg == null)
      msg = 'Mensagem ausente'

    switch (tipo) {
      case 'error':
        logObj(chalk.red.bgBlack.bold('[' + datetime + ']' + '  -  ' + msg.toUpperCase()));
        break;
      case 'warning':
        logObj(chalk.yellow.bgBlack.bold('[' + datetime + ']' + '  -  ' + msg));
        break;
      case 'aviso':
        logObj(chalk.yellow.bgBlack.bold('[' + datetime + ']' + '  -  ' + msg));
        break;
      default:
        logObj(chalk.white('[' + datetime + ']' + '  -  ' + msg));
    }
  }

  vm.inicializarPool = function () {
    fs.readFile('./environment/config.json', 'utf8', function (err, data) {
      if (err) {
        vm.Log('*****  ERRO AO LER O ARQUIVO DE CONFIGURAÇÃO *****', 'error')
        vm.Log(err, 'error')
        throw err;
      }
      vm.config = JSON.parse(data);
      vm.pool = mysql.createPool({
        host: vm.config.database.host, // 'cloud.ondemandprint.com.br',
        connectionLimit: vm.config.database.connectionLimit, //20,
        port: vm.config.database.porta, //'3306',
        user: vm.config.database.user, //'ondemand',
        password: vm.config.database.password, //'ondemand1234',
        database: vm.config.database.database, //'dashboard'
      })
    });
  }

  vm.inicializarConfiguracao = function () {
    fs.readFile('./environment/config.json', 'utf8', function (err, data) {
      if (err) {
        // console.log('*****  ERRO AO LER O ARQUIVO DE CONFIGURAÇÃO *****')
        // console.log('DESCRIÇÃO DO ERRO ', err)
        throw err;
      }
      vm.config = JSON.parse(data);
      vm.Log('encerrou a config')
    });
  }

  vm.GetToken = function (objectToToken) { //req, res, next) {
    var token = jwt.sign(JSON.parse(objectToToken), vm.superSecret, {
      expiresIn: 500 // expires in 24 hours
    });
    return token;
  }

  vm.ensureToken = function (req, res, next) {
    // var token = req.headers['authorization'] || req.query.token || req.body.token;
    // if (token) {
    // 	jwt.verify(token, superSecret, function (err, decoded) {
    // 		if (err) {
    // 			return res.json({ success: false, message: 'Failed to authenticate token.' });
    // 		} else {
    // 			req.decoded = decoded;
    // 			// console.log('decoded', decoded)
    // 			next();
    // 		}
    // 		});
    // } else {
    // 	return res.send(403);
    // }
    next();
    // // return next()
  };

  vm.videourl = function () {
    return "http://139.82.111.85:9500/study/getVideo/videopath"
  }

  vm.ftpLocalPath = function () {
    return "/teste"
  }

  vm.imageurl = function () {
    return vm.config.imageServerUrl.value; // "http://139.82.25.111:9550"
  }

  vm.fileserverurl = function () {
    return vm.config.endpointFileServer.value;
    // if (vm.producao)
    //     return "http://139.82.111.24:9100"
    // else
    //     return "http://localhost:9100";
  }

  // an array of all JavaScript files in some_path/
  listdir = function (directory, extensao) {
    if (extensao == null) {
      extensao = "**.jpg"
    }
    readDir.readSync(directory, [extensao]),
      function (err, filesArray) {
        // console.log(filesArray)
      }
  }

}

module.exports = new utilController();