25. Unit Testing
=================
- Unit Test 는 end-to-end 테스트를 수행하는 과정의 일부로써 활용해야 한다
- (*) AngularJS 에서는 Protractor 사용 권장 (https://github.com/angular/protractor)


# 25.1 예제 프로젝트 준비
- 1장과 동일한 환경 구성
    - angularjs/
        - angular.js
        - bootstrap.css
        - bootstrap-them.css
- ngMocks 모듈 설치
    - angular-mocks.js
- 테스트 설정 구성
    - (*) karma 는 각 프로젝트별로 설정해야 한다
    - $ karma init karma.conf.js
        - (*) $ karma init
        - Which testing framework do you want to use ? jasmine
            - (*) 기본 지원 테스팅 프레임워크 3가지 : Jasmine, Mocha, QUnit
        - Do you want to use Require.js ? No
        - Do you want to capture any browsers automatically ? Chrome
        - What is the location of your source and test files ?
            - (*) wildcard 를 사용해 다른 파일을 로드하기 전에, angular, ngMocks 모듈을 먼저 지정하는 것이 중요
            - angular.js
            - angular-mocks.js
            - *.js
            - tests/*.js
        - Should any of the files included by the previous patterns be excluded ? (N/A) 
        - Do you want Karma to watch all the files and run the tests on change ? yes
- 예제 애플리케이션 생성
    - app.html
        - app.js
        - defaultCtrl
    - app.js
        - exampleApp
        - defaultCtrl
            - counter
            - incrementCounter()
    

# 25.2 Karma 및 Jasmine 활용
- (*) AngularJS를 전혀 사용하지 않고 Karma & Jasmine 만을 사용
- (*) Karma 설정 파일을 생성할 때 위치를 지정하기만 하면 프로젝트 내 아무 위치에나 테스트 파일을 두어도 상관없다
    - tests/ 라는 폴더에 테스트를 보관하는 편
- angularjs/tests/firstTest.js 생성
    - A/A/A pattern --> Arrange / Act / Assert
    - Assert
        - expect(x)[.not]
            - .toEqual(val)
            - .toBe(obj)
            - .toMatch(reqexp)
            - .toBeDefined()
            - .toBeUndefined()
            - .toBeNull()
            - .toBeTruthy()
            - .toBeFalsy()
            - .toContain(y)
            - .toBeGreaterThan(y)
- 테스트 실행
    - (*) https://karma-runner.github.io/latest/intro/installation.html
        - (*) https://karma-runner.github.io/latest/intro/configuration.html
        - $ sudo npm install -g karma-cli
        - $ cd angularjs
        - $ npm install karma karma-jasmine karma-chrome-launcher --save-dev
    - $ karma start karma.conf.js
        - (*) $ karma start


# 25.3 목 객체 이해
- 테스트 객체 및 API
    - ngMocks 모듈의 Mock 객체
        - angular.mock
            - 모듈을 로드, 의존성을 리졸브하는 메서드 제공
            - module(name)
            - inject(fn)
            - dump(object) : AngularJS Object 를 직렬화한다
        - $exceptionHandler
        - $interval
        - $log
        - $timeout
    - 메서드 및 서비스
        - $rootScope.new()
        - $controller(name)
        - $filter(name)


# 25.4 컨트롤러 테스트
- angularjs/tests/controllerTest.js
    - angular.mock.module() & angular.mock.inject()
        - 기본 모듈만 로드된다 --> 선택 모듈은 module()를 호출해 로드해야 한다
        - (*) angular.mock 를 사용하지 않아도 된다 --> 전역으로 정의되어 있다 
    - $rootScope.$new()
    - $controller()


# 25.5 목 객체 활용
- Mocking HTTP Responses
    - $httpBackend 서비스
        - 결과 및 결과를 보내는 시점을 제어할 수 있게 해준다
        - expect(method, url, data, headers)
        - flush()
            - 응답 전송
        - flush(count)
            - 지정된 개수의 응답을 전송
        - resetExpectation()
            - 기대값을 재설정
        - verifyNoOutstandingExpectation()
            - 기대한 요청이 모두 수신되었는지 검사 즉, 모든 요청 결과를 예상대로 수신했는지 검사
            - --> Jasmine의 expect()를 사용하지 않아도 된다
        - respond(data)
        - response(status, data, headers)
    - app.js
        - productData.json
    - tests/controllerTest.js
        - $httpBackend.expect('GET', 'productData.json').respond([]);
        - $httpBackend.flush()
        - $httpBackend.verifyNoOutstandingExpectation()
- Mocking Periods of Time
    - Mock 객체에서 제공하는 메서드
        - $timeout
            - flush(millis) : millis 만큼 타이머를 앞당긴다
            - verifyNoPendingTasks() : 호출하지 않은 콜백이 남아있는지 검사
        - $interval
            - flush(millis) : millis 만큼 타이머를 앞당긴다
    - tests/controllerTest.js
- 로깅 테스트
    - Mock $log 서비스
        - (*) 메시지를 제대로 로깅하는지 테스트
        - 서비스 메서드명에 추가된 logs 속성
            - log.logs
            - debug.logs
            - warn.logs
        - 그 외 메서드
            - assertEmpty)()
            - reset()


# 25.6 기타 컴포넌트 테스트
- Filter 테스트
    - labelCase
        - toUpperCase()
        - toLowerCase()
        - substr()
    - tests/filterTest.js
        - angular.mock.inject(function($filter) { ... });
- Directive 테스트
    - (*) $scope 에서 가져온 값 배열을 사용해 무순위 목록을 생성
    - tests/directiveTest.js
        - angular.element()
        - $rootScope, $compile
            - $compile('<div unordered-list="data"></div>')($rootScope.$new())
                - jqLite 를 반환
                    - children().length
                    - find().length
                    - find().eq().text()
- Service 테스트
    - tests/ServiceTest.js
        - angular.mock.inject(function (counterService) { ... })
            - (*) 다양한 활용법을 보여주기 위해 Jasmine 의 it() 내부에서 inject() 사용

