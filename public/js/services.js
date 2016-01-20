'use strict'

angular.module('ChatApp.services', [])
    .service('tokenHandlingService', ['jwtHelper', function(jwtHelper) {
        var token;
        
        var loadToken = function() {
            token = JSON.parse(localStorage.getItem('token'));
        };
        
        this.saveToken = function(token) {
            localStorage.setItem('token', JSON.stringify(token));
            loadToken.call();
        };
        
        this.getToken = function() {
            return (token) ? angular.copy(token) : false;
        };
        
        this.getTokenPayload = function() {
            return (token) ? jwtHelper.decodeToken(token) : false;
        };
        
        loadToken.call();
    }]);