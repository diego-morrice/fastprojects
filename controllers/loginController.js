'use strict';
app.controller('loginController', ['$scope', '$location', 'autorizacaoServico', function ($scope, $location, autorizacaoServico) {

    $scope.dadosLogin = {
        usuario: "wkm",
        senha: "wkm123"
    };

    $scope.mensagem = "";

    $scope.entrar = function () {

        autorizacaoServico.entrar($scope.dadosLogin).then(function (response) {
            $location.path('/atividades');
        },
         function (err) {
             $scope.mensagem = "Ocorreu algum erro ao autenticar.";
         });
    };

}]);