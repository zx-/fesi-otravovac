/**
 * Created by z on 21.12.2015.
 */

var app = angular.module('fesi-otravovac-app',[

    'ngRoute',
    'controllers',
    'restangular'

]);

app.config([

    '$routeProvider',
    'RestangularProvider',

    function ( $routeProvider, RestangularProvider ) {

        $routeProvider.
            when('/', {
                templateUrl:'ang-app/templates/home.html',
                controller: 'home'
            });

        RestangularProvider.setBaseUrl('http://localhost:8080/api');
    }

]);