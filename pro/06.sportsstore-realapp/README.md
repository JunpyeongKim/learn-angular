6. SportsStore: A Real Application
====================================

# 6.1 시작하기
- 데이터 준비
    - Deployd 애플리케이션 생성
        - $ sudo npm install -g deployd
        - $ dpd create sportsstore
        - $ dpd -p 5500 sportsstore/app.dpd dashboard
        - Open http://localhost:5500/dashboard
    - 데이터 구조 생성
        - '+' 버튼 --> Collection --> "/products"
            - (*) sportsstore/resources/products/config.json
        - PRODUCTS --> PROPERTIES
            - name : string, Required
            - description : string, Required
            - category : string, Required
            - price : number, Required
            - (*) id : Deployd 에서 자동으로 추가
    - 데이터 추가
        - PRODUCTS --> DATA
        - Kayak                 A boat for one person                           Watersports     275
          Lifejacket            Protective and fashionable                      Watersports     48.95
          Soccer Ball           FIFA-approved size and weight                   Soccer          19.5
          Corner Flags          Give your playing field a professional touch    Soccer          34.95
          Stadium               Flat-packed 35,000-seat stadium                 Soccer          79500.00
          Thinking Cap          Improve your brain efficiency by 75%            Chess           16
          Unsteady Chair        Secretly give your opponent a disadvantage      Chess           29.95
          Human Chess Board     A fun game for the family                       Chess           75
          Bling-Bling King      Gold-plated, diamond-studded King               Chess           1200
    - 데이터 서비스 테스트
        - http://localhost:5500/products
- 애플리케이션 준비
    - 디렉토리 구조 생성
        - angularjs/
            - components/
            - controllers/
            - filters/
            - ngmodules/
            - views/
    - AngularJS, Bootstrap 파일 설치
        - angularjs/
            - angular.js
            - bootstrap*.css
        - angularjs/ngmodules
            - angular-route.js
            - angular-resource.js
    - 기본 골격 개발
        - 2 칼럼 레이아웃 <-- 많은 웹스토어에서 볼수 있는
        - app.html
            - angular.module('sportsStore', [])
                - (*) 모듈 : AngularJS 애플리케이션에서 top-level 구성요소
                - sportsStore 라는 새 모듈을 생성한다
            - <html ng-app="sportsStore">
                - (*) ng-app : html 엘리먼트에 적용하기를 좋아하는 편
                - sportsStore 모듈 내에 정의한 기능을 HTML에서 사용할 수 있게 된다.
            - class
                - navbar, navbar-inverse, navbar-brand 
                - panel, panel-default, row, col-xs-*

# 6.2 (가짜) 상품 데이터 표시
- (*) 가짜 로컬 데이터 --> 7장에서 Deployd 의 데이터로 교체 예정
- 컨트롤러 구현
    - 필요한 로직과 데이터 정의
        - top-level controller 는 자체 파일에 둔다
            - (*) 여러 관련 컨트롤러를 한 파일로 묶기도 하지만...
            - 주된 역할
                - 애플리케이션에서 보여주는 각기 다른 뷰에서 사용할 데이터를 정의하는 것 
    - controllers/sportsStore.js
        - $scope.data.products = [ ... ];
- 제품 상세 정보 표시
    - app.html
        - directive
            - ng-controller, ng-repeat
        - filter
            - currency
            - (*) 기본 : 미국 달러 
        - class
            - (*) ng-scope <-- $scope 변수 사용 영역
            - (*) ng-binding <-- Data Binding( {{...}} )의 결과
            - pull-right, label, label-primary
            - lead

# 6.3 카테고리 목록 표시
- 카테코리 목록 생성
    - (*) 상품 데이터 객체로부터 동적으로 카테고리 엘리먼트를 생성한다
    - filters/customFilter.js
        - 새 모듈 생성 : customFilters
        - filter
            - "unique"
                - (*) Module.filter(filterName, factoryFunction)
            - AngularJS Utility Methods
                - angular.isArray()
                - angular.isString()
                - angular.isUndefined()
- 카테고리 내비게이션 링크 생성
    - app.html
        - directive
            - ng-click
            - ng-repeat
        - filter
            - orderBy
            - unique
        - class
            - btn, btn-block, btn-default, btn-lg
        - selectCategory()
    - (*) declaring dependency vs. resolving the dependency vs. dependency injection
        - 모듈을 '확장'할 때는 <script> 선언 순서가 중요하지만
        - 새 모듈을 '정의'하거나 의존성을 선언할 때는 순서가 중요하지 않다
- 카테고리 선택
    - (*) AngularJS에서는 스코프 내에 존재하지 않는 동작/데이터값에 접근할 때 아무런 에러를 발생시키지 않는다
        - 이는 나중에 다른 곳에서 해당 동작/데이터값이 정의될 수도 있다는 가정을 기반으로 하기 때문이다
    - 컨트롤러 정의
        - controllers/productListControllers.js
    - 컨트롤러의 적용 및 상품 필터링
        - 뷰에 컨트롤러를 바인딩
            - <div class="panel panel-default row" ng-controller="productListCtrl">
                - <-- "controller scope inheritance" 활용 가능
                - 컨트롤러의 기능 스코프를 컨트롤러를 사용하는 일부 뷰로 제한 가능하다
- 선택 카테고리 강조
    - (*) Module 객체에서 정의하는 메서드가 Module 객체를 반환 --> "fluent API" 라고 한다
    - btn-primary : 선택적으로 적용
    - Module.constant() --> 상수명을 의존성으로 선언
    - ng-class
- 페이지 기능 추가
    - 컨트롤러 업데이트
        - productListCtrl
            - selectedPage
            - productListPageCount
            - selectPage()
            - getPageClass()
    - 필터 구현
        - filter : range, pageCount
        - built-in filter
            - $filter('limitTo')
        - Utility Methods
            - angular.isNumber()
            - Math.ceil()
    - 뷰 업데이트
        - class
            - pull-right, btn-group
        - $index
