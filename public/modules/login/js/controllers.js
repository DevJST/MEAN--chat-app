'use strict'

angular.module('ChatApp.login.controllers', []).
    controller('LoginController', ['$scope', '$location', '$http', function($scope, $location, $http) {
        $scope.user = {};
        
        $scope.login = function() {
            var userLogin = $scope.user.login;
            if(!userLogin) return;
            
            $http
                .post('/login', {
                    userLogin: userLogin
                })
                .success(function(data) {
                    if(data.success) {
                        localStorage.setItem('userLogin', userLogin);
                        $location.path('/chatRoom');
                    } else {
                        $scope.loginErrorMessage = data.err;
                    }
                })
                .error(function() {
                    $scope.loginErrorMessage = 'Wewnętrzny błąd servera podczas próby logowania';
                });
        };
    }]);