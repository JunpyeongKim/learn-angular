angular.module('cart', []).
    factory('cart', function () {   // 서비스명 & 팩토리 함수

        var cartData = [];

        return {
            addProduct: function (id, name, price) {
                var addedToExistingItem = false;

                for (var i = 0; i < cartData.length; i ++) {
                    if (cartData[i].id === id) {
                        cartData[i].count++;
                        addedToExistingItem = true;
                        break;
                    }
                }

                if (!addedToExistingItem) {
                    cartData.push({ count: 1, id: id, name: name, price: price });
                }
            },

            removeProduct: function (id) {
                for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].id === id) {
                        /*
                            var arr = [1, 2, 3, 4, 5];
                            var sp = arr.splice(2, 1);
                            sp --> [3]
                            arr --> [1, 2, 4, 5]
                        */
                        cartData.splice(i, 1);
                        break;
                    }
                }
            },

            getProducts: function () {
                return cartData;
            }
        };
    }).
    directive('cartSummary', function (cart) {

        return {
            restrict: 'E',
            templateUrl: 'components/cart/cartSummary.html',
            controller: function ($scope) {
                var cartData = cart.getProducts();

                $scope.total = function () {
                    var total = 0;

                    for (var i = 0; i < cartData.length; i++) {
                        total += (cartData[i].price * cartData[i].count);
                    }

                    return total;
                };

                $scope.itemCount = function () {
                    var total = 0;

                    for (var i = 0; i < cartData.length; i++) {
                        total += cartData[i].count;
                    }

                    return total;
                };
            }
        };
    });