'use strict'

angular.module( 'ChatApp', [ 'ngRoute', 'ChatApp.chatRoom', 'ChatApp.login' ] );

angular.module( 'ChatApp' ).config( [ '$routeProvider', function( $routeProvider ) {
    $routeProvider
        .when( '/join', {
            templateUrl: 'modules/login/partials/login.html',
            controller: 'LoginController'
        })
        .when( '/chatRoom', {
            templateUrl: 'modules/chatRoom/partials/chatRoom.html'
        })
        .otherwise({
            redirectTo:'/join'
        });
}]);