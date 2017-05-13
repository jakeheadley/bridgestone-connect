// Start: App ==================================================================
// var AA = angular.module("bridgestoneConnectApp", []);
var AA = angular.module('materializeApp', ['ui.materialize'])
    .controller('BodyController', ["$scope", ($scope) => {
        $scope.select = {
            value: "Option1",
            choices: ["Option1", "I'm an option", "This is materialize", "No, this is Patrick."]
        };
    }]);
// Start: App ==================================================================
