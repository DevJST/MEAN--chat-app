'use strict'

angular.module('ChatApp.login.controllers', []).
    controller('LoginController', ['$scope', '$location', '$http', function($scope, $location, $http) {
        $scope.user = {};
        
        $scope.login = function() {
            if(!$scope.user.login) return;
            
            $http
                .post('/login', {
                    userLogin: $scope.user.login
                })
                .success(function(data) {
                    if(data.success) {
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