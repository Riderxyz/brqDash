function configController() {
  var vm = this;

  vm.config = {
    "versao": {
      "value": "Versão 1.1 - Desenv",
      "descricao": "Versao atual da aplicação"
    },
    "database": {
      "host": "139.82.111.85",
      "porta": "3308",
      "connectionLimit": "100",
      "user": "ondemand",
      "password": "ondemand1234",
      "database": "ondemanddb"
    },
    "databaselocal": {
      "host": "localhost",
      "porta": "3306",
      "connectionLimit": "100",
      "user": "root",
      "password": "",
      "database": "ondemanddb"
    },
    "ftp": {
      "ftpAcessHomologacao_url": "10.0.0.3",
      "ftpAcessHomologacao_user": "ondemandftp",
      "ftpAcessHomologacao_senha": "!!0n$$D@@!!"
    },
    "constanteImage": {
      "value": "'1//'",
      "descricao": "Marcação fixa das imagens da clinica"
    },
    "imageServerUrl": {
      "value": "http://139.82.111.85:9550//",
      "descricao": "Endereço do ImageServer"
    },
    "imageServerUrlLocal": {
      "value": "http://localhost:8080//assets//",
      "descricao": "Endereço do ImageServer"
    },
    "endpointRest": {
      "value": "http://139.82.111.85:5000/on_demand_adm/api/v1.0/",
      "descricao": "Endereço da rest ADM"
    },
    "endpointFileServer": {
      "value": "http://139.82.111.24:9100",
      "descricao": "File Server - emula o FTP entre outras funções"
    },
    "endpointApp2": {
      "value": "http://139.82.111.85:9500/",
      "descricao": "Serviços reacionados ao aplicativo mobile"
    },
    "endpointServicoClinicas": {
      "value": "http://139.82.111.85:9600/",
      "descricao": "Serviço das Clinicas"
    }
  };
}

module.exports = new configController();