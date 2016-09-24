'use strict';
app.factory('atividadesService', ['$http', function ($http) {

    var apiServico = 'http://localhost:15748/';
    var atividadesServiceFactory = {};

    var _retornarAtividades = function () {

        return $http.get(apiServico + 'api/atividade').then(function (results) {
            return results;
        });
    };

    var _retornarAtividadePorNome = function (texto) {

        return $http.get(apiServico + 'api/atividade?texto=' + texto).then(function (results) {
            return results;
        });
    };

    var _retornarAtividade = function (id) {

        return $http.get(apiServico + 'api/atividade?id=' + id).then(function (results) {
            return results;
        });
    };

    var _inativarAtividade = function (id) {
        return $http.delete(apiServico + 'api/atividade/' + id).then(function (results) {
            return results;
        });
    };

    var _novaAtividade = function (c) {
        return $http.post(apiServico + 'api/atividade', c, { headers: { 'Content-Type': 'application/json' } });
    };

    var _atualizarAtividade = function (c) {
        return $http.patch(apiServico + 'api/atividade', c, { headers: { 'Content-Type': 'application/json' } });
    };

    atividadesServiceFactory.retornarAtividadePorNome = _retornarAtividadePorNome;
    atividadesServiceFactory.retornarAtividades = _retornarAtividades;
    atividadesServiceFactory.retornarAtividade = _retornarAtividade;
    atividadesServiceFactory.inativarAtividade = _inativarAtividade;
    atividadesServiceFactory.novaAtividade = _novaAtividade;
    atividadesServiceFactory.atualizarAtividade = _atualizarAtividade;

    return atividadesServiceFactory;

}]);