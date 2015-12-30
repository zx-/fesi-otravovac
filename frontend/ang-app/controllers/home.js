/**
 * Created by z on 21.12.2015.
 */
controllers.controller('home',[

    '$scope',
    'Restangular',

    function ( $scope, Restangular ) {

        function createDate(o){

            o.date = new Date(o.date);
            o.date.setTime( o.date.getTime() + 60*60*1000 );
            return o;

        }

        $scope.types = [];
        $scope.types[6] = "Oznámenia o vyhlásení verejného obstarávania";
        $scope.types[8] = "Oznámenie o zrušení verejného obstarávania";
        $scope.types[18] = "Informácie o uzavretí zmluvy";


        $scope.getDateString = function (date) {

            return date.getDate()+'. '+(date.getMonth()+1)+'. '+date.getFullYear();

        };

        $scope.pppMaterials = [];

        Restangular.all('pppMaterial').getList().then(
            function(resp){ $scope.pppMaterials = resp.map(createDate);},
            function(resp){ console.log(resp);}
        );

        $scope.nkuMaterials = [];

        Restangular.all('nkuMaterial').getList().then(
            function(resp){ $scope.nkuMaterials = resp.map(createDate);},
            function(resp){ console.log(resp);}
        );

        $scope.rokovaniaMaterials = [];

        Restangular.all('rokovaniaMaterial').getList().then(
            function(resp){ $scope.rokovaniaMaterials = resp.map(createDate);},
            function(resp){ console.log(resp);}
        );

        $scope.supremeCourtMaterials = [];

        Restangular.all('supremeCourtMaterial').getList().then(
            function(resp){ $scope.supremeCourtMaterials = resp.map(createDate);},
            function(resp){ console.log(resp);}
        );

        $scope.uvoMaterials = [];

        Restangular.all('uvoMaterial').getList().then(
            function(resp){ $scope.uvoMaterials = resp.map(createDate);},
            function(resp){ console.log(resp);}
        );

    }

]);