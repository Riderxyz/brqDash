/*jshint esversion: 6 */
function workItemController() {
    var fs = require('fs');
    var sql = require('mssql-plus');
    var callerId = require('caller-id');
    var config = require('../public/utils/config');
    var jwt = require('jsonwebtoken');

    var vm = this;

    vm.pool = new sql.ConnectionPool(config.config.MSCONFIG);

    vm.getItens = function () {
        //      const pool = new sql.ConnectionPool(config.config.MSCONFIG)
        console.log(vm.pool);
        vm.pool.connect().then(SimplePool => {
            return SimplePool.query`EXEC dbo.[usp_DashGetWorkItem]	@status = 'em estimativa' `;
        }).then(result => {
            console.dir(result);
        }).catch(err => {
            console.log(err);
        });
    }

}

module.exports = new workItemController();