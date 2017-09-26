'use strict';

(function() {
    /*
        Use your IP address as url for every request
    */

    var app = angular.module('chat', []);

    app.controller('chatCtrl', function($scope, $http, $q) {

        $scope.data = [];
        $scope.disableUser = false;
        $scope.nightmode;

        /* 
            Pull Data from API
        */
        setInterval(function() {
            $http({
                url: 'http://192.168.1.20:4000/api/query',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    query: "SELECT * FROM gc",
                    param: []
                }
            }).then(function(res) {
                $scope.data = res.data.reverse();
                angular.forEach($scope.data, function(value) {
                    if (value.msg.search('@') != -1 && value.is_mentioned == 0) {
                        window.localStorage.setItem('mention', JSON.stringify(value));
                        $http({
                            url: 'http://192.168.1.20:4000/api/query',
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            data: {
                                query: "UPDATE gc SET is_mentioned = 1 WHERE id = ?",
                                param: [value.id]
                            }
                        });
                    }
                });
            }, function(err) {
                console.warn(err);
            });
        }, 1000);

        /*
            Send Data to API
        */
        $scope.send = function() {
            $scope.disableUser = true;
            if ($scope.username == "" || $scope.username == undefined || $scope.message == "" || $scope.message == undefined) {
                alert("Empy fields !!! STUPID");
            } else {
                $http({
                    url: 'http://192.168.1.20:4000/api/query',
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    data: {
                        query: "INSERT INTO gc (user, msg) VALUES (?,?)",
                        param: [$scope.username, $scope.message]
                    }
                }).then(function(res) {
                    $scope.message = "";
                    jQuery('.chat-container').animate({
                        scrollTop: 0
                    }, 800);
                }, function(err) {
                    console.log(err);
                });
            }
        }
    });

})();