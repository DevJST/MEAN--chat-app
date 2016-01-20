'use strict'

angular.module('ChatApp.login.controllers', []).
    controller('LoginController', ['$scope', '$location', '$http', 'tokenHandlingService', function($scope, $location, $http, tokenHandlingService) {
        $scope.user = {};
        
        $scope.login = function() {
            var userLogin = $scope.user.login;
            if(!userLogin) return;
            
            $http.post('/login', {
                    userLogin: userLogin
                }).success(function(data) {
                    if(data.success) {
                        tokenHandlingService.saveToken(data.token);
                        $location.path('/chatRoom');
                    } else {
                        $scope.loginErrorMessage = data.errMessage;
                    }
                }).error(function() {
                    $scope.loginErrorMessage = 'Wewnętrzny błąd servera podczas próby logowania';
                });
        };
    }]);