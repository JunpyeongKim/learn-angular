// top-level controller
// Module 객체를 반환
angular.module('sportsStore').
    constant('dataUrl', 'http://localhost:5500/products').
    constant('orderUrl', 'http://localhost:5500/orders').
    controller('sportsStoreCtrl', function ($scope, $http, $location, dataUrl, orderUrl, cart) {
        $scope.data = {
            //products: [
            //    { name: 'Product #1', description: 'A product', category: 'Category #1', price: 100 },
            //    { name: 'Product #2', description: 'A product', category: 'Category #1', price: 110 },
            //    { name: 'Product #3', description: 'A product', category: 'Category #2', price: 210 },
            //    { name: 'Product #4', description: 'A product', category: 'Category #3', price: 202 },
            //],
            //error: ,

            //shipping: { name: , street: , city: , state: , zip: , country: , giftwrap: },
            //orderId: ,
            //orderError: ,
        };

        $http.get(dataUrl).
            success(function (data) {
                $scope.data.products = data;
            }).
            error(function (error) {
                // http://localhost:5500/nodef : Object {message: "Resource Not Found", status: 404}
                console.log(dataUrl, ':', error);
                $scope.data.error = error;
            });

        $scope.sendOrder = function (shippingDetails) {
            /*
                angular.copy(source, [destination])
                    - Creates a deep copy of source, which should be an object or an array.

                { name: , street: , city: , state: , zip: , country: , giftwrap: }
             */
            var order = angular.copy(shippingDetails);

            //{ name: , street: , city: , state: , zip: , country: , giftwrap: , products: }
            order.products = cart.getProducts();

            $http.post(orderUrl, order).
                success(function (data) {
                    /*
                    data = {
                        city: "city"
                        country: "country"
                        giftwrap: true
                        id: "98917b0b1fb3bbc1"
                        name: "test"
                        products: Array[1]
                        state: "state"
                        street: "street"
                        zip: "zip"
                    }
                    */
                    $scope.data.orderId = data.id;
                    cart.getProducts().length = 0;
                }).
                error(function (error) {
                    $scope.data.orderError = error;
                }).
                finally(function () {   // finally(callback, notifyCallback)
                    $location.path('/complete');
                });
        };
    });
