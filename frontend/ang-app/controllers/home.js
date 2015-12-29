/**
 * Created by z on 21.12.2015.
 */
controllers.controller('home',[

    '$scope',
    'Restangular',

    function ( $scope, Restangular ) {

        $scope.pppMaterials = [];

        Restangular.all('pppMaterial').getList().then(
            function(resp){ $scope.pppMaterials = resp;},
            function(resp){ console.log(resp);}
        );

        $scope.nkuMaterials = [];

        Restangular.all('nkuMaterial').getList().then(
            function(resp){ $scope.nkuMaterials = resp;},
            function(resp){ console.log(resp);}
        );

    }

]);