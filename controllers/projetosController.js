'use strict';
app.controller('projetosController', ['$scope', 'projetosService', '$routeParams', '$location', function ($scope, projetosService, $routeParams, $location) {

    $scope.projetos = [];

    $scope.pesquisar = "";
    var _modelPadrao = function () {
        $scope.formData = {
            "id": "",
            "nome": "",
            "ativo": "",
            "dataCriacao": ""
        };
    };
    _modelPadrao();

    var _carregaLista = function ($scope) {
        projetosService.retornarProjetos().then(function (results) {
            $scope.projetos = results.data;

        }, function (error) {
            bootbox.alert(error.message);
        });
    };
    _carregaLista($scope);

    var _inativar = function (id) {
        bootbox.confirm("Tem certeza que quer inativar este projeto?", function (r) {
            if (r)
                projetosService.inativarProjeto(id).then(function () {
                    _carregaLista($scope);
                });
        });
    };

    var _retornaProjeto = function () {

        var id = $routeParams.id;

        projetosService.retornarProjeto(id).then(function (results) {
            $scope.formData = results.data;

        }, function (error) {
            bootbox.alert(error.message);
        });
    };

    var _retornarProjetoPorNome = function () {

        projetosService.retornarProjetoPorNome($scope.pesquisar).then(function (results) {
            $scope.projetos = results.data;

        }, function (error) {
            bootbox.alert(error.message);
        });
    };

    var _salvarDados = function () {
        var formData = $scope.formData;
        formData.atividades = null;
        formData.usuario = null;

        if (formData.nome === "") {
            bootbox.alert("Informe o nome do projeto.");
            return;
        }

        var $req;
        if (formData.id) { //ALTERAÇÃO
            $req = projetosService.atualizarProjeto(formData);
        } else { //NOVO
            $req = projetosService.novaProjeto(formData);
        }
        $req.success(function () {
            bootbox.alert("Projeto salvo com sucesso!");
            $location.path("/projetos");
            _modelPadrao();
            _carregaLista($scope);
        })
        .error(function (error) {
            bootbox.alert(error.message);
        });
    };

    var _ativar = function (pro) {
        pro.ativo = true;
        pro.atividades = null;
        pro.usuario = null;
        var $req;

        $req = projetosService.atualizarProjeto(pro);

        $req.success(function () {
            bootbox.alert("Projeto ativado com sucesso!");
            _carregaLista($scope);
        })
        .error(function (error) {
            bootbox.alert(error.message);
        });
    }

    var _novo = function () {
        _modelPadrao();
    };

    $scope.retornarProjetoPorNome = _retornarProjetoPorNome;
    $scope.inativar = _inativar;
    $scope.ativar = _ativar;
    $scope.retornarProjeto = _retornaProjeto;
    $scope.salvarDados = _salvarDados;
    $scope.novo = _novo;
}]);