'use strict'

angular.module('ChatApp.chatRoom.controllers', [])
    .controller('ChatRooController', ['$scope', '$location', '$http', 'tokenHandlingService', function($scope, $location, $http, tokenHandlingService) {    
        // getting token
        var token = tokenHandlingService.getToken();
        
        // if no exist, move to main page
        if(!token) $location.path('/');
        
        // varible to store a socket connection returned reference
        var socket = null;
        
        // chat messages 
        $scope.messages = [];  
        
        var connectSocket = function () {
            // sending token to authorize 
            socket = io.connect('', {
                query: 'token=' + token
            });   
            
            socket.on('connect', function () {
                // token is valid
                
                // capturing chat message event
                socket.on('chat message', function(msg) {
                    $scope.$apply(function () {
                        $scope.messages.push(msg);
                    });
                });
            }).on('disconnect', function () {
                console.log('disconnected');
            }); 
        }
        
        // sending the token to check if it is valid before conecting socket.io to host
        $http.post('/chat-room', {
                token: token
            }).success(function (data) {
                if(data.success) {
                    // token is valid so connect to connect to the host that serves the page.
                    connectSocket();
                } else {
                    // if token isn't valid redirect to home page
                    $location.path('/');
                }
            }).error(function () {
                console.log('Wewnętrzny błąd servera podczas próby łaczenia z czatem');
            });
                       
        $scope.sendMessage = function () {
            if (socket) {
                // emmiting chat message event
                socket.emit('chat message', $scope.messageOutgoing);
            }
        };
    }]);