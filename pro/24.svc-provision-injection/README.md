24. Services for Provision and Injection
=========================================

# 24.1 프로비전 및 주입 서비스는 언제 왜 사용하나
- AngularJS 내부적으로 사용되므로 직접 사용하기 위한 용도는 아니다
- (*) 단위 테스트에서 유용하게 사용

# 24.2 예제 프로젝트 준비
- angularjs
    - angular.js
    - bootstrap.css
    - bootstrap-theme.css
- (*) $ express angularjs

# 24.3 AngularJS 컴포넌트 등록
- $provide 서비스
    - 컴포넌트를 주입할 수 있게 등록하는데 사용
        - (*) 실제 작업은 $injector 서비스가 수행
    - 메서드
        - (*) 대부분의 경우 $provide 서비스에서 정의하는 메서드는 Module 타입을 통해 외부로 노출되고 접근 가능
        - constant(name, value)
        - decorator(name, service)
            - (*) Module 타입을 통해 외부로 노출되지 않는 메서드
            - 서비스에 대한 요청을 가로채 다른 기능이나 추가 기능을 제공하는데 사용
        - factory(name, service)
        - provider(name, service)
        - service(name, service)
        - value(name, value)
- components.html
    - $provide.decorate('$log', ..)
        - decoration 을 적용할 서비스 이름 & decoration 함수
            - decoration 함수 : $delegate 에 대한 의존성을 반드시 선언해야 한다
    - $log 서비스 객체 인스턴스를 생성하고 이 인스턴스를 decorator 함수의 $delegate 인자로 넘겨준다
    - Service Decoration 기능은 작은 부분을 조정하려고 할 때 가장 유용


# 24.4 주입 관리
- $injector
    - 함수에서 선언하는 의존성을 판단 & resolve 
    - 메서드
        - annotate(fn)
        - get(name)
        - has(name)
        - invoke(fn, self, locals)
    - (*) 직접 활용해야 하는 경우는 거의 없다
    - (*) $controller 서비스 : 컨트롤러 인스턴스를 생성 --> 단위 테스트 작성시 이용
- 함수 의존성 판단
    - components.html
        - (*) $injector.annotate() : 함수에서 선언하는 의존성 set 을 가져온다
        - $injector.has()
- 서비스 인스턴스 가져오기
    - $injector.get()
- 호출 흐름 정리
    - $injector.invoke()
- 루트 엘리먼트를 통한 $injector 서비스 가져오기
    - $rootElement 서비스
        - ng-app Directive 가 적용된 HTML 엘리먼트에 접근 가능하도록 해준다
        - jqLite 객체 형태로 값을 제공
        - injector() : $injector 서비스 객체를 반환