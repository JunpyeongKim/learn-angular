angular.module('exampleApp', ['increment', 'ngResource']).
    constant('baseUrl', 'http://localhost:5500/products/').
    controller('defaultCtrl', function ($scope, $http, $resource, baseUrl) {
        $scope.displayMode = 'list';
        $scope.currentProduct = null;

        $scope.productsResource = $resource(baseUrl + ':id', { id: '@id'},
            { create: { method: 'POST' }, save: { method: 'PUT' } });

        //------------------------------------------------------------------
        // REST 에 대응하는 동작
        $scope.listProducts = function () {
            //$scope.products = [
            //    { id: 0, name: 'Dummy1', category: 'Test', price: 1.25 },
            //    { id: 1, name: 'Dummy2', category: 'Test', price: 2.45 },
            //    { id: 2, name: 'Dummy3', category: 'Test', price: 4.25 }
            //];

            //
            //$http.get(baseUrl).success(function (data) {
            //    $scope.products = data;
            //});

            //
            $scope.products = $scope.productsResource.query();  // [] --> [....]

            // 이 Promise 는 결과 배열이 채워진후 resolve 된다
            $scope.products.$promise.then(function (results) {
                console.log($scope.products === results);
                console.log(results);
            });
        };

        $scope.deleteProduct = function (product) {
            //$scope.products.splice($scope.products.indexOf(product), 1);

            //$http({
            //    method: 'DELETE',
            //    url: baseUrl + product.id
            //}).success(function () {
            //    $scope.products.splice($scope.products.indexOf(product), 1);
            //});

            //
            //$http.delete(baseUrl + product.id).success(function () {
            //    $scope.products.splice($scope.products.indexOf(product), 1);
            //});

            //
            product.$delete().then(function () {
                $scope.products.splice($scope.products.indexOf(product), 1);
            });
        };

        $scope.createProduct = function (product) {
            //$scope.products.push(product);
            //$scope.displayMode = 'list';

            //
            //$http.post(baseUrl, product).success(function (newProduct) {
            //    $scope.products.push(newProduct);
            //    $scope.displayMode = 'list';
            //});

            // $save() --> POST
            //new $scope.productsResource(product).$save().then(function (newProduct) {
            //    $scope.products.push(newProduct);
            //    $scope.displayMode = 'list';
            //});

            // $create() --> POST
            new $scope.productsResource(product).$create().then(function (newProduct) {
                $scope.products.push(newProduct);
                $scope.displayMode = 'list';
            });
        };

        $scope.updateProduct = function (product) {
            //for (var i = 0; i < $scope.products.length; i++) {
            //    if ($scope.products[i].id === product.id) {
            //        $scope.products[i] = product;
            //        break;
            //    }
            //}
            //
            //$scope.displayMode = 'list';

            //$http({
            //    method: 'PUT',
            //    url: baseUrl + product.id,
            //    data: product
            //}).success(function (modifiedProduct) {
            //    for (var i = 0; i < $scope.products.length; i++) {
            //        if ($scope.products[i].id === modifiedProduct.id) {
            //            $scope.products[i] = modifiedProduct;
            //            break;
            //        }
            //    }
            //
            //    $scope.displayMode = 'list';
            //});

            //
            //$http.put(baseUrl + product.id, product).success(function (modifiedProduct) {
            //    for (var i = 0; i < $scope.products.length; i++) {
            //        if ($scope.products[i].id === modifiedProduct.id) {
            //            $scope.products[i] = modifiedProduct;
            //            break;
            //        }
            //    }
            //
            //    $scope.displayMode = 'list';
            //});

            //
            product.$save();
            $scope.displayMode = 'list';
        };

        //------------------------------------------------------------------
        // User Interface 지원
        $scope.editOrCreateProduct = function (product) {
            //$scope.currentProduct = product ? angular.copy(product) : {};
            $scope.currentProduct = product ? product : {};
            $scope.displayMode = 'edit';
        };

        $scope.saveEdit = function (product) {
            if (angular.isDefined(product.id)) {
                $scope.updateProduct(product);
            } else {
                $scope.createProduct(product);
            }
        };

        $scope.cancelEdit = function () {
            // edit
            if ($scope.currentProduct && $scope.currentProduct.$get) {
                $scope.currentProduct.$get();
            }

            $scope.currentProduct = {};
            $scope.displayMode = 'list';
        };

        $scope.listProducts();
    });
