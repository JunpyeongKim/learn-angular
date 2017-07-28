angular.module('increment', []).
    directive('increment', function () {
        return {
            restrict: 'E',
            scope: {
                //<increment value="item.price" />
                //value: '=value' // item.price <-- two-way binding

                //<increment item="item" property-name="price" restful="true" method-name="$save" />
                item: '=item',  // item
                property: '@propertyName',
                restful: '@restful',
                method: '@methodName'
            },
            link: function (scope, element, attrs) {
                var button = angular.element('<button>').text('+');

                button.addClass('btn btn-primary btn-xs');
                element.append(button);
                button.on('click', function () {
                    scope.$apply(function () {
                        //scope.value++;
                        scope.item[scope.property]++;
                        if (scope.restful) {
                            scope.item[scope.method]();
                        }
                    });
                });

            }
        };
    });
