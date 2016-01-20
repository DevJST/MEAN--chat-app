'use strict'

angular.module( 'ChatApp', [ 'ngRoute', 'angular-jwt', 'ChatApp.services', 'ChatApp.chatRoom', 'ChatApp.login' ] );

angular.module( 'ChatApp' ).config( [ '$routeProvider', function( $routeProvider ) {
    $routeProvider
        .when( '/join', {
            templateUrl: 'modules/login/partials/login.html',
            controller: 'LoginController'
        })
        .when( '/chatRoom', {
            templateUrl: 'modules/chatRoom/partials/chatRoom.html',
            controller: 'ChatRooController'
        })
        .otherwise({
            redirectTo:'/join'
        });
}]);