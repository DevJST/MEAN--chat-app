'use strict'

angular.module( 'ChatApp.login.controllers', [] ).
    controller( 'LoginController', [ '$scope', '$location', function( $scope, $location ) {
        $scope.login = function() {
            $location.path( '/chatRoom' );
        };
    }]);