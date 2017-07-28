angular.module('exampleApp', []).
    controller('defaultCtrl', function ($scope, $http, $interval, $timeout, $log) {
        $scope.intervalCounter = 0;
        $scope.timerCounter = 0;

        $interval(function () {
            $scope.intervalCounter++;
            $log.log('intervalCounter: ' + $scope.intervalCounter); // not tested...
        }, 5000, 10);

        $timeout(function () {
            $scope.timerCounter++;
        }, 5000);

        //console.log('$http.get()');
        $http.get('productData.json').success(function (data) {
            //console.log('$http.get(productData.json): success');
            $scope.products = data;
            $log.log('There are ' + data.length + ' items');
        });

        $scope.counter = 0;

        $scope.incrementCounter = function () {
            $scope.counter++;
        };
    }).
    filter('labelCase', function () {
        return function (value, reverse) {
            if (angular.isString(value)) {
                var intermediate = reverse ? value.toUpperCase() : value.toLowerCase();
                return (reverse ? intermediate[0].toLowerCase() : intermediate[0].toUpperCase()) + intermediate.substr(1);
            } else {
                return value;
            }
        };
    }).
    directive('unorderedList', function () {
        return function (scope, element, attrs) {
            // <div unorderedlist="products" ...></div>
            var data = scope[attrs['unorderedList']];   // scope['products']

            if (angular.isArray(data)) {
                /*
                    angular.element() : Wraps a raw DOM element or HTML string as a jQuery element.
                        - (*) https://docs.angularjs.org/api/ng/function/angular.element
                        - if jQuery is available, an alias for the jQuery function.
                        - if not, delegates to Angular's built-in subset of jQuery, called "jQuery Lite" or jqLite.
                 */

                var listElem = angular.element('<ul>');

                element.append(listElem);
                for(var i = 0; i < data.length; i++) {
                    listElem.append(angular.element('<li>').text(data[i].name));
                }
            }
        };
    }).
    factory('counterService', function () {
        var counter = 0;

        return {
            incrementCounter: function () {
                counter++;
            },

            getCounter: function () {
                return counter;
            }
        };
    });