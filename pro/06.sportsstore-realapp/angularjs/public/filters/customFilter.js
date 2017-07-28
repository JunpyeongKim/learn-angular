// filter instance 를 생성해야 할 때 Factory Function 을 호출하고,
// filtering 을 수행할 때는 Filter Function 을 호출한다
angular.module('customFilters', []).
    filter('unique', function () {  // Factory Function

        return function (data, propertyName) {  // Filter Function
            console.log('unique(', data, ', ', propertyName, ')');
            if (angular.isArray(data) && angular.isString(propertyName)) {
                var results = [];
                var keys = {};

                for (var i = 0; i < data.length; i++) {
                    var val = data[i][propertyName];
                    if (angular.isUndefined(keys[val])) {
                        keys[val] = true;
                        results.push(val);
                    }
                }

                return results;
            } else {
                return data;
            }
        };
    }).
    filter('range', function ($filter) {

        return function (data, page, size) {
            console.log('range(', data, ',', page, ',', size, ',');
            if (angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)) {
                var start_index = (page - 1) * size;

                if (data.length < start_index) {
                    return [];
                } else {
                    /*
                     array.splice(index,howmany,item1,.....,itemX)
                        - index
                            - Required.
                            - An integer that specifies at what position to add/remove items, Use negative values to specify the position from the end of the array
                        - howmany
                            - Required.
                            - The number of items to be removed. If set to 0, no items will be removed
                        - item1, ..., itemX
                            - Optional.
                            - The new item(s) to be added to the array

                        - ex) var fruits = ["Banana", "Orange", "Apple", "Mango"];
                              fruits.splice(2, 0, "Lemon", "Kiwi");
                              fruits --> Banana,Orange,Lemon,Kiwi,Apple,Mango

                              fruits.splice(2, 1, "Lemon", "Kiwi");
                              fruits --> Banana,Orange,Lemon,Kiwi,Mango

                              fruits.splice(2, 2);
                              fruits --> Banana,Orange
                     */
                    return $filter('limitTo')(data.splice(start_index), size);
                }
            } else {
                return data;
            }
        };
    }).
    filter('pageCount', function () {

        return function (data, size) {
            if (angular.isArray(data)) {
                var result = [];

                for (var i = 0; i < Math.ceil(data.length / size); i++) {
                    result.push(i);
                }

                return result;
            } else {
                return data;
            }
        };
    });
