'use strict';
app.factory('autorizacaoServico', ['$http', '$q', 'storageService', 'md5', function ($http, $q, storageService, $md5) {

    var apiServico = 'http://localhost:15748/';
    var autorizacaoFactory = {};

    var _autenticacao = {
        autenticado: false,
        nome: "",
        id: ""
    };

    var _salvarRegistro = function (registro) {

        _sair();
        registro.Senha = $md5.createHash(registro.Senha);

        return $http.post(apiServico + 'api/account/register', registro).then(function (response) {
            return response;
        });

    };

    var _entrar = function (dadosLogin) {

        //var dadosRequisicao = "grant_type=password&username=" + dadosLogin.nome + "&password=" + $md5.createHash(dadosLogin.password);
        var dadosRequisicao = "grant_type=password&username=" + dadosLogin.usuario + "&password=" + dadosLogin.senha;

        var deferred = $q.defer();

        $http.post(apiServico + 'api/security/token', dadosRequisicao, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            storageService.set('authorizationData', { token: response.access_token, usuario: dadosLogin.nome });

            _autenticacao.autenticado = true;
            _autenticacao.nome = dadosLogin.nome;            

            deferred.resolve(response);

        }).error(function (err, status) {
            _sair();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _sair = function () {

        storageService.delete('authorizationData');

        _autenticacao.autenticado = false;
        _autenticacao.nome = "";

    };

    var _popularDadosAutorizacao = function () {

        var dadosAutorizacao = storageService.get('authorizationData');
        if (dadosAutorizacao) {
            _autenticacao.autenticado = true;
            _autenticacao.nome = dadosAutorizacao.usuario;
        }

    }

    autorizacaoFactory.salvarRegistro = _salvarRegistro;
    autorizacaoFactory.entrar = _entrar;
    autorizacaoFactory.sair = _sair;
    autorizacaoFactory.popularDadosAutorizacao = _popularDadosAutorizacao;
    autorizacaoFactory.autenticacao = _autenticacao;

    return autorizacaoFactory;
}]);