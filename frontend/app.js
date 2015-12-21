/**
 * Created by z on 21.12.2015.
 */

var app = angular.module('fesi-otravovac-app',[

    'ngRoute',
    'controllers'

]);

app.config([

    '$routeProvider',

    function ( $routeProvider ) {

        $routeProvider.
            when('/', {
                templateUrl:'ang-app/templates/home.html',
                controller: 'home'
            })
    }

]);