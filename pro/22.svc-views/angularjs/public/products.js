angular.module('exampleApp', ['increment', 'ngResource', 'ngRoute']).
    constant('baseUrl', 'http://localhost:5500/products/').
    factory('productResource', function ($resource, baseUrl) {
        return $resource(baseUrl + ':id', { id: '@id'},
            { create: { method: 'POST' }, save: { method: 'PUT' } });
    }).
    config(function ($routeProvider, $locationProvider) {
        //$locationProvider.html5Mode(true);
        $locationProvider.html5Mode({
            enabled: true,
            //requireBase: false  // or <base href="/">
        });

        //$routeProvider.when('/list', {
        //    templateUrl: 'tableView.html'
        //});

        //$routeProvider.when('/edit', {
        //    templateUrl: 'editorView.html'
        //});

        // Conservative Route Parameter
        $routeProvider.when('/edit/:id', {
            templateUrl: 'editorView.html',
            controller: 'editCtrl'
        });

        // Eager Route Parameter
        //$routeProvider.when('/edit/:id/:data*', {
        //    templateUrl: 'editorView.html'
        //});

        $routeProvider.when('/create', {
            templateUrl: 'editorView.html',
            controller: 'editCtrl'
        });

        $routeProvider.otherwise({
            templateUrl: 'tableView.html',
            controller: 'tableCtrl',
            resolve: {
                data: function (productResource) {
                    return productResource.query();
                }
            }
        });
    }).
    controller('defaultCtrl', function ($scope, /*$http, $resource,*/ $location, /*$route, $routeParams, baseUrl*/ productResource) {
        //$scope.displayMode = 'list';
        /* move to editCrtl
        $scope.currentProduct = null;

        $scope.$on('$routeChangeSuccess', function () {
            if ($location.path().indexOf('/edit') === 0) {
                var id = $routeParams['id'];

                for (var i = 0; i < $scope.products.length; i++) {
                    if ($scope.products[i].id === id) {
                        $scope.currentProduct = $scope.products[i];
                        break;
                    }
                }
            }
        });
        */

        /*
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
        */

        $scope.data = {};

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
                $scope.data.products.splice($scope.data.products.indexOf(product), 1);
            });

            $location.path('/list');
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
            new productsResource(product).$create().then(function (newProduct) {
                $scope.data.products.push(newProduct);
                //$scope.displayMode = 'list';

                $location.path('/list');
            });
        };

        /* move to editCrtl
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
            //$scope.displayMode = 'list';

            $location.path('/list');
        };
        */

        //------------------------------------------------------------------
        // User Interface 지원
        /*
        //$scope.editOrCreateProduct = function (product) {
        $scope.editProduct = function (product) {
            //$scope.currentProduct = product ? angular.copy(product) : {};

            //$scope.currentProduct = product ? product : {};
            //$scope.displayMode = 'edit';

            $scope.currentProduct = product;
            $location.path('/edit');
        };
        */

        /* move to editCrtl
        $scope.saveEdit = function (product) {
            if (angular.isDefined(product.id)) {
                $scope.updateProduct(product);
            } else {
                $scope.createProduct(product);
            }

            $scope.currentProduct = {};
        };

        $scope.cancelEdit = function () {
            // edit
            if ($scope.currentProduct && $scope.currentProduct.$get) {
                $scope.currentProduct.$get();
            }

            $scope.currentProduct = {};
            //$scope.displayMode = 'list';

            $location.path('/list');
        };
        */

        //$scope.listProducts();
    }).
    controller('tableCtrl', function ($scope, $location, $route, data) {
        $scope.data.products = data;

        $scope.data.products.$promise.then(function (results) {
            console.log($scope.products === results);
            console.log(results);
        });

        $scope.refreshProducts = function () {
            $route.reload();
        };
    }).
    controller('editCtrl', function ($scope, $routeParams, $location) {
        $scope.currentProduct = null;

        if ($location.path().indexOf('/edit') === 0) {
            var id = $routeParams['id'];

            for (var i = 0; i < $scope.data.products.length; i++) {
                if ($scope.data.products[i].id === id) {
                    $scope.currentProduct = $scope.data.products[i];
                    break;
                }
            }
        }

        $scope.cancelEdit = function () {
            /*
            // edit
            if ($scope.currentProduct && $scope.currentProduct.$get) {
                $scope.currentProduct.$get();
            }

            $scope.currentProduct = {};
            //$scope.displayMode = 'list';
            */

            $location.path('/list');
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
            //$scope.displayMode = 'list';

            $location.path('/list');
        };

        $scope.saveEdit = function (product) {
            if (angular.isDefined(product.id)) {
                $scope.updateProduct(product);
            } else {
                $scope.createProduct(product);
            }

            $scope.currentProduct = {};
        };
    });
