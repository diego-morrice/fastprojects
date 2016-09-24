'use strict';
app.controller('profissionaisController', ['$scope', 'profissionaisService', '$routeParams', '$location', function ($scope, profissionaisService, $routeParams, $location) {

    $scope.profissionais = [];
    $scope.pesquisar = "";

    var _modelPadrao = function () {
        $scope.formData = {
            id: "",
            nome: "",
            usuario: { nome: "", email: "", senha: "", confirmarSenha: "", dataCriacao: "" },
            dataCriacao: ""
        };
    };

    _modelPadrao();

    var _carregaLista = function ($scope) {
        profissionaisService.retornarProfissionais().then(function (results) {
            $scope.profissionais = results.data;

        }, function (error) {
            bootbox.alert(error.message);
        });
    };
    _carregaLista($scope);

    var _inativar = function (id) {
        bootbox.confirm("Tem certeza que quer inativar este profisisional?", function (r) {
            if (r)
                profissionaisService.inativarProfissional(id).then(function () {
                    _carregaLista($scope);
                });
        });
    };

    var _retornarProfissional = function () {

        var id = $routeParams.id;

        profissionaisService.retornarProfissional(id).then(function (results) {
            $scope.formData = results.data;

        }, function (error) {
            bootbox.alert(error.message);
        });
    };

    var _retornarProfissionais = function () {

        profissionaisService.retornarProfissionais().then(function (results) {
            $scope.formData = results.data;

        }, function (error) {
            bootbox.alert(error.message);
        });
    };

    var _retornarProfissionalPorNome = function () {

        profissionaisService.retornarProfissionalPorNome($scope.pesquisar).then(function (results) {
            $scope.profissionais = results.data;

        }, function (error) {
            bootbox.alert(error.data.message);
        });
    };


    var _salvarDados = function () {

        var formData = $scope.formData;

        if ($scope.formData.nome === "" || $scope.formData.usuario.senha === "" || $scope.formData.usuario.email === "",
            $scope.formData.usuario.confirmarSenha === "") {
            $scope.savedSuccessfully = false;
            bootbox.alert("Preencha todos os campos!");
            return;
        }

        if ($scope.formData.usuario.senha != $scope.formData.usuario.confirmarSenha) {
            $scope.savedSuccessfully = false;
            bootbox.alert("A senha e a confirmação de senha não conferem.");
            return;
        }

        $scope.formData.usuario.nome = $scope.formData.nome;

        var $req;
        if (formData.id) { //ALTERAÇÃOpro.atividades = null;

            formData.usuario = null;
            formData.empresa = null;
            formData.atividades = null;
            $req = profissionaisService.atualizarProfissional(formData);
        } else { //NOVO
            $req = profissionaisService.novoProfissional(formData);
        }
        $req.success(function () {
            bootbox.alert("Profissional salvo com sucesso!");
            $location.path("/profissionais");            
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
        pro.empresa = null;
        var $req;
        
        $req = profissionaisService.atualizarProfissional(pro);

        $req.success(function () {
            bootbox.alert("Profissional ativado com sucesso!");
            _carregaLista($scope);
        })
        .error(function (error) {
            bootbox.alert(error.message);
        });
    }

    var _novo = function () {
        _modelPadrao();
    };

    $scope.retornarProfissisonal = _retornarProfissional;
    $scope.retornarProfisisonalPorNome = _retornarProfissionalPorNome;
    $scope.inativar = _inativar;
    $scope.ativar = _ativar;
    $scope.retornarProfissionais = _retornarProfissionais;
    $scope.salvarDados = _salvarDados;
    $scope.novo = _novo;

}]);