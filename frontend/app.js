/**
 * Created by z on 21.12.2015.
 */

var app = angular.module('fesi-otravovac-app',[

    'ngRoute',
    'controllers',
    'restangular',
    'angular.filter'

]);

app.config([

    '$routeProvider',
    'RestangularProvider',

    function ( $routeProvider, RestangularProvider, af ) {

        $routeProvider.
            when('/', {
                templateUrl:'ang-app/templates/home.html',
                controller: 'home'
            });

        RestangularProvider.setBaseUrl('/api');
    }

]);