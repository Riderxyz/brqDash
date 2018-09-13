/*jshint esversion: 6 */
function workItemController() {
    var fs = require('fs');
    var sql = require('mssql-plus');
    var callerId = require('caller-id');
    var config = require('../public/utils/config');
    var jwt = require('jsonwebtoken');

    var vm = this;

    vm.pool = new sql.ConnectionPool(config.config.MSCONFIG);

    vm.getItens = function (req, res, next) {
        //      const pool = new sql.ConnectionPool(config.config.MSCONFIG)
        console.log('req ', req.params);
        vm.pool.connect().then(SimplePool => {
            return SimplePool.query("EXEC dbo.[usp_DashGetWorkItem]	@status = '"+req.params.tipo +"'");
        }).then(result => {
            vm.pool.close();
            res.send(200, result.recordsets[0])
        }).catch(err => {
            console.log(err);
        });
        return next();
    };

}

module.exports = new workItemController();