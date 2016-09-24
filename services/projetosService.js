'use strict';
app.factory('projetosService', ['$http', function ($http) {

    var apiServico = 'http://localhost:15748/';
    var projetoServiceFactory = {};

    var _retornarProjetoPorNome = function(texto)
    {
        return $http.get(apiServico + 'api/projeto?texto=' + texto).then(function (results) {
            return results;
        });
    }

    var _retornarProjetos = function () {

        return $http.get(apiServico + 'api/projeto').then(function (results) {
            return results;
        });
    };

    var _retornarProjeto = function (id) {
        return $http.get(apiServico + 'api/projeto?id=' + id ).then(function (results) {
            return results;
        });
    };

    var _inativarProjeto = function (id) {
        return $http.delete(apiServico + 'api/projeto/' + id).then(function (results) {
            return results;
        });
    };

    var _novaProjeto = function (c) {
        return $http.post(apiServico + 'api/projeto', c, { headers: { 'Content-Type': 'application/json' } });
    };

    var _atualizarProjeto = function (c) {
        return $http.patch(apiServico + 'api/projeto', c, { headers: { 'Content-Type': 'application/json' } });
    };

    projetoServiceFactory.retornarProjetoPorNome = _retornarProjetoPorNome;
    projetoServiceFactory.retornarProjeto = _retornarProjeto;
    projetoServiceFactory.retornarProjetos = _retornarProjetos;
    projetoServiceFactory.inativarProjeto = _inativarProjeto;
    projetoServiceFactory.novaProjeto = _novaProjeto;
    projetoServiceFactory.atualizarProjeto = _atualizarProjeto;

    return projetoServiceFactory;

}]);