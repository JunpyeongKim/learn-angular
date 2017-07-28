7. SportsStore: Navigation and Checkout
========================================

# 7.1 실제 상품 데이터 활용
- $http
    - (*) Ajax(Asynchronous JavaScript and XML)
        - 비동기적으로 일어나는 HTTP 요청으로 백그라운드에서 수행된다
    - AngularJS는 Promise 를 사용해 비동기적 작업을 수행 
    - $scope.data.products & $scope.data.error
- Ajax 에러 처리
    - app.html
        - ng-show, ng-hide
- 부분 뷰 처리
    - 마크업을 여러 파일로 나누고, ng-include 디렉티브를 사용 --> 런타임 시점에 파일을 로딩 가능
    - view/productList.html
        - app.html 의 상품 및 카테고리 목록을 정의하는 엘리먼트를 복사
    - app.html
        - <ng-include> 로 변경
            - AngularJS가 Ajax 요청을 보내고 src 에서 지정한 파일을 로드한다.
            - src <-- Literal(작은 따옴표)을 사용하지 않으면 directive 가 $scope 속성을 검사해 파일명을 찾게 된다


# 7.2 장바구니 생성
- 장바구니 모듈 및 서비스 생성
    - components/
        - (*) 컴포넌트가 공통적으로 나타내는 기능에 따라 파일 정리하는 것이 좀 더 효과적
            - cart/cart.js & cart/cartSummary.html
        - cart/cart.js
            - 서비스 <-- Singleton 객체
                - 애플리케이션에서는 단일 서비스 객체를 공통으로 사용하므로 팩토리 함수는 한 번만 호출된다
            - Module.factory(서비스명, 팩토리 함수)
- 장비구니 위젯 생성
    - (*) custom directive 를 생성한다.
    - cart.js
        - directive(디렉티브명, 팩토리 함수)
            - restrict
                - E : element 에만 사용 제한
                - EA : 가장 많이 사용. element/attribute 로 사용 가능
            - templateUrl
                - directive element 에 삽입할 부분 뷰의 URL
            - controller
                - 부분 뷰로 데이터/기능을 제공 
    - cartSummary.html
        - class
            - custom : navbar-right, navbar-text
            - bootstrap : navbar-btn
    - app.html
        - <cart-summary/>
            - AngularJS 에서 컴포넌트명을 정규화 한다 : 디렉티브 정의할때 cartSummary --> 엘리먼트 <cart-summary> 
- 상품 선택 버튼 추가
    - (*) Bootstrap 에서는 <a>, <button> 이 동일한 외양을 갖게끔 스타일을 적용한다
        - URL 라우팅에는 <a>이 좀 더 유용 
            - (*) button : ng-click="" & clickCallback() & $location.path()
            - (*) a : href=""
    

# 7.3 URL 내비게이션 추가
- views/checkoutSummary.html
    - (*) href = "#/products"
- URL 라우트 정의
    - Module.config()
        - ngRoute
            - angular-route.js
        - Provider Object 로 서비스 설정
            - $routeProvider.when() & $routeProvider.otherwise()
        - <ng-view/>
            - 현재 선택된 뷰를 어디에 집어 넣어야 할지 AngularJS 가 알 수 있다
    - 전체 URL이 아닌 현재 URL의 'path' 부분과 비교해 일치 여부를 판단한다
        - http://localhost:3000/app.html#/checkout
            - (*) http://localhost:3000/checkout : 브라우저가 AngularJS 애플리케이션 대신 서버에서 다른 문서를 로드하게 된다
            - (*) HTML5 History API에 대한 지원 기능도 활성화 가능 --> http://localhost:3000/checkout 로 접속 가능 
- URL 라우팅을 활용한 페이지 이동
    - (*) http://localhost:3000/app.html#
        - '#' 을 빼먹으면 브라우저에서는 app.html 페이지를 로드하라는 요청으로 해석하여 저장되지 않은 상태가 유실된다


# 7.4 결제 절차의 시작
- controllers/checkoutControllers.js
    - $scope.cartData
    - $scope.total()
    - $scope.remove()
- views/checkoutSummary.html
    - <tfoot>
        - colspan="3"
    - "#/products" & "#/placeorder"
- 결제 요약 정보 적용
    - /complete, /placeorder
        - (*) 7장에서 구현
