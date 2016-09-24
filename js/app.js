var app = angular.module('MidiaSocialApp', [
    'ngRoute',
    'ngStorage',
    'angular-loading-bar',
    'gdi2290.md5-service',
    'ui.utils.masks'
]);

app.config(function ($routeProvider) {
       
    $routeProvider.when("/", {
        controller: "homeController",
        templateUrl: "/views/home.html"
    });

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "/views/home.html"
    });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "/views/login.html"
    });

    $routeProvider.when("/atividades", {
        controller: "atividadesController",
        templateUrl: "/views/atividades.html"
    });

    $routeProvider.when("/novaAtividade", {
        controller: "atividadesController",
        templateUrl: "/views/novaAtividade.html"
    });


    $routeProvider.when("/atualizarAtividade/:id", {
        controller: "atividadesController",
        templateUrl: "/views/atualizarAtividade.html",
        id: ""
    });

    $routeProvider.when("/inativarAtividade/:id", {
        controller: "atividadesController",
        templateUrl: "/views/inativarAtividade.html",
        id: ""
    });


    $routeProvider.when("/profissionais", {
        controller: "profissionaisController",
        templateUrl: "/views/profissionais.html"
    });

    $routeProvider.when("/novoProfissional", {
        controller: "profissionaisController",
        templateUrl: "/views/novoProfissional.html"
    });

    $routeProvider.when("/atualizarProfissional/:id", {
        controller: "profissionaisController",
        templateUrl: "/views/atualizarProfissional.html",
        id: ""
    });

    $routeProvider.when("/inativarProfissional/:id", {
        controller: "profissionaisController",
        templateUrl: "/views/inativarProfissional.html",
        id: ""
    });

    $routeProvider.when("/projetos", {
        controller: "projetosController",
        templateUrl: "/views/projetos.html"
    });

    $routeProvider.when("/novoProjeto", {
        controller: "projetosController",
        templateUrl: "/views/novoProjeto.html"
    });

    $routeProvider.when("/atualizarProjeto/:id", {
        controller: "projetosController",
        templateUrl: "/views/atualizarProjeto.html"        
    });

    $routeProvider.when("/inativarProjeto/:id", {
        controller: "projetosController",
        templateUrl: "/views/inativarProjeto.html"
        
    });

    $routeProvider.otherwise({ redirectTo: "/home" });    
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.run(['autorizacaoServico', function (autorizacaoServico) {
    autorizacaoServico.popularDadosAutorizacao();
}]);