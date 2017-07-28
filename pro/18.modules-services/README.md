18. Working with Modules and Services
======================================

# 18.1 서비스 및 모듈은 언제, 왜 사용하나
- Services
    - 애플리케이션에서 재사용하려는 기능을 캡슐화할때 MVC 패턴에 부합되지 않을 때 사용
    - 주로 cross-cutting concerns 를 구현하는데 사용 --> 공통 기능
    - 즉, 다른 곳에 속하지 않는 기능을 구현해야 할 때 사용
- Modules
    - ng-app Directive 를 사용해 HTML 엘리먼트에 적용된 애플리케이션 기능을 정의
    - 서비스, 디렉티브, 필터 같은 기능을 다른 애플리케이션에서 재사용하기 쉽게끔 정의
- 사용 이유
    - Service 는 애플리케이션 전반에서 재사용위해
    - Module 은 여러 애플리케이션에서 재사용위해


# 18.2 예제 프로젝트 준비
- angularjs/
    - angular.js
    - bootstrap.css
    - bootstrap-theme.css
    - example.html
    - (*) $ express angularjs
- example.html
    - Module
        - exampleApp
    - Controller
        - defaultCtrl
        - $scope.$watch('data.totalClicks', ...)
    - Directive
        - triButton

18.3 모듈을 활용한 애플리케이션 구조화
18.4 서비스의 생성 및 활용
18.5 내장 모듈 및 서비스의 활용