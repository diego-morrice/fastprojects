'use strict';
app.controller('homeController', ['$scope', 'atividadesService', function ($scope, atividadesService) {

    $scope.atividades = [];

    var _carregaLista = function ($scope) {
        atividadesService.retornarAtividades().then(function (results) {
            $scope.atividades = results.data;

        }, function (error) {
            bootbox.alert(error.data.message);
        });
    };
    _carregaLista($scope);

}]);