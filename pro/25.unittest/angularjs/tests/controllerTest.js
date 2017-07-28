describe('Controller Test', function () {
    // Arrange
    var mockScope = {};
    var controller;
    var backend;
    var mockInterval;
    var mockTimeout;
    var mockLog;

    beforeEach(angular.mock.module('exampleApp'));  // module('exampleApp')

    beforeEach(angular.mock.inject(function ($httpBackend) {
        backend = $httpBackend;
        /*
            expect(method, url, data, headers)
            respond(data) / response(status, data, headers)
         */
        backend.expect('GET', 'productData.json').respond([
            { name: 'Apples', category: 'Fruit', price: 1.20 },
            { name: 'Bananas', category: 'Fruit', price: 2.42 },
            { name: 'Pears', category: 'Fruit', price: 2.02 }
        ]);
    }));

    beforeEach(angular.mock.inject(function ($controller, $rootScope, $http, $interval, $timeout, $log) { // inject(....)
        mockScope = $rootScope.$new();
        mockInterval = $interval;
        mockTimeout = $timeout;
        mockLog = $log;

        controller = $controller('defaultCtrl', {
            $scope: mockScope,
            $http: $http,
            $interval: mockInterval,
            $timeout: mockTimeout,
            $log: mockLog
        });

        /*
            flush() / flush(count)
         */
        //console.log('backend.flush()');
        backend.flush();
    }));

    // Act & Assert
    it('Creates variable', function () {
        expect(mockScope.counter).toEqual(0);
    });

    it('Increments counter', function () {
        mockScope.incrementCounter();
        expect(mockScope.counter).toEqual(1);
    });


    it('Makes an Ajax request', function () {
        // 기대한 요청이 모두 수신되었는지 검사
        // - 즉, 모든 요청 결과를 예상대로 수신했는지 검사
        backend.verifyNoOutstandingExpectation();
    });

    it('Processes the data', function () {
        expect(mockScope.products).toBeDefined();
        expect(mockScope.products.length).toEqual(3);
    });

    it('Preserves the data order', function () {
        expect(mockScope.products[0].name).toEqual('Apples');
        expect(mockScope.products[1].name).toEqual('Bananas');
        expect(mockScope.products[2].name).toEqual('Pears');
    });

    it('Limits interval to 10 updates', function () {
        for (var i = 0; i < 11; i++) {
            mockInterval.flush(5000);
        }

        expect(mockScope.intervalCounter).toEqual(10);
    });

    it('Increments timer counter', function () {
        mockTimeout.flush(5000);
        expect(mockScope.timerCounter).toEqual(1);
    });

    it('Writes log message', function () {
        console.log(mockLog.log.logs.length + ': ' + mockLog.log.logs);
        expect(mockLog.log.logs.length).toEqual(1);
    });
});
