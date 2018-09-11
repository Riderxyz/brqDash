function configController() {
  var vm = this;

  vm.config = {
    versao: {
      "value": "Versão 1.1 - Desenv",
      "descricao": "Versao atual da aplicação"
    },

  };
}

module.exports = new configController();