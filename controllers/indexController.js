'use strict';
app.controller('indexController', ['$scope', '$location', 'autorizacaoServico', function ($scope, $location, autorizacaoServico) {

    $scope.sair = function () {
        autorizacaoServico.sair();
        $location.path('/home');
    }

    $scope.autenticacao = autorizacaoServico.autenticacao;

}]);