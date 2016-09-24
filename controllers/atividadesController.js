'use strict';
app.controller('atividadesController', ['$scope', 'atividadesService', 'projetosService', 'profissionaisService', '$routeParams', '$location', function ($scope, atividadesService, projetosService, profissionaisService, $routeParams, $location) {

    $scope.atividades = [];
    $scope.projetos = [];
    $scope.profissionais = [];

    $scope.pesquisar = "";
    var _modelPadrao = function () {
        $scope.formData = {
            "id": "",
            "nome": "",
            "idProfissional": "",
            "idProjeto": "",
            "ativa": "",
            "dataInicio": "",
            "dataFim": ""
        };
    };
    _modelPadrao();

    var _carregaLista = function ($scope) {
        atividadesService.retornarAtividades().then(function (results) {
            $scope.atividades = results.data;

        }, function (error) {
            bootbox.alert(error.message);
        });
    };
    _carregaLista($scope);

    var _carregaProjetos = function ($scope) {
        projetosService.retornarProjetos().then(function (results) {
            $scope.projetos = results.data;

        }, function (error) {
            bootbox.alert(error.message);
        });
    };
    _carregaProjetos($scope);

    var _carregaProfissionais = function ($scope) {
        profissionaisService.retornarProfissionais().then(function (results) {
            $scope.profissionais = results.data;

        }, function (error) {
            bootbox.alert(error.message);
        });
    };
    _carregaProfissionais($scope);

    var _retornaAtividade = function () {

        var id = $routeParams.id;

        atividadesService.retornarAtividade(id).then(function (results) {
            $scope.formData = results.data;

        }, function (error) {
            bootbox.alert(error.message);
        });
    };


    var _inativar = function (id) {
        bootbox.confirm("Tem certeza que quer inativar esta atividade?", function (r) {
            if (r)
                atividadesService.inativarAtividade(id).then(function () {
                    _carregaLista($scope);
                });
        });
    };

    var _ativar = function (ati) {
        ati.ativa = true;
        var $req;

        formData.profissional = null
        formData.projeto = null
        $req = atividadesService.atualizarAtividade(ati);

        $req.success(function () {
            bootbox.alert("Atividade ativada com sucesso!");
            _carregaLista($scope);
        })
       .error(function (error) {
           bootbox.alert(error.message);
       });
    }

    var _atualizar = function () {
        $scope.formData.id = c.idCategoria;
        $scope.formData.nome = c.nomeCategoria;
    };

    var _salvarDados = function () {
        var formData = $scope.formData;

        if (formData.nome === "" || formData.idProjeto === "" || formData.dataFim === "" || formData.dataInicio === "") {
            bootbox.alert("Os campos de nome, projeto, data início e data fim são obrigatórios.");
            return;
        }

        var formBkp = formData;
        formData.idProfissional = formData.profissional.id;

        var $req;
        if (formData.id) { //ALTERAÇÃO
            ati.profissional = null
            ati.projeto = null
            $req = atividadesService.atualizarAtividade(formData);
        } else { //NOVO
            formData.idProjeto = formData.idProjeto.id;
            formData.dataInicio = formData.dataInicio.toJSON();
            formData.dataFim = formData.dataFim.toJSON();
            $req = atividadesService.novaAtividade(formData);
        }
        $req.success(function () {
            bootbox.alert("Atividade salva com sucesso!");
            $location.path("/atividades");
            _modelPadrao();
            _carregaLista($scope);
        })
            .error(function (error) {
                formData = formBkp;
                bootbox.alert(error.message);
            });
    };

    var _retornarAtividadePorNome = function () {
        var id = $routeParams.id;

        atividadesService.retornarAtividadePorNome($scope.pesquisar).then(function (results) {
            $scope.atividades = results.data;

        }, function (error) {
            bootbox.alert(error.data.message);
        });
    }

    var _novo = function () {
        _modelPadrao();
    };

    $scope.retornarAtividadePorNome = _retornarAtividadePorNome;
    $scope.retornarAtividade = _retornaAtividade;
    $scope.inativar = _inativar;
    $scope.atualizar = _atualizar;
    $scope.ativar = _ativar;
    $scope.salvarDados = _salvarDados;
    $scope.novo = _novo;
}]);