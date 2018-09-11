'use strict';
var mysql = require('mysql');
var util = require('util');

var Connection = {

  //get: mysql.createConnection({
  //    host: 'localhost',
  //    port: '3306',
  //    user: 'ondemand',
  //    password: 'ondemand1234',
  //    database: 'dashboarddesenvolvimento'
  //})    
  getPool: mysql.createPool({
    host: util.config.database.host, // 'cloud.ondemandprint.com.br',
    connectionLimit: 30, //util.config.connectionLimit,  //20,
    port: util.config.porta,  //'3306',
    user: util.config.user,  //'ondemand',
    password: util.config.password,  //'ondemand1234',
    database: util.config.database,  //'dashboard'
  })
}
module.exports = Connection