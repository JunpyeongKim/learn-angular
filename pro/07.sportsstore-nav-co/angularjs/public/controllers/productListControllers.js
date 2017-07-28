// constant(), controller(), ... --> fluent API
angular.module('sportsStore').
    constant('productListActiveClass', 'btn-primary').
    constant('productListCount', 3).
    controller('productListCtrl', function ($scope, $filter, productListActiveClass, productListCount, cart) {
        // not the $scope variable, but the local variable
        var selectedCategory = null;

        $scope.selectedPage = 1;
        $scope.pageSize = productListCount;

        $scope.selectCategory = function (newCategory) {
            //console.log('selectCategory(', newCategory, ')');
            if (newCategory === undefined) {
                selectedCategory = null;
            } else {
                selectedCategory = newCategory;
            }

            $scope.selectedPage = 1;
        };

        $scope.selectPage = function (newPage) {
            $scope.selectedPage = newPage;
        };

        $scope.categoryFilterFn = function (product) {
            //console.log('selectedCategory: ' + selectedCategory);
            //console.log('categoryFilterFn(', product, ')');
            return selectedCategory === null || product.category === selectedCategory;
        };

        $scope.getCategoryClass = function(category) {
            return selectedCategory == category ? productListActiveClass : '';
        };

        $scope.getPageClass = function (page) {
            return $scope.selectedPage === page ? productListActiveClass : '';
        };

        $scope.addProductToCart = function (product) {
            cart.addProduct(product.id, product.name, product.price);
        };
    });
