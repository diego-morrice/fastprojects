'use strict';
app.factory('profissionaisService', ['$http', function ($http) {

    var apiServico = 'http://localhost:15748/';
    var profissionalServiceFactory = {};

    var _retornarProfissionalPorNome = function(texto)
    {
        return $http.get(apiServico + 'api/profissional?texto=' + texto).then(function (results) {
            return results;
        });
    }

    var _retornarProfissionais = function () {

        return $http.get(apiServico + 'api/profissional').then(function (results) {
            return results;
        });
    };

    var _retornarProfissional = function (id) {

        return $http.get(apiServico + 'api/profissional?id='+ id).then(function (results) {
            return results;
        });
    };

    var _inativarProfissional = function (id) {
        return $http.delete(apiServico + 'api/profissional/' + id).then(function (results) {
            return results;
        });
    };

    var _novoProfissional = function (c) {
        return $http.post(apiServico + 'api/profissional', c, { headers: { 'Content-Type': 'application/json' } });
    };

    var _atualizarProfissional = function (c) {
        return $http.patch(apiServico + 'api/profissional', c, { headers: { 'Content-Type': 'application/json' } });
    };

    profissionalServiceFactory.retornarProfissionalPorNome = _retornarProfissionalPorNome;
    profissionalServiceFactory.retornarProfissional = _retornarProfissional;
    profissionalServiceFactory.retornarProfissionais = _retornarProfissionais;
    profissionalServiceFactory.inativarProfissional = _inativarProfissional;
    profissionalServiceFactory.novoProfissional = _novoProfissional;
    profissionalServiceFactory.atualizarProfissional = _atualizarProfissional;

    return profissionalServiceFactory;

}]);