8. SportsStore: Orders and Administrators
==========================================

# 8.1 배송 상세 정보 수집
- views/placeOrder.html
- class
    - form-group
    - text-center
- directive : ng-model
    - two-way binding
    - (*) {{ ... }} : one-way binding
- 폼 유효성 검증 기능 추가
    - 자동으로 수행된다
- 유효성 검증 준비
    - <form name="shippingForm" novalidate>
        - <form> : 유효성 검증을 활성화
        - name="" : 폼 유효성 검증 결과를 보고하는데 사용하는 변수를 정의
        - novalidate : 브라우저에서 수행하는 유효성 검증을 비활성화
            - 표준 HTML5 기능
            - AngularJS 에서만 검사하게 해준다
    - <input required>
    - 피드백 표시 2가지
        - 1) 클래스를 활용하여 CSS 스타일을 정의
            - class
                - ng-invalid, ng-valid
                    - AngularJS 에서는 폼 엘리먼트에 이 클래스들을 지정
                - ng-show="shippingForm.name.$error.required"
                - ng-show="shippingForm.street.$error.required
                - ex) Name(Adam Freeman), Street(123 Main Street)
        - 2) 스코프 변수를 활용
            - 버튼 유효성 검증 기능 연계
                - ng-disabled
                    - shippingForm.$invalid : 하나 이상의 <input>가 유효하지 않을 때 true.
- (*) ng-repeat 디렉티브를 사용해 <input> 필드 생성 주의점
    - ng-repeat 스코프 내에서 ng-model, ng-show 를 해석하는 방식으로 인해 제대로 동작하지 않는다


# 8.2 주문하기
- Deployd 서버 확장 
    - localhost:5500/dashboard/ --> '+' --> Collection --> '/orders'
        - name : string, required
        - street : string, required
        - city : string, required
        - state : string, required
        - zip : string, required
        - country : string, required
        - giftwrap : boolean, unrequired
        - products : array, required
- 컨트롤러 동작 정의
    - 이 기능은 어디든(서비스 또는 컨트롤러) 정의가능 --> 예제를 간단히 하기 위해 top-level controller인 sportsStore 컨트롤러에 정의
    - sportsStore.js
        - constant : orderUrl
        - $location, cart
        - angular.copy()
        - success() ~ error() ~ finally()
            - (*) https://docs.angularjs.org/api/ng/service/$q
            - finally(callback, notifyCallback)
- 컨트롤러 동작 호출
    - sendOrder(data.shipping)
- 뷰 정의
    - views/thankYou.html


# 8.3 개선하기
- app.html
    - 뷰가 표시되는 시점과 상품/카테고리 엘리먼트가 생성되는 시점 사이에 약간의 시차가 존재
        - (*) URL 라우팅 기능 이용하여 개선 가능
        - (*) $animate 서비스를 사용하여 뷰 전환을 부드럽게 가능


# 8.4 상품 카탈로그 관리
- 관리자가 상품 카탈로그와 주문 내역을 관리가능한 애플리케이션 개발
    - (*) 기본 인증 방법
        - 1) 사용자의 인증 정보를 특정 URL로 전송
        - 2) 요청이 성공하면 브라우저에게 쿠키를 반환
        - 3) 이후 요청에서 브라우저는 이 쿠키를 함께 전송해 사용자 식별
- Deployd 준비
    - localhost:5500/dashboard/ --> '+' --> Users Collection --> '/users'
        - admin / secret
    - 컬렉션 보호
        - (*) Deployd 는 서버사이드 기능을 구현하는데 사용할 수 있는 간단한 자바스크립트 API 정의 가능
        - 'PRODUCTS' --> 'EVENTS' --> 'ON PUT' & 'ON DELETE' --> 코드 작성
            ```javascript
            if (me === undefined || me.username !== 'admin') {
                cancel('No authorization', 401);
            }
            ```
                - me : 현재 사용자
        - 'ORDERS'
            - ON GET, ON PUT, ON DELETE
- 관리자 애플리케이션 구현
    - admin.html
        - sportsStoreAdmin
        - $routeProvider
            - /login : 'views/adminLogin.html'
            - /main : 'views/adminMain.html'
            - redirectTo : '/login'
    - 플레이스홀더 뷰 추가
        - views/adminMain.html
- 인증 구현
    - (*) Deployd 에서는 HTTP 를 사용해 사용자를 인증
        - /users/login
    - controllers/adminControllers.js
        - withCredentials : true
            - 크로스 오리진 요청 지원이 활성화 된다
            - 인증을 처리하는 쿠키와 연동해 Ajax 요청을 사용할 수 있게 된다
            - (*) false : 브라우저는 Deployd 의 인증 쿠키를 무시하고, 이후 요청에서도 쿠키는 미사용하게 된다
    - 인증 뷰 정의
        - views/adminLogin.html
            - authenticationError
            - authenticate()
            - authForm.$invalid
- 메인 뷰 및 컨트롤러 정의
    - views/
        - adminProducts.html
        - adminOrders.html
        - adminMain.html
            - class vs. ng-class
                - ex) ng-class="{ 'btn-primary': item === current }"
            - ng-include
                - (*) URL 라우팅 기능의 심각한 제약 : ng-view 디렉티브를 중첩해 사용 불가 --> ng-include 디렉티브를 대안으로 사용
    - controllers/adminControllers.js
        - mainCtrl
- 주문 기능 구현
    - ordersCtrl
        - withCredentials: true
            - 브라우저는 요청을 인증하기 위해 Deployd 로 보안 쿠키가 담긴 요청을 한다.
- 상품 기능 구현
    - ngResource 모듈의 $resource 서비스를 사용하면 URL 정의가 간편해진다
        - (*) RESTful API를 사용할때 $http 서비스를 이용하면 전체 URL을 애플리케이션 전체로 노출시켜야 한다
    - RESTful 컨트롤러 정의
        - controllers/adminProductController.js
            - config() : $httpProvider.defaults.withCredentials = true;
                - (*) $resource 서비스는 $http 서비스에서 제공하는 기능을 기반으로 개발되었다
                - 모든 Ajax 요청에 대한 기본 설정을 변경 
            - $resource
                - query(), get(), delete(), remove(), save()
                    - 이 메서드는 개발 데이터 객체에도 정의된다.
    - 뷰 정의
        - views/adminProducts.html
    - HTML 파일에 참조 추가
        - angular-resource.js
        - ngRoute
        - controllers/adminProductController.js
