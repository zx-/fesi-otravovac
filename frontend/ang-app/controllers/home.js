/**
 * Created by z on 21.12.2015.
 */
controllers.controller('home',[

    '$scope',
    'Restangular',

    function ( $scope, Restangular ) {

        $scope.materials = [];

        Restangular.all('pppMaterial').getList().then(
            function(resp){ $scope.materials = resp;},
            function(resp){ console.log(resp);}
        )

    }

]);