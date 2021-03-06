function configController() {
  var vm = this;

  vm.config = {
    versao: {
      "value": "Versão 1.1 - Desenv",
      "descricao": "Versao atual da aplicação"
    },
    URLS: {
      dev: 'http://localhost:9700/',
      local: 'http://localhost:9700/'
    },
    ENDPOINTS: {
      getWorkItem: '/getWorkItem'
    },
    MSCONFIG: {
      user: 'mobileteam',
      password: 'mobileteam',
      server: '10.2.0.159\\SRV17524_SQL2016',
      database: 'TFS_Integradora',
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
      }
    }
  };


}

module.exports = new configController();