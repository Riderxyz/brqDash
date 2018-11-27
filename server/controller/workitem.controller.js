/*jshint esversion: 6 */
function workItemController() {
    var fs = require('fs');
    var sql = require('mssql-plus');
    var callerId = require('caller-id');
    var config = require('../public/utils/config');
    var jwt = require('jsonwebtoken');

    var admin = require("firebase-admin");

    var serviceAccount = require("./../environment/brq-sla-firebase-adminsdk-qkham-e131ae30f1.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://brq-sla.firebaseio.com"
    });

    var brqDb = admin.database();
    var ref = brqDb.ref('brq-sla');

    var vm = this;

    vm.pool = new sql.ConnectionPool(config.config.MSCONFIG);

    vm.getItens = function (req, res, next) {
        vm.pool.connect().then(SimplePool => {
            return SimplePool.query("EXEC dbo.[usp_DashGetWorkItemTeste]");
        }).then(result => {
            vm.pool.close();
            var ons_db = ref.child("ONS");
            ons_db.set(result.recordsets[0]);
            res.send(200, result.recordsets[0]);
        }).catch(err => {
            console.log(err);
        });
        return next();
    };

    vm.updateRealTime = function () {
        vm.pool.connect().then(SimplePool => {
            return SimplePool.query("EXEC dbo.[usp_DashGetWorkItemTeste]");
        }).then(result => {
            vm.pool.close();
            var ons_db = ref.child("ONS");
            ons_db.set(result.recordsets[0]);
        }).catch(err => {
            console.log(err);
        });
    };
}

module.exports = new workItemController();