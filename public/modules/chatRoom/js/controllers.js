'use strict'

angular.module( 'ChatApp.chatRoom.controllers', [] )
    .controller('ChatRooController', ['$scope', '$location', '$http', 'tokenHandlingService', function($scope, $location, $http, tokenHandlingService) {    
        var token = tokenHandlingService.getToken();
        
        if(!token) $location.path('/');
        
        var connectSocket = function() {
            var socket = io.connect('', {
                query: 'token=' + token
            });   
            
            socket.on('connect', function () {
                console.log('authenticated');
            }).on('disconnect', function () {
                console.log('disconnected');
            }); 
        }
        
        $http.post('/chat-room', {
                token: token
            }).success(function(data) {
                if(data.success) {
                    connectSocket();
                } else {
                    $location.path('/');
                }
            }).error(function() {
                console.log('Wewnętrzny błąd servera podczas próby łaczenia z czatem');
            });
    }]);