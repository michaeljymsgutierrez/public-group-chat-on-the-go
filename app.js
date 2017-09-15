(function() {
    var app = angular.module('chat', []);

    app.controller('chatCtrl', function($scope, $http, $q) {
        $scope.data = [];
        setInterval(function() {
            $http({
                url: 'http://192.168.10.154:4000/api/query',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    query: "SELECT * FROM gc",
                    param: []
                }
            }).then(function(res) {
                $scope.data = res.data;
            }, function(err) {
                console.warn(err);
            });
        }, 1000);


        $scope.send = function() {
            if ($scope.username == "" || $scope.username == undefined || $scope.message == "" || $scope.message == undefined) {
                alert("Empy fields !!! STUPID");
            } else {
                $http({
                    url: 'http://192.168.10.154:4000/api/query',
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    data: {
                        query: "INSERT INTO gc (user, msg) VALUES (?,?)",
                        param: [$scope.username, $scope.message]
                    }
                }).then(function(res) {
                    $scope.message = "";
                }, function(err) {

                });
            }
        }
    });
})();